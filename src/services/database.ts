import { v4 as uuidv4 } from "uuid";
import { BarberService } from "@/types";
import dynamoClient from "@/lib/dynamo";

// database queries that target the 'barber-service' table

export async function createBarberServiceInDB(
  barberService: BarberService
): Promise<BarberService> {
  const id = uuidv4();

  const params = {
    TableName: "BarberService",
    Item: {
      barberServiceId: { S: id },
      barberServiceName: { S: barberService.name },
      barberServiceDescription: { S: barberService.description },
      barberServiceDurationInMinutes: {
        N: barberService.durationInMinutes.toString(),
      },
      barberServicePriceInUSD: { N: barberService.priceInUSD.toString() },
    },
  };

  return new Promise<BarberService>((resolve, reject) => {
    dynamoClient.putItem(params, function (error, data) {
      if (error) {
        const message = "Failed to create new item in 'BarberService' table.";
        reject(new Error(message, { cause: error }));
      }
      resolve({ ...barberService, id } as BarberService);
    });
  });
}
