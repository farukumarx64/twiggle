// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import createClient from "@/utils/supabase/api";
import { Provider, Session, User } from "@supabase/supabase-js";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  provider: Provider | null;
  url : string | null;
};

type ErrorResponse = {
  error: any;
};

const getURL = (dir: string) => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    'http://localhost:3000/'
  // Make sure to include `https://` when not localhost.
  url = url.includes('http') ? url : `https://${url}`
  // Make sure to include a trailing `/`.
  url = url.charAt(url.length - 1) === '/' ? url : `${url}/`
  url += dir
  return url
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorResponse>
) {
  const supabase = createClient(req, res);

  supabase.auth.onAuthStateChange((event, session) => {
    if (session && session.provider_token) {
      window.localStorage.setItem('oauth_provider_token', session.provider_token)
    }
  
    if (session && session.provider_refresh_token) {
      window.localStorage.setItem('oauth_provider_refresh_token', session.provider_refresh_token)
    }
  
    if (event === 'SIGNED_OUT') {
      window.localStorage.removeItem('oauth_provider_token')
      window.localStorage.removeItem('oauth_provider_refresh_token')
    }
  })

  try {
    const request = req.body

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: request.provider,
      options: {
        redirectTo: request.url + '/login/oauth'
      }
    });
    if(error) {
      console.error("Error:", error);
      return res.status(400).json({ error: error.message || "Login failed" });
    } else {
      console.log("response: ", data);
      
      return res.status(200).json({ provider: data.provider, url: data.url });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
