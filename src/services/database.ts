import { v4 as uuidv4 } from "uuid";
import { BarberService } from "@/types";
import dynamoClient from "@/lib/dynamo";

// database queries that target the 'barber-service' table

export async function getBarberServicesInDB(): Promise<BarberService[]> {
  const params = {
    TableName: "BarberService",
  };

  return new Promise<BarberService[]>((resolve, reject) => {
    dynamoClient.scan(params, function (error, data) {
      if (error) {
        const message = "Failed to get items in 'BarberService' table.";
        reject(new Error(message, { cause: error }));
      }
      let barberServices: BarberService[] = [];
      const dataItems = data?.Items;
      if (dataItems && dataItems.length) {
        barberServices = dataItems.map((dataItem): BarberService => {
          return {
            id: dataItem.barberServiceId.S as string,
            name: dataItem.barberServiceName.S as string,
            description: dataItem.barberServiceDescription.S as string,
            durationInMinutes: Number(
              dataItem.barberServiceDurationInMinutes.N
            ),
            priceInUSD: Number(dataItem.barberServicePriceInUSD.N),
          };
        });
      }
      resolve(barberServices);
    });
  });
}

export async function createBarberServiceInDB(
  barberService: BarberService
): Promise<BarberService> {
  barberService.id = uuidv4();

  const params = {
    TableName: "BarberService",
    Item: {
      barberServiceId: { S: barberService.id },
      barberServiceName: { S: barberService.name },
      barberServiceDescription: { S: barberService.description },
      barberServiceDurationInMinutes: {
        N: barberService.durationInMinutes.toString(),
      },
      barberServicePriceInUSD: { N: barberService.priceInUSD.toString() },
    },
  };

  return new Promise<BarberService>((resolve, reject) => {
    dynamoClient.putItem(params, function (error) {
      if (error) {
        const message = "Failed to create new item in 'BarberService' table.";
        reject(new Error(message, { cause: error }));
      }
      resolve(barberService);
    });
  });
}
