 
const navToggle = document.getElementById('navToggle');
const nav = document.querySelector('.nav');

navToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});


document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

const roles = [
  'full-stack developer',
  'Wildlife Photographer',
  'Web Developer',
  'problem solver'
];

const typedEl = document.getElementById('typedRole');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeLoop() {
  const current = roles[roleIndex];

  if (!isDeleting) {
    charIndex++;
    typedEl.textContent = current.slice(0, charIndex);
    if (charIndex === current.length) {
      isDeleting = true;
      setTimeout(typeLoop, 1800);
      return;
    }
    setTimeout(typeLoop, 65);
  } else {
    charIndex--;
    typedEl.textContent = current.slice(0, charIndex);
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeLoop, 300);
      return;
    }
    setTimeout(typeLoop, 35);
  }
}

if (typedEl) {
  if (prefersReducedMotion) {
    typedEl.textContent = roles[0];
  } else {
    typeLoop();
  }
}

const revealTargets = document.querySelectorAll(
  '.about-grid, .skills-grid, .project-card, .timeline-item, .contact-grid'
);

revealTargets.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealTargets.forEach(el => observer.observe(el));

document.querySelectorAll('.project-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 80}ms`;
});


function handlePhotoFallback(imgId) {
  const img = document.getElementById(imgId);
  if (!img) return;
  img.addEventListener('error', () => {
    img.style.display = 'none';
    img.parentElement.classList.add('photo-placeholder');
  });
}

handlePhotoFallback('heroPhoto');
handlePhotoFallback('aboutPhoto');


function handleCvDownload(linkId) {
  const link = document.getElementById(linkId);
  if (!link) return;

  link.addEventListener('click', async (e) => {
    try {
      const res = await fetch(link.getAttribute('href'), { method: 'HEAD' });
      if (!res.ok) throw new Error('not found');
    } catch {
      e.preventDefault();
      alert('Your CV file isn\'t added yet. Save your PDF as "cv.pdf" inside the assets/ folder to enable this download.');
    }
  });
}

handleCvDownload('downloadCvHero');
handleCvDownload('downloadCvAbout');


const form = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = form.name.value.trim();
  if (!form.checkValidity()) {
    formStatus.textContent = 'Please fill in all fields with a valid email.';
    formStatus.style.color = 'var(--rust)';
    return;
  }


  formStatus.style.color = 'var(--sage)';
  formStatus.textContent = `Thanks, ${name.split(' ')[0]}!`;
  form.reset();
});
