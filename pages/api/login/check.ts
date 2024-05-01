// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import createClient from "@/utils/supabase/api";
import { User } from "@supabase/supabase-js";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  session : User | null;
};

type ErrorResponse = {
  error: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorResponse>
) {
  const supabase = createClient(req, res);
  if (req.method === 'GET') {
    try {
      // Check if user is authenticated or logged in
      const response = await supabase.auth.getUser();
      console.log("the response: ", response)
      
      // Return the login status in the response
      res.status(200).json({ session: response.data.user });
    } catch (error) {
      // Return an error response if there's an issue with authentication
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    // Return an error response for unsupported HTTP methods
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
