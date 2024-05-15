import type { NextApiRequest, NextApiResponse } from 'next';
import urlMetadata from 'url-metadata';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const metadata = await urlMetadata(url as string);
    res.status(200).json({ title: metadata.title });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch metadata' });
  }
}
