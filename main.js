document.addEventListener("DOMContentLoaded", () => {
    const contadores = document.querySelectorAll('.contador');
  
    const iniciarContador = (elemento) => {
      const valorFinal = parseInt(elemento.getAttribute('data-valor'));
      let valorAtual = 0;
      const incremento = Math.ceil(valorFinal / 100);
  
      const animar = () => {
        valorAtual += incremento;
        if (valorAtual >= valorFinal) {
          elemento.textContent = valorFinal;
        } else {
          elemento.textContent = valorAtual;
          requestAnimationFrame(animar);
        }
      };
  
      animar();
    };
  
    const observer = new IntersectionObserver((entradas, obs) => {
      entradas.forEach(entrada => {
        if (entrada.isIntersecting) {
          iniciarContador(entrada.target);
          obs.unobserve(entrada.target); // só anima uma vez
        }
      });
    }, { threshold: 0.9 }); // 60% do elemento visível
  
    contadores.forEach(contador => {
      observer.observe(contador);
    });
  });
  
  const menuToggle = document.getElementById('menu-toggle');
      const nav = document.getElementById('nav');
    
      menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
      });
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;

    const headerOffset = 100; // ajuste para seu header fixo
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1200; // tempo da animação (1200ms = 1.2 segundos)
    let start = null;

    window.requestAnimationFrame(function step(timestamp) {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const percent = Math.min(progress / duration, 1);
      window.scrollTo(0, startPosition + distance * percent);

      if (progress < duration) {
        window.requestAnimationFrame(step);
      }
    });

    // Fechar menu no mobile depois do clique
    const nav = document.getElementById('nav');
    if (nav.classList.contains('active')) {
      nav.classList.remove('active');
    }
  });
});
