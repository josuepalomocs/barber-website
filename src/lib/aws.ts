import AWS from "aws-sdk";
import {
  amazonAccessKey,
  amazonRegion,
  amazonSecretKey,
} from "@/config/amazon";

AWS.config.update({
  region: amazonRegion,
  credentials: {
    accessKeyId: amazonAccessKey,
    secretAccessKey: amazonSecretKey,
  },
});

export const dynamoClient = new AWS.DynamoDB();
export const sesClient = new AWS.SES();
