import { v4 as uuidv4 } from "uuid";
import {
  BarberBreak,
  BarberDaySchedule,
  BarberService,
  CustomerAppointment,
} from "@/types";
import { dynamoClient } from "@/lib/aws";

// database queries that target the 'barber-service' table

export async function getBarberServiceByIdInDB(
  id: string
): Promise<BarberService | null> {
  const params = {
    TableName: "BarberService",
    Key: { barberServiceId: { S: id } },
  };

  return new Promise<BarberService | null>((resolve, reject) => {
    dynamoClient.getItem(params, function (error, data) {
      if (error) {
        const message = `Failed to get item by id: ${id} in 'BarberService' table.`;
        reject(new Error(message, { cause: error }));
      }
      let barberService: BarberService | null = null;
      const dataItem = data?.Item;
      if (dataItem) {
        barberService = {
          id: dataItem.barberServiceId.S as string,
          name: dataItem.barberServiceName.S as string,
          description: dataItem.barberServiceDescription.S as string,
          durationInMinutes: Number(dataItem.barberServiceDurationInMinutes.N),
          priceInUSD: Number(dataItem.barberServicePriceInUSD.N),
        };
      }
      resolve(barberService);
    });
  });
}

export async function getBarberServicesFromDB(): Promise<BarberService[]> {
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

export async function updateBarberServiceInDB(
  barberService: BarberService
): Promise<BarberService> {
  const params = {
    TableName: "BarberService",
    Key: {
      barberServiceId: { S: barberService.id },
    },
    UpdateExpression:
      "SET #barberServiceName = :barberServiceName, #barberServiceDescription = :barberServiceDescription, " +
      "#barberServiceDurationInMinutes = :barberServiceDurationInMinutes, #barberServicePriceInUSD = :barberServicePriceInUSD",
    ExpressionAttributeNames: {
      "#barberServiceName": "barberServiceName",
      "#barberServiceDescription": "barberServiceDescription",
      "#barberServiceDurationInMinutes": "barberServiceDurationInMinutes",
      "#barberServicePriceInUSD": "barberServicePriceInUSD",
    },
    ExpressionAttributeValues: {
      ":barberServiceName": { S: barberService.name },
      ":barberServiceDescription": { S: barberService.description },
      ":barberServiceDurationInMinutes": {
        S: barberService.durationInMinutes.toString(),
      },
      ":barberServicePriceInUSD": { S: barberService.priceInUSD.toString() },
    },
    ReturnValues: "ALL_NEW",
  };

  return new Promise<BarberService>((resolve, reject) => {
    dynamoClient.updateItem(params, function (error) {
      if (error) {
        const message = "Failed to update item in 'BarberService' table.";
        reject(new Error(message, { cause: error }));
      }
      resolve(barberService);
    });
  });
}

export async function deleteBarberServiceInDB(id: string): Promise<void> {
  const params = {
    TableName: "BarberService",
    Key: {
      barberServiceId: { S: id },
    },
  };

  new Promise<void>((resolve, reject) => {
    dynamoClient.deleteItem(params, function (error) {
      if (error) {
        const message = "Failed to delete item in 'BarberService' table.";
        reject(new Error(message, { cause: error }));
      }
      resolve();
    });
  });
}

// database queries that target the 'barber-day-schedule' table

export async function getBarberDayScheduleByDayFromDB(
  weekdayNumber: number
): Promise<BarberDaySchedule | null> {
  const params = {
    TableName: "BarberDaySchedule",
    Key: { weekdayNumber: { N: weekdayNumber.toString() } },
  };

  return new Promise<BarberDaySchedule | null>((resolve, reject) => {
    dynamoClient.getItem(params, function (error, data) {
      if (error) {
        const message = `Failed to get item by weekdayNumber: ${weekdayNumber} in 'BarberDaySchedule' table.`;
        reject(new Error(message, { cause: error }));
      }
      let barberDaySchedule: BarberDaySchedule | null = null;
      const dataItem = data.Item;
      if (dataItem) {
        barberDaySchedule = {
          dayOfWeek: Number(dataItem.weekdayNumber.N),
          openTime: dataItem.openTime.S as string,
          closeTime: dataItem.closeTime.S as string,
          breaks:
            dataItem.breaks.L?.map((barberBreak) => ({
              startTime: barberBreak.M?.startTime.S as string,
              endTime: barberBreak.M?.endTime.S as string,
            })) ?? [],
          appointmentIntervalInMinutes: Number(
            dataItem.appointmentIntervalInMinutes.N
          ),
          appointmentSlots:
            dataItem.appointmentSlots.L?.map(
              (appointmentSlot) => appointmentSlot.S as string
            ) ?? [],
        };
      }
      resolve(barberDaySchedule);
    });
  });
}

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
            dayOfWeek: Number(dataItem.weekdayNumber.N),
            openTime: dataItem.openTime.S as string,
            closeTime: dataItem.closeTime.S as string,
            breaks:
              dataItem.breaks.L?.map((barberBreak) => ({
                startTime: barberBreak.M?.startTime.S as string,
                endTime: barberBreak.M?.endTime.S as string,
              })) ?? [],
            appointmentIntervalInMinutes: Number(
              dataItem.appointmentIntervalInMinutes.N
            ),
            appointmentSlots:
              dataItem.appointmentSlots?.L?.map(
                (appointmentSlot) => appointmentSlot.S as string
              ) ?? [],
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
      weekdayNumber: { N: barberDaySchedule.dayOfWeek.toString() },
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
      appointmentIntervalInMinutes: {
        N: barberDaySchedule.appointmentIntervalInMinutes.toString(),
      },
      appointmentSlots: {
        L: barberDaySchedule.appointmentSlots.map((appointmentSlot) => ({
          S: appointmentSlot,
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

export async function updateBarberDayScheduleInDB(
  barberDaySchedule: BarberDaySchedule
): Promise<BarberDaySchedule> {
  const params = {
    TableName: "BarberDaySchedule",
    Key: {
      weekdayNumber: { N: barberDaySchedule.dayOfWeek.toString() },
    },
    UpdateExpression:
      "SET #openTime = :openTime, #closeTime = :closeTime, #breaks = :breaks, " +
      "#appointmentIntervalInMinutes = :appointmentIntervalInMinutes, #appointmentSlots = :appointmentSlots",
    ExpressionAttributeNames: {
      "#openTime": "openTime",
      "#closeTime": "closeTime",
      "#breaks": "breaks",
      "#appointmentIntervalInMinutes": "appointmentIntervalInMinutes",
      "#appointmentSlots": "appointmentSlots",
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
      ":appointmentIntervalInMinutes": {
        N: barberDaySchedule.appointmentIntervalInMinutes.toString(),
      },
      ":appointmentSlots": {
        L: barberDaySchedule.appointmentSlots.map((appointmentSlot) => ({
          S: appointmentSlot,
        })),
      },
    },
    ReturnValues: "ALL_NEW",
  };

  return new Promise<BarberDaySchedule>((resolve, reject) => {
    dynamoClient.updateItem(params, function (error) {
      if (error) {
        const message = "Failed to update item in 'BarberDaySchedule' table.";
        reject(new Error(message, { cause: error }));
      }
      resolve(barberDaySchedule);
    });
  });
}

export async function deleteBarberDayScheduleInDB(
  weekdayNumber: number
): Promise<void> {
  const params = {
    TableName: "BarberDaySchedule",
    Key: {
      weekdayNumber: { N: weekdayNumber.toString() },
    },
  };

  new Promise<void>((resolve, reject) => {
    dynamoClient.deleteItem(params, function (error) {
      if (error) {
        const message = "Failed to delete item in 'BarberDaySchedule' table.";
        reject(new Error(message, { cause: error }));
      }
      resolve();
    });
  });
}
