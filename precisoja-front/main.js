// precisoja-front/src/main.js
import './style.css'
import '@css'

// Base URL da API (definida em .env.local ou .env)
const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

// 1) Typewriter no placeholder (inalterado)
const input = document.getElementById('search-input');
const phrases = [
  'preciso montar um móvel',
  'preciso de um pintor',
  'preciso de um eletricista',
  'preciso de um encanador'
];
let current = 0;
let charIndex = 0;
let typing = true;
function typePlaceholder() {
  const text = phrases[current];
  if (typing) {
    input.placeholder = text.slice(0, ++charIndex);
    if (charIndex < text.length) {
      setTimeout(typePlaceholder, 100);
    } else {
      typing = false;
      setTimeout(typePlaceholder, 1500);
    }
  } else {
    input.placeholder = text.slice(0, --charIndex);
    if (charIndex > 0) {
      setTimeout(typePlaceholder, 50);
    } else {
      typing = true;
      current = (current + 1) % phrases.length;
      setTimeout(typePlaceholder, 500);
    }
  }
}
typePlaceholder();

// 2) IntersectionObserver para categorias (inalterado)
const cards = document.querySelectorAll('.category-card');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('opacity-100', 'translate-y-0');
      entry.target.classList.remove('opacity-0');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
cards.forEach(card => observer.observe(card));

// 3) Busca de profissionais via evento de clique
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('search-input');
  const button = document.getElementById('search-btn');

  button.addEventListener('click', async () => {
    const termo = input.value.trim();
    if (!termo) return;

    try {
      // Monta URL com query param
      const url = new URL(`${API_BASE}/buscar`);
      url.searchParams.append('termo', termo);

      const res = await fetch(url.toString(), { method: 'GET' });
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const data = await res.json();
      console.log('Resposta da API:', data);

      // TODO: renderize 'data' no DOM como cards de resultado
    } catch (err) {
      console.error('Erro na requisição:', err);
    }
  });
});

// Adicione este trecho em src/main.js, após receber o 'data' no fetch do botão:

function renderizarResultados(profissionais) {
  const container = document.getElementById('search-results');
  container.innerHTML = ''; // limpa resultados anteriores

  profissionais.forEach(p => {
    const card = document.createElement('div');
    card.className = 'bg-gray-800 p-6 rounded-2xl shadow-md text-white flex flex-col';

    // Título com o nome
    const nome = document.createElement('h2');
    nome.className = 'text-xl font-semibold mb-2';
    nome.textContent = p.nome;

    // Categoria
    const categoria = document.createElement('p');
    categoria.className = 'text-sm text-gray-300 mb-1';
    categoria.textContent = `Categoria: ${p.categoria}`;

    // Avaliação
    const avaliacao = document.createElement('p');
    avaliacao.className = 'text-sm text-gray-300';
    avaliacao.textContent = `Avaliação: ${p.avaliacao}`;

    // Monta
    card.appendChild(nome);
    card.appendChild(categoria);
    card.appendChild(avaliacao);
    container.appendChild(card);
  });
}

// No evento de clique do botão:
button.addEventListener('click', async () => {
  // ... após const data = await res.json();
  console.log('Resposta da API:', data);
  renderizarResultados(data);
});
