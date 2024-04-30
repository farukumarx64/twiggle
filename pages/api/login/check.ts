// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Session, User, createClient } from "@supabase/supabase-js";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  session : Session | null;
};

type ErrorResponse = {
  error: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorResponse>
) {
  const supabaseUrl: any = process.env.NEXT_PUBLIC_SUPABASE_DB_URL;
  const supabaseKey: any = process.env.NEXT_PUBLIC_SUPABASE_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);

  if (req.method === 'GET') {
    try {
      // Check if user is authenticated or logged in
      const response = await supabase.auth.refreshSession();
      console.log("the response: ", response)
      
      // Return the login status in the response
      res.status(200).json({ session: response.data.session });
    } catch (error) {
      // Return an error response if there's an issue with authentication
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    // Return an error response for unsupported HTTP methods
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
