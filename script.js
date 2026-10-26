// ===== MOBILE NAVIGATION =====
document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.getElementById('hamburger') || document.querySelector('.hamburger');
  const nav = document.getElementById('main-nav') || document.querySelector('nav');
  const navLinks = document.querySelectorAll('nav a');
  const body = document.body;

  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      nav.classList.toggle('active');
      body.classList.toggle('menu-open');
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (nav.classList.contains('active') && !nav.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
        body.classList.remove('menu-open');
      }
    });

    // Close when clicking link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
        body.classList.remove('menu-open');
      });
    });
  }

  // Active section indicator on scroll
  const sections = document.querySelectorAll('section[id]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(a => a.classList.remove('active'));
        const active = document.querySelector(`nav a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -40% 0px', threshold: 0 });
  sections.forEach(s => observer.observe(s));
});

// ===== FADE-IN ANIMATIONS =====
const fadeEls = document.querySelectorAll('.project, .about-grid, .links-grid, .contact-heading, .skill-item, .link-card');
fadeEls.forEach(el => el.classList.add('fade-in'));
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
fadeEls.forEach(el => fadeObserver.observe(el));

// ===== SKILL BARS animate on scroll =====
const skillFills = document.querySelectorAll('.skill-fill');
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.transition = 'width 1s cubic-bezier(.4,0,.2,1)';
      const pct = getComputedStyle(entry.target).getPropertyValue('--pct');
      entry.target.style.width = pct;
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
skillFills.forEach(f => {
  f.style.width = '0';
  barObserver.observe(f);
});
