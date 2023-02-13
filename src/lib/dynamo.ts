import AWS from "aws-sdk";

AWS.config.update({
  region: "us-east-2",
  credentials: {
    accessKeyId: "AKIA5SBKGKWDCJCAB4DP",
    secretAccessKey: "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",
  },
});

const dynamoDB = new AWS.DynamoDB();

export default dynamoDB;
