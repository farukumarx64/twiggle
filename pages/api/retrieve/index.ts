// Next.js API route: Retrieve access token and refresh token from HTTP cookies
import { NextApiRequest, NextApiResponse } from 'next';

interface Cookies {
  [key: string]: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Extract cookies from request headers
    const cookiesHeader = req.headers.cookie;

    if (!cookiesHeader) {
      // If no cookies are present, return an error response
      return res.status(400).json({ error: 'No cookies found' });
    }

    // Parse cookies string into an object
    const cookiesObj: Cookies = cookiesHeader.split(';').reduce((acc: Cookies, cookie: string) => {
      const [key, value] = cookie.trim().split('=');
      acc[key] = value;
      return acc;
    }, {});

    // Retrieve access token and refresh token from cookies
    const accessToken = cookiesObj['access_token'];
    const refreshToken = cookiesObj['refresh_token'];

    if (!accessToken || !refreshToken) {
      // If access token or refresh token is not found, return an error response
      return res.status(400).json({ error: 'Access token or refresh token not found in cookies' });
    }

    // Return the tokens in the response
    res.status(200).json({ accessToken, refreshToken });
  } else {
    // Return an error response for unsupported HTTP methods
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
