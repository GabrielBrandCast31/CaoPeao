// Menu mobile
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');

navToggle?.addEventListener('click', () => {
  nav.classList.toggle('open');
}, { passive: true });

nav?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('open'), { passive: true });
});

// Ano automático no footer
document.getElementById('year').textContent = new Date().getFullYear();

// Formulário -> envia para WhatsApp
const form = document.getElementById('leadForm');
const WHATSAPP_NUMBER = '553185178147'; // (31) 8517-8147 — DDI 55 + DDD 31 + número

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

// Lazy-load do Google Maps — só carrega quando o usuário interage ou rola até perto
const mapCard = document.getElementById('mapCard');
const mapBtn = document.getElementById('mapLoad');

const loadMap = () => {
  if (!mapCard || mapCard.dataset.loaded) return;
  mapCard.dataset.loaded = '1';
  const iframe = document.createElement('iframe');
  iframe.src = 'https://www.google.com/maps?q=Sarzedo,+MG&output=embed';
  iframe.width = '100%';
  iframe.height = '100%';
  iframe.loading = 'lazy';
  iframe.referrerPolicy = 'no-referrer-when-downgrade';
  iframe.allowFullscreen = true;
  iframe.title = 'Localização Cão Peão - Centro de Sarzedo';
  iframe.style.border = '0';
  mapCard.replaceChildren(iframe);
};

mapBtn?.addEventListener('click', loadMap, { passive: true });

if ('IntersectionObserver' in window && mapCard) {
  const mapObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      // Carrega quando estiver perto da viewport, no ocioso do browser
      const fn = () => loadMap();
      ('requestIdleCallback' in window)
        ? requestIdleCallback(fn, { timeout: 2000 })
        : setTimeout(fn, 200);
      mapObserver.disconnect();
    }
  }, { rootMargin: '300px' });
  mapObserver.observe(mapCard);
}
