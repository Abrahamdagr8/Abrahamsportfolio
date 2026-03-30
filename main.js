// ── SCROLL RESTORATION ──
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}
window.onload = function() {
    window.scrollTo(0, 0);
};

// ── SCROLL REVEAL ──
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            // stagger children if multiple reveal in same section
            setTimeout(() => {
                entry.target.classList.add('active');
            }, i * 60);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

revealEls.forEach(el => observer.observe(el));

// ── HEADER SCROLL EFFECT ──
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        header.style.padding = '0.875rem 0';
        header.style.background = 'rgba(10, 14, 26, 0.97)';
    } else {
        header.style.padding = '1.25rem 0';
        header.style.background = 'rgba(10, 14, 26, 0.85)';
    }
});

// ── MOBILE MENU ──
const mobileBtn = document.getElementById('mobileMenuBtn');
const navEl = document.querySelector('nav');
const navCta = document.querySelector('.nav-cta');

if (mobileBtn) {
    mobileBtn.addEventListener('click', () => {
        const isOpen = navEl.style.display === 'flex';
        navEl.style.display = isOpen ? 'none' : 'flex';
        navEl.style.flexDirection = 'column';
        navEl.style.position = 'absolute';
        navEl.style.top = '100%';
        navEl.style.left = '0';
        navEl.style.right = '0';
        navEl.style.background = 'rgba(10,14,26,0.98)';
        navEl.style.padding = '1.5rem 2rem';
        navEl.style.borderBottom = '1px solid rgba(255,255,255,0.08)';
        if (isOpen) navEl.style.display = 'none';
    });

    // close menu when a nav link is clicked (only on mobile)
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 992) {
                navEl.style.display = 'none';
            }
        });
    });
}

// ── ACTIVE NAV LINK ON SCROLL ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav ul a');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.style.color = '';
                if (link.getAttribute('href') === `#${entry.target.id}`) {
                    link.style.color = 'var(--primary)';
                }
            });
        }
    });
}, { threshold: 0.5 });

sections.forEach(s => sectionObserver.observe(s));
