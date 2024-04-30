// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Session, User, createClient } from "@supabase/supabase-js";
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
  const supabaseUrl: any = process.env.NEXT_PUBLIC_SUPABASE_DB_URL;
  const supabaseKey: any = process.env.NEXT_PUBLIC_SUPABASE_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);

  if (req.method === 'POST') {
    try {
      // Clear the user's session
      await supabase.auth.signOut();

      // Remove access token and refresh token from cookies
      res.setHeader('Set-Cookie', [
        `access_token=""; HttpOnly; Secure; SameSite=Strict; Expires=Thu, 01 Jan 1970 00:00:00 GMT`,
        `refresh_token=""; HttpOnly; Secure; SameSite=Strict; Expires=Thu, 01 Jan 1970 00:00:00 GMT`,
      ]);

      res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
      console.error('Logout error:', error);
      res.status(500).json({ error: 'Logout failed' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
