import type { NextApiRequest, NextApiResponse } from "next";
import { createBarberServicesModalView } from "@/services/slack";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("top");
  if (req.method === "POST") {
    return await createBarberServicesModalView()
      .then(() => res.status(200).end())
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  }
}
