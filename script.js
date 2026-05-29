// Menu mobile
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');

navToggle?.addEventListener('click', () => {
  nav.classList.toggle('open');
});

nav?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

// Ano automático no footer
document.getElementById('year').textContent = new Date().getFullYear();

// Formulário -> envia para WhatsApp
const form = document.getElementById('leadForm');
const WHATSAPP_NUMBER = '5500000000000'; // substituir pelo número real (DDI + DDD + número)

form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const nome = data.get('nome') || '';
  const telefone = data.get('telefone') || '';
  const pet = data.get('pet') || '';
  const especie = data.get('especie') || '';
  const cidade = data.get('cidade') || '';
  const mensagem = data.get('mensagem') || '';

  const texto =
    `*Agendamento - Cão Peão*%0A` +
    `*Nome:* ${nome}%0A` +
    `*WhatsApp:* ${telefone}%0A` +
    (pet ? `*Pet:* ${pet}%0A` : '') +
    `*Espécie:* ${especie}%0A` +
    (cidade ? `*Cidade:* ${cidade}%0A` : '') +
    (mensagem ? `*Mensagem:* ${mensagem}` : '');

  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${texto}`, '_blank');
});

// Reveal on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.service-card, .testimonial, .diff-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});
