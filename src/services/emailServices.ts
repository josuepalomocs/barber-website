import { sesClient } from "@/lib/aws";
import { SendEmailRequest } from "aws-sdk/clients/ses";
import { CustomerAppointment } from "@/types";
import { getBarberServiceByIdInDB } from "@/services/database";
import { formatDate } from "@/utilities/date";

export async function sendCustomerAppointmentConfirmationEmail(
  customerAppointment: CustomerAppointment
): Promise<void> {
  const { startTimestamp, endTimestamp, barberServiceId, customerInformation } =
    customerAppointment;

  const barberService = await getBarberServiceByIdInDB(barberServiceId);

  const params: SendEmailRequest = {
    Source: "ocfadesdevelop@gmail.com",
    Destination: {
      ToAddresses: ["ocfadesdevelop@gmail.com"],
    },
    Message: {
      Subject: {
        Data: "Your appointment with Osvaldo is confirmed. Thank you!",
      },
      Body: {
        Html: {
          Data: `<!DOCTYPE html>
                <html>
                <head>
                \t<title>Appointment Confirmation</title>
                </head>
                <body>
                \t<p>Dear ${customerInformation.firstName},</p>
                \t<p>Thank you for booking an appointment with us. Below are the details of your appointment:</p>
                \t<ul>
                \t\t<li><strong>Date: </strong>${formatDate(
                  new Date(startTimestamp * 1000),
                  "MMMM d, yyyy"
                )}</li>
                \t\t<li><strong>Time: </strong>${formatDate(
                  new Date(startTimestamp * 1000),
                  "h:mmaaa"
                )} - ${formatDate(
            new Date(endTimestamp * 1000),
            "h:mmaaa"
          )}</li>
                \t\t<li><strong>Service: </strong>${barberService?.name}</li>
                \t\t<li><strong>Price: </strong>$${
                  barberService?.priceInUSD
                }</li>
                \t\t<li><strong>Location:</strong>
                <a href="https://goo.gl/maps/ksbyfxYFftbK79md8">10455 N Central Expy # 124, Dallas, TX 75231</a>
                </li>
                \t</ul>
                \t<p>If you have any questions or need to reschedule your appointment, please contact us as soon as possible.</p>
                \t<p>We look forward to seeing you!</p>
                </body>
                </html>`,
        },
        Text: {
          Data: "We just wanted to let you know that you successfully booked an appointment. See you soon!",
        },
      },
    },
  };

  sesClient.sendEmail(params, (error) => {
    if (error)
      throw new Error(
        "Failed to send customer appointment confirmation email using the sesClient.",
        {
          cause: error,
        }
      );
  });
}
