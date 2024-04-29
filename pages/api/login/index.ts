// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Session, User, createClient } from "@supabase/supabase-js";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  user: User | null;
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

  try {
    const request = req.body

    const { data, error } = await supabase.auth.signInWithPassword({
      email: request.email,
      password: request.password,
    });
    if(error) {
      console.error("Error:", error);
      return res.status(400).json({ error: error.message || "Login failed" });
    } else {
      console.log("response: ", data);
      return res.status(200).json({ user: data.user, session: data.session });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
