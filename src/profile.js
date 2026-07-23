/**
 * Controller Dashboard User - profile.html (Vite Module)
 */
import './style.css';
import { API } from './api.js';

// Inisialisasi dashboard sekali saja secara aman
function init() {
    initUserDropdown();
    initTabSystem();
    initProfileAvatarUpload();
    initEditProfileForm();
    initInternshipForm();
    loadInternshipFields();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
} else {
    init();
}

/* ==========================================================================
   1. USER DROPDOWN MENU
   ========================================================================== */
function initUserDropdown() {
    const btn = document.getElementById("user-menu-btn");
    const dropdown = document.getElementById("user-dropdown");
    const chevron = document.getElementById("user-chevron");

    if (btn && dropdown) {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const isHidden = dropdown.classList.contains("hidden");
            if (isHidden) {
                dropdown.classList.remove("hidden");
                if (chevron) chevron.classList.add("rotate-180");
            } else {
                dropdown.classList.add("hidden");
                if (chevron) chevron.classList.remove("rotate-180");
            }
        });

        // Klik di luar dropdown untuk menutup
        document.addEventListener("click", () => {
            dropdown.classList.add("hidden");
            if (chevron) chevron.classList.remove("rotate-180");
        });
    }
}

/* ==========================================================================
   2. DYNAMIC TAB SYSTEM (PROFILE, DAFTAR, STATUS)
   ========================================================================== */
function initTabSystem() {
    const tabButtons = document.querySelectorAll("#sidebar-nav button");
    const tabContents = document.querySelectorAll("main article");
    const bannerTitle = document.getElementById("banner-title");

    tabButtons.forEach(button => {
        button.addEventListener("click", () => {
            const targetTab = button.getAttribute("data-tab");
            if (!targetTab) return;

            // 1. Ganti state tombol navigasi sidebar
            tabButtons.forEach(btn => {
                // Hapus active styling
                btn.classList.remove("bg-[#f0f4fa]", "text-[#1c3c6f]", "border-[#1c3c6f]/10");
                btn.classList.add("bg-transparent", "text-slate-400", "border-transparent");
                btn.classList.add("hover:bg-slate-50");
            });

            // Tambah active styling ke tombol yang diklik
            button.classList.remove("bg-transparent", "text-slate-400", "border-transparent");
            button.classList.add("bg-[#f0f4fa]", "text-[#1c3c6f]", "border-[#1c3c6f]/10");

            // 2. Ganti konten panel kanan
            tabContents.forEach(content => {
                content.classList.add("hidden");
            });

            const targetContent = document.getElementById(`tab-content-${targetTab}`);
            if (targetContent) {
                targetContent.classList.remove("hidden");
            }

            // 3. Ganti Judul Banner
            if (bannerTitle) {
                if (targetTab === "profile") bannerTitle.textContent = "PROFILE";
                if (targetTab === "daftar") bannerTitle.textContent = "DAFTAR MAGANG";
                if (targetTab === "status") bannerTitle.textContent = "STATUS PENGAJUAN";
            }
        });
    });
}

/* ==========================================================================
   3. SIMULASI UPLOAD AVATAR
   ========================================================================== */
function initProfileAvatarUpload() {
    const btn = document.getElementById("btn-change-avatar");
    const fileInput = document.getElementById("avatar-file-input");
    const textInput = document.getElementById("avatar-filename");

    if (btn && fileInput && textInput) {
        btn.addEventListener("click", () => {
            fileInput.click();
        });

        fileInput.addEventListener("change", (e) => {
            if (e.target.files && e.target.files.length > 0) {
                const file = e.target.files[0];
                textInput.value = file.name;
                
                // Demo: update avatar di navbar dan tombol dropdown
                const navbarAvatar = document.querySelector("#user-menu-btn img");
                if (navbarAvatar) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        navbarAvatar.src = event.target.result;
                    };
                    reader.readAsDataURL(file);
                }
            }
        });
    }
}

/* ==========================================================================
   4. FORM EDIT PROFIL (SIMPAN)
   ========================================================================== */
function initEditProfileForm() {
    const form = document.getElementById("edit-profile-form");
    const submitBtn = document.getElementById("btn-save-profile");
    const alertBox = document.getElementById("profile-status-alert");

    if (form && submitBtn && alertBox) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const originalText = submitBtn.textContent;
            submitBtn.textContent = "Menyimpan Perubahan...";
            submitBtn.disabled = true;
            alertBox.className = "hidden text-sm font-semibold p-4 rounded-xl border";
            alertBox.textContent = "";

            // Simulasi delay update
            await new Promise(resolve => setTimeout(resolve, 1000));

            submitBtn.textContent = originalText;
            submitBtn.disabled = false;

            // Berhasil
            alertBox.classList.remove("hidden");
            alertBox.classList.add("block", "bg-green-50", "text-green-700", "border-green-200");
            alertBox.textContent = "Profil berhasil diperbarui secara lokal!";

            // Hilang setelah 3 detik
            setTimeout(() => {
                alertBox.classList.add("hidden");
                alertBox.classList.remove("block", "bg-green-50", "text-green-700", "border-green-200");
            }, 3000);
        });
    }
}

/* ==========================================================================
   5. FORM AJUKAN MAGANG (TAB DAFTAR)
   ========================================================================== */
function initInternshipForm() {
    const form = document.getElementById("submit-internship-form");
    const selectBidang = document.getElementById("intern-bidang");
    const submitBtn = document.getElementById("btn-submit-intern");
    const alertBox = document.getElementById("daftar-status-alert");

    // Upload Zones (PDF Dropzones)
    const dropzoneSurat = document.getElementById("dropzone-surat");
    const inputSurat = document.getElementById("file-surat");
    const textSurat = document.getElementById("filename-surat");

    const dropzoneCv = document.getElementById("dropzone-cv");
    const inputCv = document.getElementById("file-cv");
    const textCv = document.getElementById("filename-cv");

    // Click behavior untuk dropzone
    if (dropzoneSurat && inputSurat) {
        dropzoneSurat.addEventListener("click", () => inputSurat.click());
        inputSurat.addEventListener("change", (e) => {
            if (e.target.files.length > 0) {
                textSurat.textContent = `File terpilih: ${e.target.files[0].name}`;
                textSurat.classList.add("text-blue-600");
            }
        });
    }

    if (dropzoneCv && inputCv) {
        dropzoneCv.addEventListener("click", () => inputCv.click());
        inputCv.addEventListener("change", (e) => {
            if (e.target.files.length > 0) {
                textCv.textContent = `File terpilih: ${e.target.files[0].name}`;
                textCv.classList.add("text-blue-600");
            }
        });
    }

    if (form && submitBtn && alertBox) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            // Cek file
            if (!inputSurat.files.length || !inputCv.files.length) {
                alertBox.classList.remove("hidden");
                alertBox.classList.add("block", "bg-red-50", "text-red-700", "border-red-200");
                alertBox.textContent = "Error: Anda wajib mengunggah Surat Pengantar dan CV dalam format PDF.";
                return;
            }

            const originalText = submitBtn.textContent;
            submitBtn.textContent = "Mengirim Pengajuan Magang...";
            submitBtn.disabled = true;
            alertBox.className = "hidden text-sm font-semibold p-4 rounded-xl border";
            alertBox.textContent = "";

            await new Promise(resolve => setTimeout(resolve, 1500));

            submitBtn.textContent = originalText;
            submitBtn.disabled = false;

            // Berhasil
            alertBox.classList.remove("hidden");
            alertBox.classList.add("block", "bg-green-50", "text-green-700", "border-green-200");
            alertBox.textContent = "Pengajuan magang berhasil dikirim! Halaman akan dialihkan ke Tab STATUS.";

            // Sinkronisasi data ke Tab 3 (STATUS)
            const chosenBidang = selectBidang.options[selectBidang.selectedIndex].text;
            const statusBidangLabel = document.getElementById("summary-bidang");
            if (statusBidangLabel) {
                // Ambil nama bidang saja (hilangkan status kuota)
                statusBidangLabel.textContent = chosenBidang.split(" (")[0];
            }

            // Setelah 2 detik, ganti tab ke STATUS otomatis
            setTimeout(() => {
                alertBox.classList.add("hidden");
                form.reset();
                if (textSurat) textSurat.textContent = "Klik atau seret file PDF disini";
                if (textCv) textCv.textContent = "Klik atau seret file PDF disini";
                
                // Picu klik tombol tab STATUS
                const statusTabBtn = document.getElementById("tab-btn-status");
                if (statusTabBtn) statusTabBtn.click();
            }, 2000);
        });
    }
}

/* ==========================================================================
   6. DYNAMICALLY LOAD INTERNSHIP FIELDS FOR FORM
   ========================================================================== */
async function loadInternshipFields() {
    const selectBidang = document.getElementById("intern-bidang");
    if (!selectBidang) return;

    const response = await API.getBidang();
    if (response.success) {
        selectBidang.innerHTML = '<option value="" disabled selected>Pilih bidang magang...</option>';
        response.data.forEach(item => {
            const isAvailable = item.status.toLowerCase() === "tersedia";
            if (isAvailable) {
                const option = document.createElement("option");
                option.value = item.id;
                option.textContent = `${item.nama} (Tersedia: ${item.tersedia})`;
                selectBidang.appendChild(option);
            }
        });
    }
}
