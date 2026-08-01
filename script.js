const worksImages = [
  'bran1.jpg',
  'Genius Mambwe - Graphic Designer Portfolio 20266_page-0006.jpg',
  'Genius Mambwe - Graphic Designer Portfolio 20266_page-0007.jpg',
  'Genius Mambwe - Graphic Designer Portfolio 20266_page-0018.jpg',
  'Genius Mambwe - Graphic Designer Portfolio 20266_page-0028.jpg',
  'Genius Mambwe - Graphic Designer Portfolio 20266_page-0038.jpg',
  'Genius Mambwe - Graphic Designer Portfolio 20266_page-0040.jpg',
  'Genius Mambwe - Graphic Designer Portfolio 20266_page-0041.jpg',
  'Genius Mambwe - Graphic Designer Portfolio 20266_page-0043.jpg'
];

const galleryLabels = [
  'Featured concept',
  'Editorial highlight',
  'Campaign piece',
  'Brand frame',
  'Design reveal',
  'Visual mood',
  'Storyboard moment',
  'Poster direction',
  'Final flourish'
];

const categorySets = {
  branding: [
    'Works/bran1.jpg',
    'Works/Genius Mambwe - Graphic Designer Portfolio 20266_page-0006.jpg',
    'Works/Genius Mambwe - Graphic Designer Portfolio 20266_page-0007.jpg'
  ],
  'digital-marketing': [
    'Works/Genius Mambwe - Graphic Designer Portfolio 20266_page-0018.jpg',
    'Works/Genius Mambwe - Graphic Designer Portfolio 20266_page-0028.jpg',
    'Works/Genius Mambwe - Graphic Designer Portfolio 20266_page-0038.jpg'
  ],
  'posters-printing': [
    'Works/Genius Mambwe - Graphic Designer Portfolio 20266_page-0040.jpg',
    'Works/Genius Mambwe - Graphic Designer Portfolio 20266_page-0041.jpg',
    'Works/Genius Mambwe - Graphic Designer Portfolio 20266_page-0043.jpg'
  ]
};

function createWorkCard(src, index) {
  const article = document.createElement('article');
  article.className = 'work-tile reveal magic-card';
  article.innerHTML = `
    <div class="tile-mock">
      <img src="Works/${src}" alt="Portfolio artwork preview" />
    </div>
    <div class="tile-copy">
      <span>${galleryLabels[index % galleryLabels.length]}</span>
      <h3>${galleryLabels[(index + 1) % galleryLabels.length]}</h3>
    </div>
  `;
  return article;
}

function renderWorkGallery() {
  const gallery = document.querySelector('#work-grid');
  if (!gallery) return;

  worksImages.forEach((src, index) => {
    gallery.appendChild(createWorkCard(src, index));
  });
}

function startCategoryRotation() {
  document.querySelectorAll('.category-card').forEach((card) => {
    const type = card.dataset.category;
    const img = card.querySelector('img');
    const images = categorySets[type] || [];
    let index = 0;

    if (!images.length || !img) return;

    setInterval(() => {
      index = (index + 1) % images.length;
      img.src = images[index];
    }, 2800);
  });
}

function initRevealAnimations() {
  const revealItems = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }
}

function initMobileNav() {
  const toggle = document.querySelector('.mobile-menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');

  if (!toggle || !mobileNav) return;

  const setMenuState = (isOpen) => {
    mobileNav.classList.toggle('is-open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  };

  const closeMenu = () => setMenuState(false);
  const toggleMenu = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const isOpen = !mobileNav.classList.contains('is-open');
    setMenuState(isOpen);
  };

  toggle.addEventListener('click', toggleMenu);
  toggle.addEventListener('touchend', toggleMenu);

  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', (event) => {
    if (!mobileNav.contains(event.target) && !toggle.contains(event.target)) {
      closeMenu();
    }
  });
}

function initializeSite() {
  renderWorkGallery();
  startCategoryRotation();
  initRevealAnimations();
  initMobileNav();

  window.setTimeout(() => {
    document.body.classList.add('site-loaded');
  }, 2200);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeSite);
} else {
  initializeSite();
}
