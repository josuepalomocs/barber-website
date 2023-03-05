import process from "process";

if (!process.env.SLACK_BOT_TOKEN)
  throw new Error("Missing required environment variable: SLACK_BOT_TOKEN");

if (!process.env.SLACK_CUSTOMER_APPOINTMENTS_WEBHOOK_URL)
  throw new Error(
    "Missing required environment variable: SLACK_CUSTOMER_APPOINTMENTS_WEBHOOK_URL"
  );

if (!process.env.SLACK_BARBER_SERVICES_WEBHOOK_URL)
  throw new Error(
    "Missing required environment variable: SLACK_BARBER_SERVICES_WEBHOOK_URL"
  );

const slackBotToken = process.env.SLACK_BOT_TOKEN;
const slackCustomerAppointmentsWebhookUrl =
  process.env.slackCustomerAppointmentsWebhookUrl;
const slackBarberServicesWebhookUrl = process.env.slackBarberServicesWebhookUrl;

export {
  slackBotToken,
  slackCustomerAppointmentsWebhookUrl,
  slackBarberServicesWebhookUrl,
};
