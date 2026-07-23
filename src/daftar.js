/**
 * Controller Halaman Pendaftaran - daftar.html
 */
import './style.css';

document.addEventListener("DOMContentLoaded", () => {
    initPasswordToggle();
    initRegistrationForm();
});

// Jalankan immediately jika modul dimuat setelah DOM siap
if (document.readyState === "interactive" || document.readyState === "complete") {
    initPasswordToggle();
    initRegistrationForm();
}

/* ==========================================================================
   1. SHOW/HIDE PASSWORD (TOGGLE EYE ICON)
   ========================================================================== */
function initPasswordToggle() {
    const toggles = [
        { buttonId: "toggle-password", inputId: "reg-password" },
        { buttonId: "toggle-confirm-password", inputId: "reg-password-confirm" }
    ];

    const EYE_OPEN_SVG = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
    `;

    const EYE_CLOSED_SVG = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
        </svg>
    `;

    toggles.forEach(({ buttonId, inputId }) => {
        const button = document.getElementById(buttonId);
        const input = document.getElementById(inputId);

        if (button && input) {
            button.addEventListener("click", () => {
                const isPassword = input.getAttribute("type") === "password";
                
                // Toggle Type
                input.setAttribute("type", isPassword ? "text" : "password");
                
                // Toggle Icon
                button.innerHTML = isPassword ? EYE_CLOSED_SVG : EYE_OPEN_SVG;
                button.setAttribute("aria-label", isPassword ? "Sembunyikan Kata Sandi" : "Tampilkan Kata Sandi");
            });
        }
    });
}

/* ==========================================================================
   2. FORM VALIDATION & SIMULATED SUBMISSION
   ========================================================================== */
function initRegistrationForm() {
    const form = document.getElementById("register-account-form");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const nameInput = document.getElementById("reg-name");
        const nisInput = document.getElementById("reg-nis");
        const emailInput = document.getElementById("reg-email");
        const passwordInput = document.getElementById("reg-password");
        const confirmInput = document.getElementById("reg-password-confirm");
        const submitBtn = document.getElementById("submit-reg-btn");
        const statusAlert = document.getElementById("form-status-alert");

        // Reset state
        statusAlert.className = "hidden text-sm font-semibold p-4 rounded-xl border";
        statusAlert.textContent = "";
        passwordInput.classList.remove("border-red-500", "focus:border-red-500", "focus:ring-red-500/10");
        confirmInput.classList.remove("border-red-500", "focus:border-red-500", "focus:ring-red-500/10");

        const name = nameInput.value.trim();
        const nis = nisInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const confirmPassword = confirmInput.value;

        // Validasi password cocok
        if (password !== confirmPassword) {
            statusAlert.classList.remove("hidden");
            statusAlert.classList.add("block", "bg-red-50", "text-red-700", "border-red-200");
            statusAlert.textContent = "Error: Konfirmasi kata sandi tidak cocok. Silakan periksa kembali.";
            
            // Highlight password inputs
            [passwordInput, confirmInput].forEach(input => {
                input.classList.add("border-red-500", "focus:border-red-500", "focus:ring-red-500/10");
            });
            return;
        }

        // Tampilkan loading state
        const originalText = submitBtn.textContent;
        submitBtn.textContent = "Mengirim...";
        submitBtn.disabled = true;

        const payload = { name, nis, email, password };

        try {
            // Simulasi request API ke backend (POST /api/register)
            await new Promise(resolve => setTimeout(resolve, 1200));

            // Log data untuk tim backend
            console.log("Registered Account Payload:", payload);

            // Tampilkan sukses
            statusAlert.classList.remove("hidden");
            statusAlert.classList.add("block", "bg-green-50", "text-green-700", "border-green-200");
            statusAlert.textContent = "Akun berhasil didaftarkan! Mengalihkan Anda ke beranda...";

            form.reset();

            // Redirect ke halaman dashboard setelah 2 detik
            setTimeout(() => {
                window.location.href = "/profile.html";
            }, 2000);

        } catch (error) {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            statusAlert.classList.remove("hidden");
            statusAlert.classList.add("block", "bg-red-50", "text-red-700", "border-red-200");
            statusAlert.textContent = "Terjadi kesalahan koneksi. Gagal menghubungi server backend.";
        }
    });
}
