// api/tiktok.js
export default async function handler(req, res) {
  const { url, apikey } = req.query;

  // API key buatan kamu untuk user
  const USER_API_KEY = "a7k3m9x2p4";

  // API key asli provider (disimpan di Vercel Environment Variables)
  const PROVIDER_API_KEY = process.env.NEOXR_API_KEY;

  // cek apikey user
  if (!apikey) {
    return res.status(401).json({
      status: false,
      message: "apikey wajib diisi"
    });
  }

  if (apikey !== USER_API_KEY) {
    return res.status(403).json({
      status: false,
      message: "apikey tidak valid"
    });
  }

  // cek url
  if (!url) {
    return res.status(400).json({
      status: false,
      message: "url wajib diisi"
    });
  }

  try {
    const apiUrl = `https://api.neoxr.eu/api/aio?url=${encodeURIComponent(url)}&apikey=${PROVIDER_API_KEY}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "server error",
      error: error.message
    });
  }
}
