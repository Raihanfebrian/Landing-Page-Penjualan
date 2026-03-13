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
        if (!entry.isIntersecting && entry.boundingClientRect.bottom < 0) {
            showSticky();
        }
    });
}, { threshold: 0 }); 
agitateObserver.observe(agitateSection);

const pricingObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            hideSticky();
        }
    });
}, { threshold: 0.1 });
pricingObserver.observe(pricingSection);

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

// TESTIMONIAL SLIDER
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
            if (index !== -1) {
                currentIndex = index;
                updateDots(index);
            }
        } else {
            entry.target.classList.remove('is-active');
        }
    });
}, {
    root: scroller,
    threshold: 0.6
});

cards.forEach(card => observer.observe(card));

function updateDots(activeIndex) {
    dots.forEach((dot, i) => {
        dot.classList.remove('bg-pink-500', 'bg-cyan-400', 'bg-yellow-400', 'w-4');
        dot.classList.add('bg-ocean-600');
        if (i === activeIndex) {
            dot.classList.remove('bg-ocean-600');
            dot.classList.add('w-4');
            const colors = ['bg-pink-500', 'bg-cyan-400', 'bg-yellow-400'];
            dot.classList.add(colors[i % 3]);
        }
    });
}

function scrollToTesti(index) {
    const card = cards[index];
    if (!card) return;
    const scrollLeftPos = card.offsetLeft - (scroller.offsetWidth / 2) + (card.offsetWidth / 2);
    scroller.scrollTo({
        left: scrollLeftPos,
        behavior: 'smooth'
    });
}

if (btnNext) {
    btnNext.addEventListener('click', () => {
        currentIndex++;
        if (currentIndex >= totalCards) currentIndex = 0;
        scrollToTesti(currentIndex);
    });
}

if (btnPrev) {
    btnPrev.addEventListener('click', () => {
        currentIndex--;
        if (currentIndex < 0) currentIndex = totalCards - 1;
        scrollToTesti(currentIndex);
    });
}

let autoSlideInterval;

function startAutoSlide() {
    stopAutoSlide();
    autoSlideInterval = setInterval(() => {
        currentIndex++;
        if (currentIndex >= totalCards) currentIndex = 0;
        scrollToTesti(currentIndex);
    }, 5000);
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startAutoSlide();
        } else {
            stopAutoSlide();
        }
    });
}, { threshold: 0.2 });

const testimonialSection = document.querySelector('#testimonialScroller')?.closest('section');
if (testimonialSection) {
    sectionObserver.observe(testimonialSection);
}

window.addEventListener('load', () => {
    const card = cards[0];
    if (card) {
        const scrollLeftPos = card.offsetLeft - (scroller.offsetWidth / 2) + (card.offsetWidth / 2);
        scroller.scrollLeft = scrollLeftPos;
    }
});

const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if(entry.isIntersecting) entry.target.classList.add('active'); });
}, { threshold: 0.1 });
reveals.forEach(r => { revealObserver.observe(r); });

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

document.getElementById('previewModal')?.addEventListener('click', function(e) {
    if (e.target === this) closeModal();
});

// LIVE VIEWERS COUNTER (RANDOM JUMPS)
const liveViewersCount = document.getElementById('liveViewersCount');
let currentViewers = 12;

setInterval(() => {
    const jumpSize = Math.floor(Math.random() * 4) + 1;
    const direction = Math.random() > 0.5 ? 1 : -1;
    const change = jumpSize * direction;
    currentViewers += change;
    if (currentViewers < 6) currentViewers = 6;
    if (currentViewers > 19) currentViewers = 19;
    liveViewersCount.textContent = `${currentViewers} Orang sedang melihat penawaran ini`;
}, 4000);