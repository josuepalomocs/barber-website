import process from "process";

if (!process.env.AMAZON_REGION)
  throw new Error("Missing required environment variable: AMAZON_REGION");

if (!process.env.AMAZON_ACCESS_KEY)
  throw new Error("Missing required environment variable: AMAZON_ACCESS_KEY");

if (!process.env.AMAZON_SECRET_KEY)
  throw new Error("Missing required environment variable: AMAZON_SECRET_KEY");

const amazonRegion = process.env.AMAZON_REGION;
const amazonAccessKey = process.env.AMAZON_ACCESS_KEY;
const amazonSecretKey = process.env.AMAZON_SECRET_KEY;

export { amazonRegion, amazonAccessKey, amazonSecretKey };
