import AWS from "aws-sdk";

const AMAZON_REGION = process.env.AMAZON_REGION as string;
const AMAZON_ACCESS_KEY = process.env.AMAZON_ACCESS_KEY as string;
const AMAZON_SECRET_KEY = process.env.AMAZON_SECRET_KEY as string;

AWS.config.update({
  region: AMAZON_REGION,
  credentials: {
    accessKeyId: AMAZON_ACCESS_KEY,
    secretAccessKey: AMAZON_SECRET_KEY,
  },
});

export const dynamoClient = new AWS.DynamoDB();
export const sesClient = new AWS.SES();
