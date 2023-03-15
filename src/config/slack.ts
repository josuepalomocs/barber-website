import process from "process";

if (!process.env.SLACK_SIGNING_SECRET)
  throw new Error(
    "Missing required environment variable: SLACK_SIGNING_SECRET"
  );

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

const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;
const slackBotToken = process.env.SLACK_BOT_TOKEN;
const slackCustomerAppointmentsWebhookUrl =
  process.env.SLACK_CUSTOMER_APPOINTMENTS_WEBHOOK_URL;
const slackBarberServicesWebhookUrl =
  process.env.SLACK_BARBER_SERVICES_WEBHOOK_URL;

export {
  slackSigningSecret,
  slackBotToken,
  slackCustomerAppointmentsWebhookUrl,
  slackBarberServicesWebhookUrl,
};
