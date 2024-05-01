// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import createClient from "@/utils/supabase/api";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
};

type ErrorResponse = {
  error: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorResponse>
) {
  const supabase = createClient(req, res);

  if (req.method === "POST") {
    try {
      // Clear the user's session
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error(error);
        res.status(500).json({ error: error });
      }
      res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      console.error("Logout error:", error);
      res.status(500).json({ error: "Logout failed" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
