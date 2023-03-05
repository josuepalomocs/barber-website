import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import process from "process";

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

export default async function slackInteractiveHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const payload = JSON.parse(req.body.payload);
    const triggerId = payload.trigger_id as string;
    const actionId = payload.actions[0].action_id as string;
    return handleInteraction(triggerId)
      .then(() => res.status(200).end())
      .catch((error) => {
        console.log(error);
        return res.status(500).json({
          code: "slack_views_open_request_error",
          message:
            "Http request to the views.publish Slack api endpoint failed",
          details: error,
        });
      });
    return res.status(200).json(req.body);
  }
}

async function f() {}

async function handleInteraction(triggerId: string) {
  const slackViewsOpenApiRequestBody = {
    trigger_id: triggerId,
    view: {
      type: "modal",
      title: {
        type: "plain_text",
        text: "Edit schedule - Monday",
        emoji: true,
      },
      submit: {
        type: "plain_text",
        text: "Save changes",
        emoji: true,
      },
      close: {
        type: "plain_text",
        text: "Cancel",
        emoji: true,
      },
      blocks: [
        {
          type: "input",
          element: {
            type: "checkboxes",
            options: [
              {
                text: {
                  type: "plain_text",
                  text: "No",
                  emoji: true,
                },
                value: "value-0",
              },
              {
                text: {
                  type: "plain_text",
                  text: "Yes",
                  emoji: true,
                },
                value: "value-0",
              },
            ],
            action_id: "checkboxes-action",
          },
          label: {
            type: "plain_text",
            text: "Is the shop open?",
            emoji: true,
          },
        },
        {
          type: "input",
          element: {
            type: "timepicker",
            initial_time: "13:37",
            placeholder: {
              type: "plain_text",
              text: "Select time",
              emoji: true,
            },
            action_id: "timepicker-action",
          },
          label: {
            type: "plain_text",
            text: "Open time",
            emoji: true,
          },
        },
        {
          type: "input",
          element: {
            type: "timepicker",
            initial_time: "13:37",
            placeholder: {
              type: "plain_text",
              text: "Select time",
              emoji: true,
            },
            action_id: "timepicker-action",
          },
          label: {
            type: "plain_text",
            text: "Close time",
            emoji: true,
          },
        },
        {
          type: "actions",
          elements: [
            {
              type: "button",
              text: {
                type: "plain_text",
                text: "Add break",
                emoji: true,
              },
              value: "click_me_123",
              action_id: "actionId-0",
            },
          ],
        },
      ],
    },
  };
  const response = await slackApiHttpClient.post(
    "/views.open",
    slackViewsOpenApiRequestBody
  );
}
