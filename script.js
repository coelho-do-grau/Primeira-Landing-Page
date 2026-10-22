// =============================================
// ANO AUTOMÁTICO NO FOOTER
// =============================================
const anoEl = document.getElementById('ano');
if (anoEl) anoEl.textContent = new Date().getFullYear();

// =============================================
// NAVBAR – scroll effect & mobile menu
// =============================================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Fecha menu ao clicar em link
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// =============================================
// SCROLL REVEAL ANIMATIONS
// =============================================
const revealElements = document.querySelectorAll(
  '.tratamento-card, .depoimento-card, .sobre-grid, .hero-content, .hero-image-wrapper, .info-item, .sobre-badge-card'
);

revealElements.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Escalonamento suave
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, 80 * (Array.from(revealElements).indexOf(entry.target) % 4));
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealElements.forEach(el => revealObserver.observe(el));

// =============================================
// FORM – submit simulado
// =============================================
const form = document.getElementById('form-contato');
const formSuccess = document.getElementById('form-success');
const btnEnviar = document.getElementById('btn-enviar');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();

  if (!nome || !email) {
    // Shake nos campos obrigatórios vazios
    [document.getElementById('nome'), document.getElementById('email')].forEach(field => {
      if (!field.value.trim()) {
        field.style.borderColor = '#F472B6';
        field.addEventListener('input', () => {
          field.style.borderColor = '';
        }, { once: true });
      }
    });
    return;
  }

  btnEnviar.disabled = true;
  btnEnviar.textContent = 'Enviando...';

  // Simula envio
  setTimeout(() => {
    form.reset();
    formSuccess.classList.add('show');
    btnEnviar.disabled = false;
    btnEnviar.textContent = 'Enviar mensagem';

    setTimeout(() => {
      formSuccess.classList.remove('show');
    }, 5000);
  }, 1200);
});

// =============================================
// SMOOTH COUNTER ANIMATION (hero stats)
// =============================================
function animateCounter(element, target, duration = 1800) {
  const text = element.textContent;
  const suffix = text.replace(/[\d.,]/g, '');
  const numStr = text.replace(/[^\d]/g, '');
  const num = parseInt(numStr, 10);

  if (isNaN(num)) return;

  let start = null;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * num);
    element.textContent = current.toLocaleString('pt-BR') + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.stat-number').forEach(el => {
        animateCounter(el, 0);
      });
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);
