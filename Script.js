/* ═══════════════════════════════════════════════
   NEXORIS — script.js
   ═══════════════════════════════════════════════ */

/* ─── Navbar: sombra al hacer scroll ─────────── */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

/* ─── Menú hamburguesa ───────────────────────── */
const burger = document.getElementById('burger');
const nav    = document.getElementById('nav');

burger.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  burger.classList.toggle('open', isOpen);
  burger.setAttribute('aria-expanded', isOpen);
});

// Cerrar menú al hacer clic en un enlace (mobile)
nav.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', false);
  });
});

// Cerrar menú al hacer clic fuera
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target)) {
    nav.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', false);
  }
});

/* ─── Scroll reveal ──────────────────────────── */
const revealEls = document.querySelectorAll(
  '.section__grid, .pillars, .info-cards, .contact__grid, .contact__header'
);

revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // solo una vez
      }
    });
  },
  { threshold: 0.12 }
);

revealEls.forEach(el => observer.observe(el));

/* ─── Nav link activo según sección ─────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.style.color = '';
          link.style.background = '';
        });
        const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (active && !active.classList.contains('nav-link--cta')) {
          active.style.color = '#ffffff';
          active.style.background = 'rgba(255,255,255,0.1)';
        }
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);

sections.forEach(s => sectionObserver.observe(s));
