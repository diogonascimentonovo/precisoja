import './style.css'

import '@css'

// 2) Typewriter no placeholder
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

// … código de typewriter aí em cima …

// 3) IntersectionObserver para categorias
const cards = document.querySelectorAll('.category-card');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('opacity-100', 'translate-y-0');
      entry.target.classList.remove('opacity-0');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.2
});

cards.forEach(card => {
  observer.observe(card);
});
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("search-input");
  const button = document.getElementById("search-btn");

  button.addEventListener("click", () => {
    const texto = input.value.trim();
    if (!texto) return;

    fetch("http://localhost:8000/api/recomendar-servicos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ texto })
    })
      .then(res => res.json())
      .then(data => {
        console.log("Resposta da API:", data);
        // Aqui você pode mostrar os serviços na tela se quiser
      })
      .catch(err => {
        console.error("Erro na requisição:", err);
      });
  });
});

