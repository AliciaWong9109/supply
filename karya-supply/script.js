(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mobileMenu = document.querySelector('.mobile-menu');
  const menuToggle = document.querySelector('.menu-toggle');
  const form = document.querySelector('#enquiryForm');
  const formNote = document.querySelector('#formNote');

  function closeMenu() {
    document.body.classList.remove('menu-open');
    mobileMenu.classList.remove('is-open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    menuToggle.setAttribute('aria-expanded', 'false');
  }

  menuToggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('is-open');
    document.body.classList.toggle('menu-open', isOpen);
    mobileMenu.setAttribute('aria-hidden', String(!isOpen));
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });
  mobileMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = form.elements.name.value.trim();
    formNote.textContent = `Thanks${name ? `, ${name}` : ''} — your demo enquiry is ready to connect to the Karya trade desk.`;
    formNote.style.color = '#fffaf0';
    form.reset();
  });

  if (!window.gsap || !window.ScrollTrigger || reduceMotion) return;

  gsap.registerPlugin(ScrollTrigger);

  const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
  intro.from('.hero-eyebrow', { y: 18, opacity: 0, duration: .55 })
    .from('.hero-title', { y: 34, opacity: 0, duration: .8 }, '-=.28')
    .from('.hero-lede, .hero-actions, .hero-footnote', { y: 18, opacity: 0, duration: .55, stagger: .08 }, '-=.36')
    .from('.hero-media', { clipPath: 'inset(0 0 100% 0)', duration: 1.05, ease: 'power4.inOut' }, '-=.82')
    .from('.hero-stamp', { scale: .75, rotation: -8, opacity: 0, duration: .45 }, '-=.38');

  gsap.utils.toArray('.reveal-card').forEach((card, index) => {
    gsap.from(card, {
      y: 34,
      opacity: 0,
      duration: .65,
      delay: (index % 3) * .06,
      ease: 'power2.out',
      scrollTrigger: { trigger: card, start: 'top 85%', once: true },
    });
  });

  gsap.from('.section-heading, .brand-strip', { y: 24, opacity: 0, duration: .65, stagger: .12, ease: 'power2.out', scrollTrigger: { trigger: '.departments', start: 'top 78%', once: true } });

  gsap.from('.reveal-image', { clipPath: 'inset(0 100% 0 0)', duration: 1, ease: 'power3.inOut', scrollTrigger: { trigger: '.split-story', start: 'top 70%', once: true } });
  gsap.from('.story-copy > *', { y: 24, opacity: 0, duration: .6, stagger: .09, ease: 'power2.out', scrollTrigger: { trigger: '.story-copy', start: 'top 76%', once: true } });

  document.querySelectorAll('[data-count]').forEach((element) => {
    const target = Number(element.dataset.count);
    const suffix = element.dataset.suffix || '';
    const counter = { value: 0 };
    gsap.to(counter, {
      value: target,
      duration: 1.2,
      ease: 'power2.out',
      scrollTrigger: { trigger: element, start: 'top 86%', once: true },
      onUpdate: () => { element.textContent = `${Math.round(counter.value)}${suffix}`; },
    });
  });

  gsap.from('.contact-panel', { y: 35, opacity: 0, duration: .8, ease: 'power2.out', scrollTrigger: { trigger: '.contact', start: 'top 82%', once: true } });
})();
