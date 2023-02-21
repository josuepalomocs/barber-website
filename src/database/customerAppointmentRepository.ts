import { CustomerAppointment } from "@/types";
import dynamoClient from "@/lib/dynamo";
import { Item } from "aws-sdk/clients/simpledb";
import { AttributeMap } from "aws-sdk/clients/dynamodb";

export async function getCustomerAppointmentsByDateFromDB(
  date: Date
): Promise<CustomerAppointment[]> {
  const dayStart = date.setHours(0, 0, 0, 0);
  const dayEnd = date.setHours(23, 59, 59, 0);

  const params = {
    TableName: "CustomerAppointment",
    KeyConditionExpression: "#timestamp between :start and :end",
    ExpressionAttributeNames: {
      "#timestamp": "timestamp",
    },
    ExpressionAttributeValues: {
      ":start": { N: dayStart.toString() },
      ":end": { N: dayEnd.toString() },
    },
  };

  return new Promise<CustomerAppointment[]>((resolve, reject) => {
    dynamoClient.query(params, function (error, data) {
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
            timestamp: Number(dataItem.timestamp.N),
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
          timestamp: Number(dataItem.timestamp.N),
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
            timestamp: Number(dataItem.timestamp.N),
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
  console.log("Creating customer appointment item in DB");
  const params = {
    TableName: "CustomerAppointment",
    Item: {
      timestamp: { N: customerAppointment.timestamp.toString() },
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
      timestamp: { N: customerAppointment.timestamp.toString() },
    },
    UpdateExpression:
      "SET #timestamp = :timestamp, #barberServiceId = :barberServiceId, #customerInformation = :customerInformation",
    ExpressionAttributeNames: {
      "#timestamp": "openTime",
      "#barberServiceId": "closeTime",
      "#customerInformation": "breaks",
    },
    ExpressionAttributeValues: {
      ":timestamp": { N: customerAppointment.timestamp.toString() },
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
  timestamp: number
): Promise<void> {
  const params = {
    TableName: "CustomerAppointment",
    Key: {
      timestamp: { N: timestamp.toString() },
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

function sanitizeCustomerAppointment(
  dataItem: AttributeMap
): CustomerAppointment {
  return {
    timestamp: Number(dataItem.timestamp.N),
    barberServiceId: dataItem.barberServiceId.S as string,
    customerInformation: {
      firstName: dataItem.customerInformation.M?.firstName as string,
      lastName: dataItem.customerInformation.M?.lastName as string,
      email: dataItem.customerInformation.M?.email as string,
      phone: dataItem.customerInformation.M?.phone as string,
    },
  };
}
