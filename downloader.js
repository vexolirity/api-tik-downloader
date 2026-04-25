// api/downloader.js - ALL IN ONE API WRAPPER
export default async function handler(req, res) {
  // Hanya izinkan GET
  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      message: 'Method tidak diizinkan. Gunakan GET'
    });
  }

  const { url, apikey } = req.query;

  // Validasi API key user
  const validKeys = (process.env.USER_API_KEYS || '').split(',');
  
  if (!apikey) {
    return res.status(401).json({
      success: false,
      message: 'Parameter "apikey" wajib diisi'
    });
  }

  if (!validKeys.includes(apikey)) {
    return res.status(403).json({
      success: false,
      message: 'API key tidak valid'
    });
  }

  // Validasi URL
  if (!url) {
    return res.status(400).json({
      success: false,
      message: 'Parameter "url" wajib diisi'
    });
  }

  // Daftar platform yang didukung (hanya untuk info)
  const supportedPlatforms = [
    'tiktok.com', 'instagram.com', 'youtube.com', 'youtu.be',
    'twitter.com', 'x.com', 'facebook.com', 'fb.watch',
    'pinterest.com', 'likee.com', 'snapchat.com'
  ];

  try {
    // Panggil API provider (All-in-One)
    const providerURL = `https://api.neoxr.eu/api/aio?url=${encodeURIComponent(url)}&apikey=${process.env.NEOXR_API_KEY}`;
    
    const response = await fetch(providerURL);
    const data = await response.json();

    // Kembalikan response ke user
    return res.status(200).json({
      success: true,
      platform: detectPlatform(url), // opsional: deteksi platform
      data: data
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server',
      error: error.message
    });
  }
}

// Fungsi bantu deteksi platform (opsional)
function detectPlatform(url) {
  if (url.includes('tiktok.com')) return 'tiktok';
  if (url.includes('instagram.com')) return 'instagram';
  if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube';
  if (url.includes('twitter.com') || url.includes('x.com')) return 'twitter';
  if (url.includes('facebook.com') || url.includes('fb.watch')) return 'facebook';
  return 'unknown';
}
