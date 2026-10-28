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

// ===== PORTFOLIO IMAGE VIEWER =====
document.addEventListener('DOMContentLoaded', function () {
  const images = Array.from(document.querySelectorAll('.asset-image'));
  if (!images.length) return;

  const viewer = document.createElement('div');
  viewer.className = 'image-viewer';
  viewer.setAttribute('role', 'dialog');
  viewer.setAttribute('aria-modal', 'true');
  viewer.setAttribute('aria-label', 'Portfolio image viewer');
  viewer.innerHTML = `
    <div class="image-viewer-backdrop" data-viewer-close></div>
    <div class="image-viewer-panel">
      <div class="image-viewer-toolbar">
        <p class="image-viewer-counter" aria-live="polite"></p>
        <button class="image-viewer-close" type="button" aria-label="Close image viewer">
          <i class="fa-solid fa-xmark" aria-hidden="true"></i>
        </button>
      </div>
      <button class="image-viewer-control image-viewer-prev" type="button" aria-label="Previous image">
        <i class="fa-solid fa-arrow-left" aria-hidden="true"></i>
      </button>
      <figure class="image-viewer-figure">
        <img class="image-viewer-image" alt="" />
        <figcaption class="image-viewer-caption"></figcaption>
      </figure>
      <button class="image-viewer-control image-viewer-next" type="button" aria-label="Next image">
        <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
      </button>
    </div>
  `;
  document.body.appendChild(viewer);

  const viewerImage = viewer.querySelector('.image-viewer-image');
  const caption = viewer.querySelector('.image-viewer-caption');
  const counter = viewer.querySelector('.image-viewer-counter');
  const closeButton = viewer.querySelector('.image-viewer-close');
  const previousButton = viewer.querySelector('.image-viewer-prev');
  const nextButton = viewer.querySelector('.image-viewer-next');
  let currentIndex = 0;
  let lastFocusedElement = null;

  images.forEach((image, index) => {
    image.setAttribute('tabindex', '0');
    image.setAttribute('role', 'button');
    image.setAttribute('aria-label', `View larger image: ${image.alt}`);
    image.addEventListener('click', () => openViewer(index));
    image.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openViewer(index);
      }
    });
  });

  function getCaption(image) {
    const figureCaption = image.closest('figure')?.querySelector('figcaption')?.textContent.trim();
    return figureCaption || image.alt;
  }

  function renderImage() {
    const image = images[currentIndex];
    viewerImage.src = image.currentSrc || image.src;
    viewerImage.alt = image.alt;
    caption.textContent = getCaption(image);
    counter.textContent = `${String(currentIndex + 1).padStart(2, '0')} / ${String(images.length).padStart(2, '0')}`;
    previousButton.disabled = images.length < 2;
    nextButton.disabled = images.length < 2;
  }

  function openViewer(index) {
    currentIndex = index;
    lastFocusedElement = document.activeElement;
    renderImage();
    viewer.classList.add('is-open');
    document.body.classList.add('viewer-open');
    closeButton.focus();
  }

  function closeViewer() {
    viewer.classList.remove('is-open');
    document.body.classList.remove('viewer-open');
    viewerImage.removeAttribute('src');
    if (lastFocusedElement instanceof HTMLElement) lastFocusedElement.focus();
  }

  function moveViewer(direction) {
    currentIndex = (currentIndex + direction + images.length) % images.length;
    renderImage();
  }

  closeButton.addEventListener('click', closeViewer);
  previousButton.addEventListener('click', () => moveViewer(-1));
  nextButton.addEventListener('click', () => moveViewer(1));
  viewer.addEventListener('click', (event) => {
    if (event.target.matches('[data-viewer-close]')) closeViewer();
  });
  document.addEventListener('keydown', (event) => {
    if (!viewer.classList.contains('is-open')) return;
    if (event.key === 'Escape') closeViewer();
    if (event.key === 'ArrowLeft') moveViewer(-1);
    if (event.key === 'ArrowRight') moveViewer(1);
  });
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
