/**
 * Konfigurasi Global untuk Integrasi Frontend & Backend (ES Module)
 * 
 * Anda cukup mengubah CONFIG.API_BASE_URL ke URL server backend teman Anda,
 * dan mengubah CONFIG.USE_MOCK menjadi false untuk menghubungkan langsung ke backend.
 */
export const CONFIG = {
    API_BASE_URL: "http://localhost:8000/api", // Ubah ke URL backend Anda (misal: Laravel, Express, etc.)
    USE_MOCK: true // Set ke false jika backend sudah siap digunakan
};
