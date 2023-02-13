import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  dates: string[];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
  }
  if (req.method === "POST") {
  }
}
