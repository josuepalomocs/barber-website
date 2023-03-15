import type { NextApiRequest, NextApiResponse } from "next";
import { slackBolt } from "@/lib/slack";

slackBolt.event("app_home_opened", async ({ event, client, body }) => {});

export default async function slackEventsHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    console.log("Reaching slackEventsHandler");
    slackBolt.res.status(200).end();
  }
}
