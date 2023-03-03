import { CustomerAppointment } from "@/types";
// import axios from "axios";
// import {
//   getBarberServiceByIdInDB,
//   getBarberServicesFromDB,
// } from "@/services/database";
// import { convertUnixTimestampToDate, formatDate } from "@/utilities/date";
// import { formatDuration } from "date-fns";
//
// const SLACK_APPOINTMENTS_WEBHOOK_URL =
//   process.env.SLACK_APPOINTMENTS_WEBHOOK_URL;
// const SLACK_BARBER_SERVICES_WEBHOOK_URL =
//   process.env.SLACK_BARBER_SERVICES_WEBHOOK_URL;
//
// export async function createBarberServicesModalView() {
//   if (!SLACK_BARBER_SERVICES_WEBHOOK_URL)
//     throw new Error(
//       "Missing environment variable: SLACK_APPOINTMENTS_WEBHOOK_URL"
//     );
//   const barberServices = await getBarberServicesFromDB();
//
//   const barberServiceSlackBlocks = barberServices
//     .sort((barberServiceA, barberServiceB) => {
//       return barberServiceA.priceInUSD < barberServiceB.priceInUSD ? -1 : 1;
//     })
//     .map(({ id, name, durationInMinutes, priceInUSD }) => {
//       const durationInMinutesFormatted = formatDuration({
//         minutes: durationInMinutes,
//       });
//       return {
//         type: "section",
//         fields: [
//           {
//             type: "mrkdwn",
//             text: `*Name*: ${name}`,
//           },
//           {
//             type: "mrkdwn",
//             text: `*Duration*: ${durationInMinutesFormatted}`,
//           },
//           {
//             type: "mrkdwn",
//             text: `*Price*: $${priceInUSD}`,
//           },
//         ],
//         accessory: {
//           type: "button",
//           text: {
//             type: "plain_text",
//             text: "Edit",
//             emoji: true,
//           },
//           action_id: id,
//         },
//       };
//     });
//
//   return await axios.post(SLACK_BARBER_SERVICES_WEBHOOK_URL, {
//     text: "test",
//     blocks: [
//       {
//         type: "header",
//         text: {
//           type: "plain_text",
//           text: "Your services 💇",
//           emoji: true,
//         },
//       },
//       {
//         type: "divider",
//       },
//       ...barberServiceSlackBlocks,
//     ],
//   });
// }
//
// export async function createCustomerAppointmentSlackMessage(
//   customerAppointment: CustomerAppointment
// ) {
//   if (!SLACK_APPOINTMENTS_WEBHOOK_URL)
//     throw new Error(
//       "Missing environment variable: SLACK_APPOINTMENTS_WEBHOOK_URL"
//     );
//
//   const barberService = await getBarberServiceByIdInDB(
//     customerAppointment.barberServiceId
//   );
//
//   const { firstName, lastName, email, phone } =
//     customerAppointment.customerInformation;
//
//   const customerAppointmentDateFormatted = formatDate(
//     convertUnixTimestampToDate(customerAppointment.startTimestamp),
//     "MMM d, yyyy"
//   );
//
//   const customerAppointmentStartDateTimeFormatted = formatDate(
//     convertUnixTimestampToDate(customerAppointment.startTimestamp),
//     "h:mmaaa"
//   );
//   const customerAppointmentEndDateTimeFormatted = formatDate(
//     convertUnixTimestampToDate(customerAppointment.endTimestamp),
//     "h:mmaaa"
//   );
//
//   return await axios.post(SLACK_APPOINTMENTS_WEBHOOK_URL, {
//     text: `${firstName} just booked an appointment! 🥳`,
//     blocks: [
//       {
//         type: "header",
//         text: {
//           type: "plain_text",
//           text: "New appointment!",
//           emoji: true,
//         },
//       },
//       {
//         type: "divider",
//       },
//       {
//         type: "section",
//         text: {
//           type: "mrkdwn",
//           text: `*Date:* ${customerAppointmentDateFormatted}\n*Time:* ${customerAppointmentStartDateTimeFormatted} - ${customerAppointmentEndDateTimeFormatted}`,
//         },
//       },
//       {
//         type: "section",
//         text: {
//           type: "mrkdwn",
//           text: `*Name:* ${firstName} ${lastName}\n*Email:* ${email}\n*Phone:* ${phone}`,
//         },
//       },
//       {
//         type: "section",
//         text: {
//           type: "mrkdwn",
//           text: `*Service:* ${barberService?.name}\n*Expected Profit:* $${barberService?.priceInUSD}\n`,
//         },
//       },
//       {
//         type: "divider",
//       },
//     ],
//   });
// }
