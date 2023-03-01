import { CustomerAppointment } from "@/types";
import axios from "axios";
import { getBarberServiceByIdInDB } from "@/services/database";
import { convertUnixTimestampToDate, formatDate } from "@/utilities/date";

const SLACK_APPOINTMENTS_WEBHOOK_URL =
  process.env.SLACK_APPOINTMENTS_WEBHOOK_URL;

export default async function createCustomerAppointmentSlackMessage(
  customerAppointment: CustomerAppointment
) {
  if (!SLACK_APPOINTMENTS_WEBHOOK_URL)
    throw new Error(
      "Missing environment variable: SLACK_APPOINTMENTS_WEBHOOK_URL"
    );

  const barberService = await getBarberServiceByIdInDB(
    customerAppointment.barberServiceId
  );

  const { firstName, lastName, email, phone } =
    customerAppointment.customerInformation;

  const customerAppointmentStartDateTimeFormatted = formatDate(
    convertUnixTimestampToDate(customerAppointment.startTimestamp),
    "h:mmaaa"
  );
  const customerAppointmentEndDateTimeFormatted = formatDate(
    convertUnixTimestampToDate(customerAppointment.endTimestamp),
    "h:mmaaa"
  );

  return await axios.post(SLACK_APPOINTMENTS_WEBHOOK_URL, {
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: "New appointment ✅",
          emoji: true,
        },
      },
      {
        type: "divider",
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*Name:* ${firstName} ${lastName}\n*Email:* ${email}\n*Phone:* ${phone}`,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*Service:* ${barberService?.name}\n*Time:* ${customerAppointmentStartDateTimeFormatted} - ${customerAppointmentEndDateTimeFormatted}\n*Expected Profit:* $${barberService?.priceInUSD}\n`,
        },
      },
    ],
  });
}
