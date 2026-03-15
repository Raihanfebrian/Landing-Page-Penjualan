// ==========================================
// 1. COUNTDOWN TIMER (REAL SCARCITY 20 MENIT)
// ==========================================
const timerKey = 'promo_end_time_v4';
const timerContainer = document.getElementById('timer-container');
const mainPriceDisplay = document.getElementById('main-price-display');
const normalPriceText = document.getElementById('normal-price-text');
const discountText = document.getElementById('discount-text');
const ctaBtn = document.getElementById('cta-btn');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

// ELEMEN BARU UNTUK SINKRON
const promoBadge = document.getElementById('promo-badge');
const bestDealBadge = document.getElementById('best-deal-badge');
const stickyPrice = document.getElementById('sticky-price');
const stickyDiscount = document.getElementById('sticky-discount');
const stickyBtn = document.getElementById('sticky-btn');

// SETTING LINK
const LINK_PROMO = 'https://raihan-struggle.myscalev.com/checkout-page'; 
const LINK_NORMAL = 'https://raihan-struggle.myscalev.com/checkout-page1'; 
// LINK WA DENGAN PESAN OTOMATIS
const MSG_WA = "Halo%20Admin%2C%20saya%20baru%20saja%20melihat%20penawaran%20Page%20Engine%20Pro%20dan%20waktunya%20habis.%20Apakah%20masih%20ada%20kesempatan%20untuk%20mendapatkan%20harga%20diskon%20Rp%20179.000%3F%20Terima%20kasih.";
const LINK_ADMIN = `https://wa.me/6285117075654?text=${MSG_WA}`;

let promoEndTime = localStorage.getItem(timerKey);

if (!promoEndTime) {
    promoEndTime = new Date().getTime() + (20 * 60 * 1000); 
    localStorage.setItem(timerKey, promoEndTime);
} else {
    promoEndTime = parseInt(promoEndTime);
}

function updateTimer() {
    const now = new Date().getTime();
    const distance = promoEndTime - now;

    if (distance < 0) {
        // ==========================================
        // KONDISI: WAKTU HABIS (VISUAL "PENYESELAN")
        // ==========================================
        
        // 1. Timer Box
        if (timerContainer) {
            timerContainer.innerHTML = `
                <div class="bg-ocean-800 border border-ocean-700 rounded-xl p-4 text-center">
                    <p class="text-coral-400 text-sm font-bold mb-2">⚠️ Waktu Promo Sudah Habis!</p>
                    <p class="text-ocean-200 text-xs">Harga kembali normal Rp 599.000.</p>
                </div>
            `;
        }

        // 2. Pricing Section
        // a. Sembunyiin tulisan coret lama
        if (normalPriceText) normalPriceText.style.display = 'none';
        
        // b. Harga 179rb jadi CORET & GELAP
        if (mainPriceDisplay) {
            mainPriceDisplay.classList.add('line-through', 'text-ocean-600', 'opacity-50');
            mainPriceDisplay.classList.remove('text-white');
        }

        // c. Munculin Harga Baru (599rb) & Animasi
        const expiredDisplay = document.getElementById('expired-price-display');
        if (expiredDisplay) {
            expiredDisplay.classList.remove('hidden');
        }

        // d. Ganti teks diskon
        if (discountText) {
             discountText.textContent = "Promo Telah Berakhir";
             discountText.classList.remove('text-green-400');
             discountText.classList.add('text-coral-400');
        }

        // e. Badge "10 Orang" -> Ganti Teks
        if (promoBadge) {
            promoBadge.innerHTML = `
                <span class="relative flex h-3 w-3">
                    <span class="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
                </span>
                <span class="text-yellow-300 text-xs md:text-sm font-bold">Hubungi Admin untuk cek ketersediaan promo terakhir!</span>
            `;
            promoBadge.classList.remove('bg-red-900/30', 'border-red-500/40', 'animate-pulse');
            promoBadge.classList.add('bg-yellow-900/30', 'border-yellow-500/40');
        }

        // f. Badge "BEST DEAL" -> "PROMO END"
        if (bestDealBadge) {
            bestDealBadge.textContent = "PROMO END";
            bestDealBadge.classList.remove('bg-coral-500');
            bestDealBadge.classList.add('bg-gray-600');
        }

        // g. Tombol CTA Utama -> Chat Admin
        if (ctaBtn) {
            ctaBtn.textContent = "MASIH PENGEN PROMONYA? CHAT ADMIN SEKARANG";
            ctaBtn.href = LINK_ADMIN;
            ctaBtn.classList.remove('animate-pulse-glow');
            ctaBtn.classList.add('bg-ocean-700');
        }

        // 3. Sticky CTA
        // a. Label Atas -> "Harga kembali normal" (hapus coret)
        const stickyLabel = document.getElementById('sticky-label');
        if (stickyLabel) {
            stickyLabel.textContent = "Harga kembali normal";
            stickyLabel.classList.remove('line-through', 'text-ocean-400');
            stickyLabel.classList.add('text-ocean-300', 'font-medium');
        }

        // b. Harga Sticky -> 599rb & hilangin hemat
        if (stickyPrice) {
            stickyPrice.innerHTML = "Rp 599.000";
            stickyPrice.classList.remove('text-white');
            stickyPrice.classList.add('text-coral-400');
        }

        // c. Tombol Sticky -> Chat Admin
        if (stickyBtn) {
            stickyBtn.textContent = "CHAT ADMIN";
            stickyBtn.href = LINK_ADMIN;
        }

        clearInterval(timerInterval);
        return;
    }

    // ==========================================
    // KONDISI: MASIH ADA WAKTU
    // ==========================================
    const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((distance % (1000 * 60)) / 1000);

    if(minutesEl) minutesEl.textContent = m < 10 ? '0' + m : m;
    if(secondsEl) secondsEl.textContent = s < 10 ? '0' + s : s;
    
    // Reset link jika perlu
    if (ctaBtn && ctaBtn.href !== LINK_PROMO) ctaBtn.href = LINK_PROMO;
    if (ctaBtn) ctaBtn.textContent = "AMBIL DISKON SEKARANG";
}

const timerInterval = setInterval(updateTimer, 1000);
updateTimer();

// ... (Sisa kode JS: Sticky Observer, Notif, Timeline, dll samain kaya sebelumnya) ...
// Jangan lupa pastikan bagian Sales Notification punya z-index: 999 di CSS


// ==========================================
// 2. STICKY CTA OBSERVER
// ==========================================
const stickyCta = document.getElementById('stickyCta');
const pricingSection = document.getElementById('pricing');
const agitateSection = document.getElementById('agitate-section');

function showSticky() {
    stickyCta.style.transform = "translateY(0)";
    stickyCta.style.opacity = "1";
    stickyCta.style.pointerEvents = "auto";
}

function hideSticky() {
    stickyCta.style.transform = "translateY(100%)";
    stickyCta.style.opacity = "0";
    stickyCta.style.pointerEvents = "none";
}

const agitateObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting && entry.boundingClientRect.bottom < 0) showSticky();
    });
}, { threshold: 0 }); 
if(agitateSection) agitateObserver.observe(agitateSection);

const pricingObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) hideSticky(); });
}, { threshold: 0.1 });
if(pricingSection) pricingObserver.observe(pricingSection);


// ==========================================
// 3. SALES NOTIFICATION (BUNDER BAWAH, DELAY 10 DETIK)
// ==========================================
// Sales Notification Library
const buyers = [
    { name: 'Eka Gustiawan', initials: 'EG', time: '5 menit lalu' }, 
    { name: 'Andi Saputra', initials: 'AS', time: '2 menit lalu' }, 
    { name: 'Budi Wibowo', initials: 'BW', time: 'Baru saja' },
    { name: 'Rina Permata', initials: 'RP', time: '3 menit lalu' },
    { name: 'Deni Kurniawan', initials: 'DK', time: '1 menit lalu' },
    { name: 'Sarah Amelia', initials: 'SA', time: '7 menit lalu' },
    { name: 'Fajar Rahman', initials: 'FR', time: '10 menit lalu' },
    // Tambahan 5 nama baru:
    { name: 'Dimas Pratama', initials: 'DP', time: 'Baru saja' },
    { name: 'Siti Nurhaliza', initials: 'SN', time: '4 menit lalu' },
    { name: 'Reza Aditya', initials: 'RA', time: '12 menit lalu' },
    { name: 'Nadia Putri', initials: 'NP', time: '6 menit lalu' },
    { name: 'Hendra Wijaya', initials: 'HW', time: '2 menit lalu' }
];
function showNotif() {
    const b = buyers[Math.floor(Math.random() * buyers.length)];
    document.getElementById('notifName').textContent = b.name;
    document.getElementById('notifAvatar').textContent = b.initials;
    document.getElementById('notifTime').textContent = b.time;
    document.getElementById('salesNotification').classList.add('show');
    setTimeout(() => document.getElementById('salesNotification').classList.remove('show'), 4000);
}
// DELAY JADI 10 DETIK (10000ms)
setTimeout(showNotif, 20000); 
setInterval(showNotif, 45000);


// ==========================================
// 4. TIMELINE OBSERVER
// ==========================================
const steps = document.querySelectorAll('.timeline-step');
const stepObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('active'); });
}, { threshold: 0.3 });
steps.forEach(step => { stepObserver.observe(step); });


// ==========================================
// 5. TOGGLE FAQ
// ==========================================
function toggleFaq(btn) {
    const content = btn.nextElementSibling;
    const icon = btn.querySelector('svg');
    content.classList.toggle('hidden');
    icon.classList.toggle('rotate-180');
}


// ==========================================
// 6. TESTIMONIAL SLIDER
// ==========================================
const scroller = document.getElementById('testimonialScroller');
const cards = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.testi-dot');
const btnNext = document.getElementById('btnNext');
const btnPrev = document.getElementById('btnPrev');
let currentIndex = 0;
const totalCards = cards.length;

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-active');
            const index = Array.from(cards).indexOf(entry.target);
            if (index !== -1) { currentIndex = index; updateDots(index); }
        } else { entry.target.classList.remove('is-active'); }
    });
}, { root: scroller, threshold: 0.6 });
cards.forEach(card => observer.observe(card));

function updateDots(activeIndex) {
    dots.forEach((dot, i) => {
        dot.classList.remove('bg-pink-500', 'bg-cyan-400', 'bg-yellow-400', 'w-4');
        dot.classList.add('bg-ocean-600');
        if (i === activeIndex) {
            dot.classList.remove('bg-ocean-600'); dot.classList.add('w-4');
            const colors = ['bg-pink-500', 'bg-cyan-400', 'bg-yellow-400'];
            dot.classList.add(colors[i % 3]);
        }
    });
}

function scrollToTesti(index) {
    const card = cards[index]; if (!card) return;
    const scrollLeftPos = card.offsetLeft - (scroller.offsetWidth / 2) + (card.offsetWidth / 2);
    scroller.scrollTo({ left: scrollLeftPos, behavior: 'smooth' });
}

if (btnNext) btnNext.addEventListener('click', () => { currentIndex++; if (currentIndex >= totalCards) currentIndex = 0; scrollToTesti(currentIndex); });
if (btnPrev) btnPrev.addEventListener('click', () => { currentIndex--; if (currentIndex < 0) currentIndex = totalCards - 1; scrollToTesti(currentIndex); });

let autoSlideInterval;
function startAutoSlide() { stopAutoSlide(); autoSlideInterval = setInterval(() => { currentIndex++; if (currentIndex >= totalCards) currentIndex = 0; scrollToTesti(currentIndex); }, 5000); }
function stopAutoSlide() { clearInterval(autoSlideInterval); }
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) startAutoSlide(); else stopAutoSlide(); });
}, { threshold: 0.2 });
const testimonialSection = document.querySelector('#testimonialScroller')?.closest('section');
if (testimonialSection) sectionObserver.observe(testimonialSection);

window.addEventListener('load', () => {
    const card = cards[0]; if (card) {
        const scrollLeftPos = card.offsetLeft - (scroller.offsetWidth / 2) + (card.offsetWidth / 2);
        scroller.scrollLeft = scrollLeftPos;
    }
});


// ==========================================
// 7. REVEAL ANIMATION
// ==========================================
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if(entry.isIntersecting) entry.target.classList.add('active'); });
}, { threshold: 0.1 });
reveals.forEach(r => { revealObserver.observe(r); });


// ==========================================
// 8. MODAL FUNCTIONS
// ==========================================
function openModal(url) {
    const modal = document.getElementById('previewModal');
    const iframe = document.getElementById('modalIframe');
    iframe.src = url;
    modal.classList.remove('hidden');
    modal.classList.add('showing');
    document.body.style.overflow = 'hidden'; 
}

function closeModal() {
    const modal = document.getElementById('previewModal');
    const iframe = document.getElementById('modalIframe');
    modal.classList.remove('showing');
    modal.classList.add('hiding');
    setTimeout(() => {
        modal.classList.add('hidden'); modal.classList.remove('hiding'); iframe.src = ""; document.body.style.overflow = 'auto';
    }, 300);
}
document.getElementById('previewModal')?.addEventListener('click', function(e) { if (e.target === this) closeModal(); });


// LIVE VIEWERS COUNTER (RANDOM JUMPS - LEBIH NATURAL)
const liveViewersCount = document.getElementById('liveViewersCount');
let currentViewers = 12;

setInterval(() => {
    // Loncatnya cuma 1 atau 2 orang aja biar realistis
    const jumpSize = Math.floor(Math.random() * 2) + 1; 
    const direction = Math.random() > 0.5 ? 1 : -1;
    const change = jumpSize * direction;
    currentViewers += change;
    
    // Batas bawah 8 orang, batas atas 24 orang
    if (currentViewers < 8) currentViewers = 8;
    if (currentViewers > 24) currentViewers = 24;
    
    liveViewersCount.textContent = `${currentViewers} Orang sedang melihat penawaran ini`;
}, 15000); // Berubah tiap 15 detik