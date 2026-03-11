// Countdown Timer
let minutes = 15; let seconds = 0;
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
setInterval(() => {
    if(seconds===0){ if(minutes===0) minutes=15; else minutes--; seconds=59; } else seconds--;
    minutesEl.textContent = minutes < 10 ? '0'+minutes : minutes;
    secondsEl.textContent = seconds < 10 ? '0'+seconds : seconds;
}, 1000);

// Sticky CTA Observer
const stickyCta = document.getElementById('stickyCta');
const pricingSection = document.getElementById('pricing');
const stickyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) stickyCta.classList.add('hidden-sticky');
        else if (entry.boundingClientRect.top > 0) stickyCta.classList.remove('hidden-sticky');
        else stickyCta.classList.add('hidden-sticky');
    });
}, { threshold: 0.2 });
stickyObserver.observe(pricingSection);

// Sales Notification
const buyers = [
    { name: 'Eka Gustiawan', initials: 'EG', time: '5 menit lalu' }, 
    { name: 'Andi Saputra', initials: 'AS', time: '2 menit lalu' }, 
    { name: 'Budi Wibowo', initials: 'BW', time: 'Baru saja' },
    { name: 'Rina Permata', initials: 'RP', time: '3 menit lalu' },
    { name: 'Deni Kurniawan', initials: 'DK', time: '1 menit lalu' },
    { name: 'Sarah Amelia', initials: 'SA', time: '7 menit lalu' },
    { name: 'Fajar Rahman', initials: 'FR', time: '10 menit lalu' }
];
function showNotif() {
    const b = buyers[Math.floor(Math.random() * buyers.length)];
    document.getElementById('notifName').textContent = b.name;
    document.getElementById('notifAvatar').textContent = b.initials;
    document.getElementById('notifTime').textContent = b.time;
    document.getElementById('salesNotification').classList.add('show');
    setTimeout(() => document.getElementById('salesNotification').classList.remove('show'), 4000);
}
setTimeout(showNotif, 5000);
setInterval(showNotif, 15000);

// Timeline Observer
const steps = document.querySelectorAll('.timeline-step');
const stepObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('active'); });
}, { threshold: 0.3 });
steps.forEach(step => { stepObserver.observe(step); });

// Helpers
function toggleFaq(btn) {
    const content = btn.nextElementSibling;
    const icon = btn.querySelector('svg');
    content.classList.toggle('hidden');
    icon.classList.toggle('rotate-180');
}

// Updated Total Calculation
function updateTotal() { 
    const isChecked = document.getElementById('upsell').checked; 
    const basePrice = 179000;
    const upsellPrice = 29000;
    const total = isChecked ? basePrice + upsellPrice : basePrice; 
    
    // Update Price Text
    document.getElementById('totalPrice').textContent = 'Rp ' + total.toLocaleString('id-ID'); 
    
    // Toggle Item Display in Summary
    const upsellItem = document.getElementById('upsellItemDisplay');
    if(isChecked) {
        upsellItem.classList.remove('hidden');
        upsellItem.classList.add('flex');
    } else {
        upsellItem.classList.add('hidden');
        upsellItem.classList.remove('flex');
    }
}

// TESTIMONIAL SLIDER (SIMPLE & STABLE)
const scroller = document.getElementById('testimonialScroller');
const cards = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.testi-dot');
const btnNext = document.getElementById('btnNext');
const btnPrev = document.getElementById('btnPrev');

let currentIndex = 0;
const totalCards = cards.length;

// 1. Observer untuk mendeteksi slide mana yang aktif (di tengah)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Tambah class 'is-active' kalau keliatan
            entry.target.classList.add('is-active');
            
            // Update Dot indicator
            const index = Array.from(cards).indexOf(entry.target);
            if (index !== -1) {
                currentIndex = index; // Update index global
                updateDots(index);
            }
        } else {
            entry.target.classList.remove('is-active');
        }
    });
}, {
    root: scroller,
    threshold: 0.6 // Trigger pas 60% item keliatan
});

// Pasang observer ke semua card
cards.forEach(card => observer.observe(card));

// 2. Fungsi Update Dots
function updateDots(activeIndex) {
    dots.forEach((dot, i) => {
        // Reset
        dot.classList.remove('bg-pink-500', 'bg-cyan-400', 'bg-yellow-400', 'w-4');
        dot.classList.add('bg-ocean-600');
        
        if (i === activeIndex) {
            dot.classList.remove('bg-ocean-600');
            dot.classList.add('w-4'); // Besarin
            const colors = ['bg-pink-500', 'bg-cyan-400', 'bg-yellow-400'];
            dot.classList.add(colors[i % 3]);
        }
    });
}

// 3. Fungsi Navigasi (Rewind)
function scrollToTesti(index) {
    cards[index].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
    });
}

// Next Button
if (btnNext) {
    btnNext.addEventListener('click', () => {
        currentIndex++;
        if (currentIndex >= totalCards) currentIndex = 0; // Rewind ke awal
        scrollToTesti(currentIndex);
    });
}

// Prev Button
if (btnPrev) {
    btnPrev.addEventListener('click', () => {
        currentIndex--;
        if (currentIndex < 0) currentIndex = totalCards - 1; // Rewind ke akhir
        scrollToTesti(currentIndex);
    });
}

// Auto Slide (Hanya jalan kalau user ga hover)
let autoSlide = setInterval(() => {
    currentIndex++;
    if (currentIndex >= totalCards) currentIndex = 0;
    scrollToTesti(currentIndex);
}, 5000);

// Pause auto slide kalau user hover
if(scroller) {
    scroller.addEventListener('mouseenter', () => clearInterval(autoSlide));
    scroller.addEventListener('touchstart', () => clearInterval(autoSlide));
}

// Reveal Animation
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if(entry.isIntersecting) entry.target.classList.add('active'); });
}, { threshold: 0.1 });
reveals.forEach(r => { revealObserver.observe(r); });
// Modal Functions
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
        modal.classList.add('hidden');
        modal.classList.remove('hiding');
        iframe.src = "";
        document.body.style.overflow = 'auto';
    }, 300);
}

// Close modal kalo klik di luar area
document.getElementById('previewModal')?.addEventListener('click', function(e) {
    if (e.target === this) closeModal();
});