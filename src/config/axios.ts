import process from "process";

if (!process.env.NEXT_PUBLIC_SPRING_SERVER_BASE_URL)
  throw new Error(
    "Missing required environment variable: NEXT_PUBLIC_SPRING_SERVER_BASE_URL"
  );

const springServerBaseUrl = process.env.NEXT_PUBLIC_SPRING_SERVER_BASE_URL;

export { springServerBaseUrl };
