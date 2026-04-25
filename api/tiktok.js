// API Wrapper TikTok - Bisa dishare ke user
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      message: 'Method tidak diizinkan'
    });
  }

  const { url, apikey } = req.query;

  // Validasi API key user
  const validKeys = (process.env.USER_API_KEYS || '').split(',');
  
  if (!apikey) {
    return res.status(401).json({
      success: false,
      message: 'API key wajib diisi. Hubungi owner untuk mendapatkannya.'
    });
  }

  if (!validKeys.includes(apikey)) {
    return res.status(403).json({
      success: false,
      message: 'API key tidak valid. Hubungi owner untuk key baru.'
    });
  }

  if (!url || !url.includes('tiktok.com')) {
    return res.status(400).json({
      success: false,
      message: 'URL TikTok tidak valid'
    });
  }

  try {
    // API key asli TERSEMBUNYI di sini
    const providerURL = `https://api.neoxr.eu/api/aio?url=${encodeURIComponent(url)}&apikey=${process.env.NEOXR_API_KEY}`;
    
    const response = await fetch(providerURL);
    const data = await response.json();

    return res.status(200).json({
      success: true,
      data: data
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
}
