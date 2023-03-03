import type { NextApiRequest, NextApiResponse } from "next";
import {
  getBarberDaySchedulesInDB,
  getBarberServicesFromDB,
} from "@/services/database";
import axios from "axios";
import process from "process";
import { formatDuration } from "date-fns";
import { formatDate, getDayOfWeek } from "@/utilities/date";

const SLACK_BOT_TOKEN = process.env.SLACK_BOT_TOKEN;
function getSlackBotToken() {
  if (!SLACK_BOT_TOKEN)
    throw new Error("Missing environment variable: SLACK_BOT_TOKEN");
  return SLACK_BOT_TOKEN;
}

const slackApiHttpClient = axios.create({
  baseURL: "https://slack.com/api",
  timeout: 5000,
  headers: { Authorization: `Bearer ${getSlackBotToken()}` },
});

export default async function slackEventsHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const eventType = req.body.event.type;
    const eventTab = req.body.event.tab;
    if (eventType === "app_home_opened" && eventTab === "home") {
      // get most recent admin data from db and display it in the App home
      return handleAppHomeOpened()
        .then(() => res.status(200).end())
        .catch((error) => {
          console.log(error);
          return res.status(500).json({
            code: "slack_views_publish_request_error",
            message:
              "Http request to the views.publish Slack api endpoint failed",
            details: error,
          });
        });
    }
  }
}

async function handleAppHomeOpened() {
  const barberServices = await getBarberServicesFromDB();
  const barberServicesSlackBlocks = barberServices.map(
    ({ id, name, durationInMinutes, priceInUSD }) => {
      const durationInMinutesFormatted = formatDuration({
        minutes: durationInMinutes,
      });
      return {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: `*Name*: ${name}`,
          },
          {
            type: "mrkdwn",
            text: `*Duration*: ${durationInMinutesFormatted}`,
          },
          {
            type: "mrkdwn",
            text: `*Price*: $${priceInUSD}`,
          },
        ],
        accessory: {
          type: "button",
          text: {
            type: "plain_text",
            text: "Edit",
            emoji: true,
          },
          action_id: id,
        },
      };
    }
  );
  const barberDaySchedules = await getBarberDaySchedulesInDB();
  const barberDaySchedulesSlackBlocks = barberDaySchedules
    .sort((barberDayScheduleA, barberDayScheduleB) => {
      return barberDayScheduleA.dayOfWeek < barberDayScheduleB.dayOfWeek
        ? -1
        : 1;
    })
    .map(({ dayOfWeek, openTime, closeTime, breaks }) => {
      const dayOfWeekStrings = {
        0: "Sunday",
        1: "Monday",
        2: "Tuesday",
        3: "Wednesday",
        4: "Thursday",
        5: "Friday",
        6: "Saturday",
      };
      // 12:00 PM - 1:00 PM, 3:00 PM - 4:00 PM
      return {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*${dayOfWeekStrings[dayOfWeek.toString()]}*\n${
            openTime
              ? `Open: ${formatDate(
                  new Date(`2000-01-01T${openTime}:00`),
                  "h:mmaaa"
                )}\nClose: ${formatDate(
                  new Date(`2000-01-01T${closeTime}:00`),
                  "h:mmaaa"
                )}${
                  breaks.length
                    ? `\nBreaks: ${breaks
                        .map(({ startTime, endTime }) => {
                          return `${formatDate(
                            new Date(`2000-01-01T${startTime}:00`),
                            "h:mmaaa"
                          )} - ${formatDate(
                            new Date(`2000-01-01T${endTime}:00`),
                            "h:mmaaa"
                          )}`;
                        })
                        .join(",")}`
                    : ""
                }`
              : "Closed"
          }`,
        },
        accessory: {
          type: "button",
          text: {
            type: "plain_text",
            text: "Edit",
          },
          action_id: `edit_${dayOfWeek}`,
        },
      };
    });
  const slackViewsPublishApiRequestBody = {
    user_id: "U04SEKNPRS4",
    view: {
      type: "home",
      blocks: [
        {
          type: "header",
          text: {
            type: "plain_text",
            text: "Services",
            emoji: true,
          },
        },
        {
          type: "divider",
        },
        ...barberServicesSlackBlocks,
        {
          type: "header",
          text: {
            type: "plain_text",
            text: "Schedule",
            emoji: true,
          },
        },
        {
          type: "divider",
        },
        ...barberDaySchedulesSlackBlocks,
      ],
    },
  };
  await slackApiHttpClient.post(
    "/views.publish",
    slackViewsPublishApiRequestBody
  );
}
