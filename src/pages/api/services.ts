import type { NextApiRequest, NextApiResponse } from "next";
import dynamoClient from "@/lib/dynamo";
import { v4 as uuidv4 } from "uuid";
import { BarberService } from "@/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const params = {
      TableName: "BarberService",
    };

    dynamoClient.scan(params, function (err, data) {
      if (err) {
      } else {
        let barberServiceList: BarberService[] = [];
        if (data.Items) {
          for (let i = 0; i < data.Items.length; i++) {
            const {
              barberServiceId,
              barberServiceName,
              barberServiceDescription,
              barberServiceDurationInMinutes,
              barberServicePriceInUSD,
            } = data.Items[i];
            barberServiceList[i] = {
              id: barberServiceId.S as string,
              name: barberServiceName.S as string,
              description: barberServiceDescription.S as string,
              durationInMinutes: Number(barberServiceDurationInMinutes.N),
              priceInUSD: Number(barberServicePriceInUSD.N),
            };
          }
        }
        res.status(200).json(barberServiceList);
      }
    });
  }
  if (req.method === "POST") {
    const { name, description, durationInMinutes, priceInUSD }: BarberService =
      req.body;

    const serviceId = uuidv4();

    const params = {
      TableName: "BarberService",
      Item: {
        barberServiceId: { S: serviceId.toString() },
        barberServiceName: { S: name },
        barberServiceDescription: { S: description },
        barberServiceDurationInMinutes: { N: durationInMinutes.toString() },
        barberServicePriceInUSD: { N: priceInUSD.toString() },
      },
    };

    let r;

    // Call DynamoDB to add the item to the table
    dynamoClient.putItem(params, function (err, data) {
      if (err) {
        r = err;
      } else {
        r = data;
      }
    });

    res.status(200).json({ r });
  }
  if (req.method === "DELETE") {
    const barberServiceId = req.query["barber-service-id"];
    console.log(barberServiceId);
    if (barberServiceId) {
      const params = {
        TableName: "BarberService",
        Key: {
          barberServiceId: { S: barberServiceId.toString() },
        },
      };

      // Call DynamoDB to delete the item from the table
      return dynamoClient.deleteItem(params, function (err, data) {
        if (err) {
        } else {
          return res.status(200).json({ barberServiceId });
        }
      });
    }
  }
}
