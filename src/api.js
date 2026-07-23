/**
 * API Service Layer - Diskominfo Kukar Internship Portal (ES Module)
 */
import { CONFIG } from './config.js';

const getApiBaseUrl = () => {
    return CONFIG.API_BASE_URL;
};

const isMockingEnabled = () => {
    return CONFIG.USE_MOCK;
};

// Data Mockup untuk Kebutuhan Pengembangan
const MOCK_DATA = {
    bidang: [
        {
            id: 1,
            nama: "Bidang Informasi Dan Komunikasi Publik",
            deskripsi: "Mengelola penyebarluasan informasi kepada masyarakat melalui berbagai media, serta membangun komunikasi publik.",
            kuota: 10,
            tersedia: 0,
            status: "Penuh"
        },
        {
            id: 2,
            nama: "Bidang Aplikasi Informatika",
            deskripsi: "Berfokus pada pengembangan, pengelolaan, dan pemeliharaan aplikasi serta sistem informasi.",
            kuota: 10,
            tersedia: 1,
            status: "Tersedia"
        },
        {
            id: 3,
            nama: "Bidang Statistik",
            deskripsi: "Mengelola dan menganalisis data statistik sektoral untuk menghasilkan informasi yang akurat sebagai dasar pengambilan keputusan.",
            kuota: 10,
            tersedia: 3,
            status: "Tersedia"
        },
        {
            id: 4,
            nama: "Bidang Persandian",
            deskripsi: "Berfokus pada perlindungan data dan sistem informasi pemerintah melalui penerapan keamanan siber dan pengelolaan persandian.",
            kuota: 10,
            tersedia: 0,
            status: "Penuh"
        },
        {
            id: 5,
            nama: "Bidang Kesekretariatan",
            deskripsi: "Mengurus tentang pelayanan administrasi persuratan, tata usaha, serta urusan perekonomian dan perlengkapan kantor.",
            kuota: 10,
            tersedia: 5,
            status: "Tersedia"
        }
    ],
    faqs: [
        {
            id: 1,
            pertanyaan: "Surat Pengajuan Magang/PKL ditujukan ke siapa?",
            jawaban: "Surat ditujukan kepada Kepala Dinas Komunikasi dan Informatika Kab. Kukar."
        },
        {
            id: 2,
            pertanyaan: "Dokumen Apa yang Dibutuhkan?",
            jawaban: "Dokumen utama yang diperlukan meliputi Surat Pengantar dari Kampus/Sekolah, Curriculum Vitae (CV) terbaru, Proposal Magang (jika ada), serta Transkrip Nilai atau KHS terakhir."
        },
        {
            id: 3,
            pertanyaan: "Apakah Terdapat Seleksi Wawancara?",
            jawaban: "Ya, setelah seleksi berkas selesai, calon peserta magang akan dihubungi untuk mengikuti sesi wawancara singkat (online/offline) guna keselarasan kompetensi."
        },
        {
            id: 4,
            pertanyaan: "Apakah Mendapatkan Uang Saku?",
            jawaban: "Program magang/PKL di Diskominfo Kukar bersifat sukarela (non-paid) dengan fokus pada pengembangan keahlian, pengalaman industri, dan perluasan jaringan profesional."
        },
        {
            id: 5,
            pertanyaan: "Apakah Mendapatkan Surat Keterangan Magang/PKL?",
            jawaban: "Tentu saja. Setelah menyelesaikan masa magang dan mengumpulkan laporan, Anda akan mendapatkan Surat Keterangan Magang resmi beserta Sertifikat Nilai dari Diskominfo Kukar."
        }
    ]
};

// Helper untuk mensimulasikan delay server (Promise-based delay)
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const API = {
    /**
     * Mengambil daftar bidang magang yang tersedia
     */
    async getBidang() {
        if (isMockingEnabled()) {
            await delay(400); // Simulasi delay 400ms
            return { success: true, data: MOCK_DATA.bidang };
        }

        try {
            const response = await fetch(`${getApiBaseUrl()}/bidang`);
            if (!response.ok) throw new Error("Gagal mengambil data bidang magang");
            const data = await response.json();
            return { success: true, data: data };
        } catch (error) {
            console.error("API Error (getBidang):", error);
            return { success: false, error: error.message };
        }
    },

    /**
     * Mengambil daftar FAQ populer
     */
    async getFaqs() {
        if (isMockingEnabled()) {
            await delay(300); // Simulasi delay 300ms
            return { success: true, data: MOCK_DATA.faqs };
        }

        try {
            const response = await fetch(`${getApiBaseUrl()}/faqs`);
            if (!response.ok) throw new Error("Gagal mengambil data FAQ");
            const data = await response.json();
            return { success: true, data: data };
        } catch (error) {
            console.error("API Error (getFaqs):", error);
            return { success: false, error: error.message };
        }
    },

    /**
     * Mengirimkan formulir pendaftaran kontak/pesan baru
     */
    async submitHubungiKami(formData) {
        if (isMockingEnabled()) {
            await delay(800); // Simulasi delay 800ms
            console.log("Mock Submit Data:", formData);
            return { success: true, message: "Pesan Anda berhasil terkirim! Tim kami akan segera menghubungi Anda." };
        }

        try {
            const response = await fetch(`${getApiBaseUrl()}/hubungi-kami`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) throw new Error("Gagal mengirimkan pesan");
            const data = await response.json();
            return { success: true, message: data.message || "Pesan terkirim!" };
        } catch (error) {
            console.error("API Error (submitHubungiKami):", error);
            return { success: false, error: error.message };
        }
    }
};
