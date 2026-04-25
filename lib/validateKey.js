// Fungsi untuk validasi API key user
export function validateApiKey(apikey) {
  const validKeys = (process.env.USER_API_KEYS || '').split(',');
  return validKeys.includes(apikey);
}

// Fungsi untuk dapatkan semua user (jika perlu)
export function getAllUsers() {
  const keys = (process.env.USER_API_KEYS || '').split(',');
  return keys.map(key => ({ apikey: key }));
}
