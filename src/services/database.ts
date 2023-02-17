import { v4 as uuidv4 } from "uuid";
import { BarberBreak, BarberDaySchedule, BarberService } from "@/types";
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

// database queries that target the 'barber-day-schedule' table

export async function getBarberDaySchedulesInDB(): Promise<
  BarberDaySchedule[]
> {
  const params = {
    TableName: "BarberDaySchedule",
  };

  return new Promise<BarberDaySchedule[]>((resolve, reject) => {
    dynamoClient.scan(params, function (error, data) {
      if (error) {
        const message = "Failed to get items in 'BarberDaySchedule' table.";
        reject(new Error(message, { cause: error }));
      }
      let barberDaySchedules: BarberDaySchedule[] = [];
      const dataItems = data?.Items;
      if (dataItems && dataItems.length) {
        barberDaySchedules = dataItems.map((dataItem): BarberDaySchedule => {
          return {
            weekdayNumber: Number(dataItem.weekdayNumber.N),
            openTime: dataItem.openTime.S as string,
            closeTime: dataItem.closeTime.S as string,
            breaks:
              dataItem.breaks.L?.map((barberBreak) => ({
                startTime: barberBreak.M?.startTime.S as string,
                endTime: barberBreak.M?.endTime.S as string,
              })) ?? [],
          };
        });
      }
      resolve(barberDaySchedules);
    });
  });
}

export async function createBarberDayScheduleInDB(
  barberDaySchedule: BarberDaySchedule
): Promise<BarberDaySchedule> {
  const params = {
    TableName: "BarberDaySchedule",
    Item: {
      weekdayNumber: { N: barberDaySchedule.weekdayNumber.toString() },
      openTime: { S: barberDaySchedule.openTime },
      closeTime: { S: barberDaySchedule.closeTime },
      breaks: {
        L: barberDaySchedule.breaks.map((barberBreak) => ({
          M: {
            startTime: { S: barberBreak.startTime },
            endTime: { S: barberBreak.endTime },
          },
        })),
      },
    },
  };

  return new Promise<BarberDaySchedule>((resolve, reject) => {
    dynamoClient.putItem(params, function (error) {
      if (error) {
        const message =
          "Failed to create new item in 'BarberDaySchedule' table.";
        reject(new Error(message, { cause: error }));
      }
      resolve(barberDaySchedule);
    });
  });
}

export async function updateBarberDaySchedulesInDB(
  barberDaySchedule: BarberDaySchedule
): Promise<BarberDaySchedule> {
  const params = {
    TableName: "BarberDaySchedule",
    Key: {
      weekdayNumber: { N: barberDaySchedule.weekdayNumber.toString() },
    },
    UpdateExpression:
      "SET #openTime = :openTime, #closeTime = :closeTime, #breaks = :breaks",
    ExpressionAttributeNames: {
      "#openTime": "openTime",
      "#closeTime": "closeTime",
      "#breaks": "breaks",
    },
    ExpressionAttributeValues: {
      ":openTime": { S: barberDaySchedule.openTime },
      ":closeTime": { S: barberDaySchedule.closeTime },
      ":breaks": {
        L: barberDaySchedule.breaks.map((barberBreak) => ({
          M: {
            startTime: { S: barberBreak.startTime },
            endTime: { S: barberBreak.endTime },
          },
        })),
      },
    },
    ReturnValues: "ALL_NEW",
  };

  return new Promise<BarberDaySchedule>((resolve, reject) => {
    dynamoClient.updateItem(params, function (error) {
      if (error) {
        const message = "Failed to update item in 'BarberDaySchedule' table.";
        console.log(error);
        reject(new Error(message, { cause: error }));
      }
      resolve(barberDaySchedule);
    });
  });
}

export async function deleteBarberDaySchedule(
  barberDaySchedule: BarberDaySchedule
): Promise<void> {
  const params = {
    TableName: "BarberDaySchedule",
    Key: {
      weekdayNumber: { N: barberDaySchedule.weekdayNumber.toString() },
    },
  };

  new Promise<void>((resolve, reject) => {
    dynamoClient.deleteItem(params, function (error) {
      if (error) {
        const message = "Failed to update item in 'BarberDaySchedule' table.";
        console.log(error);
        reject(new Error(message, { cause: error }));
      }
      resolve();
    });
  });
}
