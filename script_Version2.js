// LOADER
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('done');
    setTimeout(() => { document.getElementById('loader').style.display = 'none'; }, 1000);
  }, 2200);
});

// CUSTOM CURSOR
const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  dot.style.left = mx - 4 + 'px';
  dot.style.top = my - 4 + 'px';
});

function animateCursor() {
  rx += (mx - rx) * 0.15;
  ry += (my - ry) * 0.15;
  ring.style.left = rx + 'px';
  ring.style.top = ry + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

document.querySelectorAll('a, button, .service-card, .gallery-item, .hamburger').forEach(el => {
  el.addEventListener('mouseenter', () => ring.classList.add('hover'));
  el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
});

// NAV SCROLL
const nav = document.getElementById('navbar');
const backTop = document.getElementById('backTop');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 80);
  backTop.classList.toggle('visible', window.scrollY > 500);
});

// HAMBURGER
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('open');
});
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('open');
  });
});

// PARTICLES
const particlesContainer = document.getElementById('particles');
for (let i = 0; i < 30; i++) {
  const p = document.createElement('div');
  p.className = 'particle';
  p.style.left = Math.random() * 100 + '%';
  p.style.animationDuration = (Math.random() * 10 + 8) + 's';
  p.style.animationDelay = (Math.random() * 10) + 's';
  p.style.width = p.style.height = (Math.random() * 3 + 1) + 'px';
  particlesContainer.appendChild(p);
}

// SCROLL REVEAL
const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 100);
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);
reveals.forEach(el => observer.observe(el));

// COUNTER ANIMATION
const stats = document.querySelectorAll('.stat-num[data-count]');
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = parseInt(entry.target.getAttribute('data-count'));
      let current = 0;
      const increment = target / 50;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) { current = target; clearInterval(timer); }
        entry.target.textContent = Math.floor(current) + '+';
      }, 30);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
stats.forEach(s => counterObserver.observe(s));

// TESTIMONIAL SLIDER
const testimonials = document.querySelectorAll('.testimonial-item');
const dots = document.querySelectorAll('.testimonial-dot');
let currentTestimonial = 0;
let testimonialInterval;

function showTestimonial(index) {
  testimonials.forEach(t => t.classList.remove('active'));
  dots.forEach(d => d.classList.remove('active'));
  testimonials[index].classList.add('active');
  dots[index].classList.add('active');
  currentTestimonial = index;
}

function nextTestimonial() {
  showTestimonial((currentTestimonial + 1) % testimonials.length);
}

dots.forEach(dot => {
  dot.addEventListener('click', () => {
    clearInterval(testimonialInterval);
    showTestimonial(parseInt(dot.dataset.index));
    testimonialInterval = setInterval(nextTestimonial, 5000);
  });
});

testimonialInterval = setInterval(nextTestimonial, 5000);

// PARALLAX
window.addEventListener('scroll', () => {
  document.querySelectorAll('.parallax-text').forEach(el => {
    const speed = parseFloat(el.dataset.speed) || 0.3;
    const rect = el.getBoundingClientRect();
    const scrolled = window.scrollY;
    el.style.transform = `translateX(${scrolled * speed * 0.3}px)`;
  });
});

// MAGNETIC BUTTONS
document.querySelectorAll('.btn-primary, .btn-secondary, .nav-cta').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

// SERVICE CARDS TILT
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `translateY(-8px) perspective(600px) rotateX(${y * -5}deg) rotateY(${x * 5}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// BOOKING FORM
function handleBooking(e) {
  e.preventDefault();
  const btn = document.getElementById('submitBtn');
  btn.textContent = 'Booking Confirmed! ✓';
  btn.style.background = '#25D366';
  btn.style.pointerEvents = 'none';
  setTimeout(() => {
    btn.textContent = 'Confirm Appointment →';
    btn.style.background = '';
    btn.style.pointerEvents = '';
    e.target.reset();
  }, 3000);
}

// SMOOTH SCROLL FOR ALL ANCHORS
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});