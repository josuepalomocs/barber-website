import { CustomerAppointment } from "@/types";
import { dynamoClient } from "@/lib/aws";

export async function getCustomerAppointmentsByDateFromDB(
  date: Date
): Promise<CustomerAppointment[]> {
  const tempDate = new Date(date);
  tempDate.setHours(0, 0, 0, 0);
  const dayStart = Math.floor(tempDate.getTime() / 1000);
  tempDate.setHours(23, 59, 59, 0);
  const dayEnd = Math.floor(tempDate.getTime() / 1000);

  const params = {
    TableName: "CustomerAppointment",
    FilterExpression: "#startTimestamp between :start and :end",
    ExpressionAttributeNames: {
      "#startTimestamp": "startTimestamp",
    },
    ExpressionAttributeValues: {
      ":start": { N: dayStart.toString() },
      ":end": { N: dayEnd.toString() },
    },
  };

  return new Promise<CustomerAppointment[]>((resolve, reject) => {
    dynamoClient.scan(params, function (error, data) {
      if (error) {
        const message =
          "Failed to get items by date in the 'CustomerAppointment' database table.";
        reject(new Error(message, { cause: error }));
      }
      let customerAppointments: CustomerAppointment[] = [];
      const dataItems = data?.Items;
      if (dataItems && dataItems.length) {
        customerAppointments = dataItems.map(
          (dataItem): CustomerAppointment => ({
            startTimestamp: Number(dataItem.startTimestamp.N),
            endTimestamp: Number(dataItem.endTimestamp.N),
            barberServiceId: dataItem.barberServiceId.S as string,
            customerInformation: {
              firstName: dataItem.customerInformation.M?.firstName.S as string,
              lastName: dataItem.customerInformation.M?.lastName.S as string,
              email: dataItem.customerInformation.M?.email.S as string,
              phone: dataItem.customerInformation.M?.phone.S as string,
            },
          })
        );
      }
      resolve(customerAppointments);
    });
  });
}

export async function getCustomerAppointmentByTimestampFromDB(
  timestamp: number
): Promise<CustomerAppointment | null> {
  const params = {
    TableName: "CustomerAppointment",
    Key: { timestamp: { N: timestamp.toString() } },
  };

  return new Promise<CustomerAppointment | null>((resolve, reject) => {
    dynamoClient.getItem(params, function (error, data) {
      if (error)
        reject(
          new Error(
            `Failed to get item by timestamp '${timestamp}' in the 'CustomerAppointment' database table.`,
            { cause: error }
          )
        );
      let customerAppointment: CustomerAppointment | null = null;
      const dataItem = data.Item;
      if (dataItem) {
        customerAppointment = {
          startTimestamp: Number(dataItem.startTimestamp.N),
          endTimestamp: Number(dataItem.endTimestamp.N),
          barberServiceId: dataItem.barberServiceId.S as string,
          customerInformation: {
            firstName: dataItem.customerInformation.M?.firstName as string,
            lastName: dataItem.customerInformation.M?.lastName as string,
            email: dataItem.customerInformation.M?.email as string,
            phone: dataItem.customerInformation.M?.phone as string,
          },
        };
      }
      resolve(customerAppointment);
    });
  });
}

export async function getCustomerAppointmentsFromDB(): Promise<
  CustomerAppointment[]
> {
  const params = {
    TableName: "CustomerAppointment",
  };

  return new Promise<CustomerAppointment[]>((resolve, reject) => {
    dynamoClient.scan(params, function (error, data) {
      if (error) {
        const message = "Failed to get items in 'CustomerAppointment' table.";
        reject(new Error(message, { cause: error }));
      }
      let customerAppointments: CustomerAppointment[] = [];
      const dataItems = data?.Items;
      if (dataItems && dataItems.length) {
        customerAppointments = dataItems.map(
          (dataItem): CustomerAppointment => ({
            startTimestamp: Number(dataItem.startTimestamp.N),
            endTimestamp: Number(dataItem.endTimestamp.N),
            barberServiceId: dataItem.barberServiceId.S as string,
            customerInformation: {
              firstName: dataItem.customerInformation.M?.firstName.S as string,
              lastName: dataItem.customerInformation.M?.lastName.S as string,
              email: dataItem.customerInformation.M?.email.S as string,
              phone: dataItem.customerInformation.M?.phone.S as string,
            },
          })
        );
      }
      resolve(customerAppointments);
    });
  });
}

export async function createCustomerAppointmentInDB(
  customerAppointment: CustomerAppointment
): Promise<CustomerAppointment> {
  const params = {
    TableName: "CustomerAppointment",
    Item: {
      startTimestamp: { N: customerAppointment.startTimestamp.toString() },
      endTimestamp: { N: customerAppointment.endTimestamp.toString() },
      barberServiceId: { S: customerAppointment.barberServiceId },
      customerInformation: {
        M: {
          firstName: { S: customerAppointment.customerInformation.firstName },
          lastName: { S: customerAppointment.customerInformation.lastName },
          email: { S: customerAppointment.customerInformation.email },
          phone: { S: customerAppointment.customerInformation.phone },
        },
      },
    },
  };

  return new Promise<CustomerAppointment>((resolve, reject) => {
    dynamoClient.putItem(params, function (error) {
      if (error) {
        const message =
          "Failed to create new item in 'CustomerAppointment' table.";
        reject(new Error(message, { cause: error }));
      }
      resolve(customerAppointment);
    });
  });
}

export async function updateCustomerAppointmentInDB(
  customerAppointment: CustomerAppointment
): Promise<CustomerAppointment> {
  const params = {
    TableName: "CustomerAppointment",
    Key: {
      startTimestamp: { N: customerAppointment.startTimestamp.toString() },
    },
    UpdateExpression:
      "SET #startTimestamp = :startTimestamp, #endTimestamp = :endTimestamp, " +
      "#barberServiceId = :barberServiceId, #customerInformation = :customerInformation",
    ExpressionAttributeNames: {
      "#startTimestamp": "startTimestamp",
      "#endTimestamp": "endTimestamp",
      "#barberServiceId": "barberServiceId",
      "#customerInformation": "customerInformation",
    },
    ExpressionAttributeValues: {
      ":startTimestamp": { N: customerAppointment.startTimestamp.toString() },
      ":endTimestamp": { N: customerAppointment.endTimestamp.toString() },
      ":barberServiceId": { S: customerAppointment.barberServiceId as string },
      ":customerInformation": {
        M: {
          firstName: { S: customerAppointment.customerInformation.firstName },
          lastName: { S: customerAppointment.customerInformation.lastName },
          email: { S: customerAppointment.customerInformation.email },
          phone: { S: customerAppointment.customerInformation.phone },
        },
      },
    },
    ReturnValues: "ALL_NEW",
  };

  return new Promise<CustomerAppointment>((resolve, reject) => {
    dynamoClient.updateItem(params, function (error) {
      if (error) {
        const message = "Failed to update item in 'CustomerAppointment' table.";
        reject(new Error(message, { cause: error }));
      }
      resolve(customerAppointment);
    });
  });
}

export async function deleteCustomerAppointmentInDB(
  startTimestamp: number
): Promise<void> {
  const params = {
    TableName: "CustomerAppointment",
    Key: {
      startTimestamp: { N: startTimestamp.toString() },
    },
  };

  new Promise<void>((resolve, reject) => {
    dynamoClient.deleteItem(params, function (error) {
      if (error) {
        const message = "Failed to delete item in 'CustomerAppointment' table.";
        reject(new Error(message, { cause: error }));
      }
      resolve();
    });
  });
}
