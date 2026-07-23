/**
 * Main Controller - Portal Magang Diskominfo Kukar (Vite Module)
 */
import './style.css';
import { API } from './api.js';

// Jalankan saat DOM siap
document.addEventListener("DOMContentLoaded", () => {
    initNavbar();
    initModals();
    loadBidangMagang();
    loadFaqs();
});

// Jalankan immediately jika modul dimuat setelah DOM siap
if (document.readyState === "interactive" || document.readyState === "complete") {
    initNavbar();
    initModals();
    loadBidangMagang();
    loadFaqs();
}

/* ==========================================================================
   1. LOGIKA INTERAKSI NAVBAR (Sticky & Mobile Toggle)
   ========================================================================== */
function initNavbar() {
    const navbar = document.getElementById("main-navbar");
    const menuToggle = document.getElementById("nav-menu-toggle");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    // Sticky navbar saat di-scroll
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("bg-white", "shadow-md");
            navbar.classList.remove("bg-white/95");
        } else {
            navbar.classList.remove("shadow-md", "bg-white");
            navbar.classList.add("bg-white/95");
        }
    });

    // Toggle menu mobile
    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            const isHidden = navMenu.classList.contains("hidden");
            if (isHidden) {
                navMenu.classList.remove("hidden");
                navMenu.classList.add("flex", "flex-col", "fixed", "left-0", "top-[72px]", "w-full", "h-[calc(100vh-72px)]", "bg-white", "p-8", "shadow-lg", "gap-8");
                menuToggle.classList.add("active");
                // Efek hamburger icon menjadi silang
                const spans = menuToggle.querySelectorAll("span");
                if (spans.length === 3) {
                    spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
                    spans[1].style.opacity = "0";
                    spans[2].style.transform = "rotate(-45deg) translate(5px, -6px)";
                }
            } else {
                navMenu.classList.add("hidden");
                navMenu.classList.remove("flex", "flex-col", "fixed", "left-0", "top-[72px]", "w-full", "h-[calc(100vh-72px)]", "bg-white", "p-8", "shadow-lg", "gap-8");
                menuToggle.classList.remove("active");
                // Reset hamburger icon
                const spans = menuToggle.querySelectorAll("span");
                if (spans.length === 3) {
                    spans[0].style.transform = "none";
                    spans[1].style.opacity = "1";
                    spans[2].style.transform = "none";
                }
            }
        });

        // Klik di luar menu untuk menutup
        document.addEventListener("click", (e) => {
            if (!navMenu.classList.contains("hidden") && !navMenu.contains(e.target) && e.target !== menuToggle) {
                navMenu.classList.add("hidden");
                navMenu.classList.remove("flex", "flex-col", "fixed", "left-0", "top-[72px]", "w-full", "h-[calc(100vh-72px)]", "bg-white", "p-8", "shadow-lg", "gap-8");
                menuToggle.classList.remove("active");
                const spans = menuToggle.querySelectorAll("span");
                if (spans.length === 3) {
                    spans[0].style.transform = "none";
                    spans[1].style.opacity = "1";
                    spans[2].style.transform = "none";
                }
            }
        });
    }

    // Navigasi aktif berdasarkan klik
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navLinks.forEach(l => l.classList.remove("active-link"));
            link.classList.add("active-link");
            
            // Tutup menu mobile jika link diklik
            if (navMenu && !navMenu.classList.contains("hidden")) {
                navMenu.classList.add("hidden");
                navMenu.classList.remove("flex", "flex-col", "fixed", "left-0", "top-[72px]", "w-full", "h-[calc(100vh-72px)]", "bg-white", "p-8", "shadow-lg", "gap-8");
                if (menuToggle) {
                    menuToggle.classList.remove("active");
                    const spans = menuToggle.querySelectorAll("span");
                    if (spans.length === 3) {
                        spans[0].style.transform = "none";
                        spans[1].style.opacity = "1";
                        spans[2].style.transform = "none";
                    }
                }
            }
        });
    });
}

/* ==========================================================================
   2. LOGIKA MODAL (Hubungi Kami & Pendaftaran)
   ========================================================================== */
function initModals() {
    const btnHubungi = document.getElementById("btn-hubungi-kami");
    const contactModal = document.getElementById("contact-modal");
    const closeContact = document.getElementById("modal-close-btn");
    const contactForm = document.getElementById("contact-form");

    const btnDaftarTop = document.getElementById("btn-login");
    const btnDaftarTopReal = document.getElementById("btn-register-top");
    const btnDaftarHero = document.getElementById("btn-register-hero");
    const registerModal = document.getElementById("register-modal");
    const closeRegister = document.getElementById("modal-close-reg-btn");
    const registerForm = document.getElementById("register-form");

    const contactModalContent = document.getElementById("contact-modal-content");
    const registerModalContent = document.getElementById("register-modal-content");

    const openModal = (modal, content) => {
        if (modal) {
            modal.classList.remove("opacity-0", "pointer-events-none");
            modal.classList.add("opacity-100", "pointer-events-auto");
        }
        if (content) {
            content.classList.remove("scale-90");
            content.classList.add("scale-100");
        }
        document.body.style.overflow = "hidden";
    };

    const closeModal = (modal, content) => {
        if (modal) {
            modal.classList.add("opacity-0", "pointer-events-none");
            modal.classList.remove("opacity-100", "pointer-events-auto");
        }
        if (content) {
            content.classList.add("scale-90");
            content.classList.remove("scale-100");
        }
        document.body.style.overflow = "";
    };

    if (btnHubungi && contactModal) {
        btnHubungi.addEventListener("click", () => openModal(contactModal, contactModalContent));
    }
    if (closeContact && contactModal) {
        closeContact.addEventListener("click", () => closeModal(contactModal, contactModalContent));
    }

    // Tombol daftar sekarang mengarah langsung ke daftar.html via tag <a> (tidak di-intercept JS)

    if (btnDaftarTop) {
        btnDaftarTop.addEventListener("click", (e) => {
            e.preventDefault();
            alert("Sistem Autentikasi (Login) terintegrasi dapat dibangun oleh Tim Backend. Untuk demo ini, silakan klik tombol 'Daftar' untuk menguji pendaftaran magang.");
        });
    }

    if (closeRegister && registerModal) {
        closeRegister.addEventListener("click", () => closeModal(registerModal, registerModalContent));
    }

    [contactModal, registerModal].forEach(modal => {
        if (modal) {
            modal.addEventListener("click", (e) => {
                if (e.target === modal) {
                    closeModal(contactModal, contactModalContent);
                    closeModal(registerModal, registerModalContent);
                }
            });
        }
    });

    if (contactForm) {
        contactForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const submitBtn = document.getElementById("form-submit-btn");
            const statusMsg = document.getElementById("form-status-msg");
            
            const originalText = submitBtn.textContent;
            submitBtn.textContent = "Mengirim...";
            submitBtn.disabled = true;
            statusMsg.className = "text-sm font-semibold mb-4 px-4 py-3 rounded-lg hidden";
            statusMsg.textContent = "";

            const formData = {
                nama: document.getElementById("form-name").value,
                email: document.getElementById("form-email").value,
                pesan: document.getElementById("form-message").value
            };

            const result = await API.submitHubungiKami(formData);

            submitBtn.textContent = originalText;
            submitBtn.disabled = false;

            if (result.success) {
                statusMsg.classList.remove("hidden");
                statusMsg.classList.add("block", "bg-green-50", "text-green-700", "border", "border-green-200");
                statusMsg.textContent = result.message;
                contactForm.reset();
                setTimeout(() => closeModal(contactModal, contactModalContent), 2500);
            } else {
                statusMsg.classList.remove("hidden");
                statusMsg.classList.add("block", "bg-red-50", "text-red-700", "border", "border-red-200");
                statusMsg.textContent = "Error: " + result.error;
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const submitBtn = document.getElementById("reg-submit-btn");
            const statusMsg = document.getElementById("reg-status-msg");

            const originalText = submitBtn.textContent;
            submitBtn.textContent = "Mengirim Pengajuan...";
            submitBtn.disabled = true;
            statusMsg.className = "text-sm font-semibold mb-4 px-4 py-3 rounded-lg hidden";
            statusMsg.textContent = "";

            const formData = {
                nama: document.getElementById("reg-name").value,
                institusi: document.getElementById("reg-inst").value,
                bidang_id: document.getElementById("reg-bidang").value,
                cv_url: document.getElementById("reg-cv").value
            };

            await new Promise(resolve => setTimeout(resolve, 1000)); 

            submitBtn.textContent = originalText;
            submitBtn.disabled = false;

            statusMsg.classList.remove("hidden");
            statusMsg.classList.add("block", "bg-green-50", "text-green-700", "border", "border-green-200");
            statusMsg.textContent = "Pengajuan magang berhasil dikirim! Tim Diskominfo akan memverifikasi berkas Anda.";
            registerForm.reset();
            setTimeout(() => closeModal(registerModal, registerModalContent), 2500);
        });
    }
}

/* ==========================================================================
   3. RENDERING DINAMIS: BIDANG MAGANG (Dari API Layer)
   ========================================================================== */
async function loadBidangMagang() {
    const container = document.getElementById("bidang-container");
    const selectBidang = document.getElementById("reg-bidang");
    
    if (!container) return;

    const response = await API.getBidang();

    if (!response.success) {
        container.innerHTML = `<div class="text-center text-blue-600 col-span-full py-10">
            <p class="font-bold text-lg">Gagal memuat data bidang magang. Pastikan backend Anda berjalan.</p>
            <p class="text-sm text-slate-500 mt-2">Error: ${response.error}</p>
        </div>`;
        return;
    }

    const data = response.data;
    container.innerHTML = ""; // Bersihkan loading

    if (selectBidang) {
        selectBidang.innerHTML = '<option value="" disabled selected>Pilih bidang magang...</option>';
    }

    data.forEach(item => {
        const isAvailable = item.status.toLowerCase() === "tersedia";
        const badgeColor = isAvailable ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";
        
        const card = document.createElement("div");
        card.className = "bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 border border-slate-100 flex flex-col justify-between relative overflow-hidden group";
        card.innerHTML = `
            <div class="absolute left-0 top-0 w-1.5 h-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
            <div>
                <div class="flex justify-between items-start gap-4 mb-4">
                    <h3 class="font-sans font-bold text-lg text-slate-900 leading-snug">${item.nama}</h3>
                    <span class="px-3.5 py-1 text-[10px] font-bold rounded-full ${badgeColor} uppercase tracking-wider">${item.status}</span>
                </div>
                <p class="text-sm text-slate-500 leading-relaxed mb-6">${item.deskripsi}</p>
            </div>
            <div class="flex justify-between items-center border-t border-slate-100 pt-5 text-sm text-slate-500">
                <div class="flex items-center gap-2 font-semibold text-slate-600">
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" class="text-blue-600">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                    <span>Kuota: ${item.kuota} Orang</span>
                </div>
                <div class="font-medium text-slate-500">
                    Tersedia: <span class="font-bold text-slate-900">${item.tersedia}</span>
                </div>
            </div>
        `;

        container.appendChild(card);

        if (selectBidang && isAvailable) {
            const option = document.createElement("option");
            option.value = item.id;
            option.textContent = item.nama;
            selectBidang.appendChild(option);
        }
    });

    const btnLihatSemua = document.getElementById("btn-lihat-semua");
    if (btnLihatSemua) {
        btnLihatSemua.addEventListener("click", () => {
            alert("Menampilkan semua data bidang magang. Saat ini seluruh bidang (" + data.length + ") sudah ditampilkan.");
        });
    }
}

/* ==========================================================================
   4. RENDERING DINAMIS: FAQ ACCORDION (Dari API Layer)
   ========================================================================== */
async function loadFaqs() {
    const container = document.getElementById("faq-container");
    if (!container) return;

    const response = await API.getFaqs();

    if (!response.success) {
        container.innerHTML = `<p class="text-slate-550 py-5">Gagal memuat pertanyaan FAQ.</p>`;
        return;
    }

    const data = response.data;
    container.innerHTML = "";

    data.forEach((item, index) => {
        const accordionItem = document.createElement("div");
        accordionItem.className = `accordion-item bg-slate-50 rounded-xl border border-slate-100 overflow-hidden transition-all duration-300 ${index === 0 ? 'active' : ''}`;
        
        accordionItem.innerHTML = `
            <button class="w-full text-left bg-transparent border-none outline-none py-6 px-8 flex justify-between items-center gap-5 cursor-pointer accordion-header" aria-expanded="${index === 0 ? 'true' : 'false'}">
                <span class="font-sans font-bold text-base text-slate-900">${item.pertanyaan}</span>
                <span class="text-lg font-light text-slate-900 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-sm transition-transform duration-300 accordion-icon">+</span>
            </button>
            <div class="max-h-0 overflow-hidden transition-all duration-300 px-8 accordion-content">
                <div class="text-sm text-slate-500 leading-relaxed pb-6 accordion-answer">
                    ${item.jawaban}
                </div>
            </div>
        `;

        container.appendChild(accordionItem);

        const header = accordionItem.querySelector(".accordion-header");
        header.addEventListener("click", () => {
            const isActive = accordionItem.classList.contains("active");
            
            document.querySelectorAll(".accordion-item").forEach(el => {
                el.classList.remove("active");
                el.querySelector(".accordion-header").setAttribute("aria-expanded", "false");
            });

            if (!isActive) {
                accordionItem.classList.add("active");
                header.setAttribute("aria-expanded", "true");
            }
        });
    });
}
