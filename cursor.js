// Crea y anima un cursor personalizado, y cambia su estado en elementos interactivos.
document.addEventListener('DOMContentLoaded', () => {
  if ('ontouchstart' in window) return; // evitar en touch
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  document.body.appendChild(cursor);

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let posX = mouseX;
  let posY = mouseY;
  const lerp = (a, b, n) => (1 - n) * a + n * b;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.opacity = '1';
  });

  document.addEventListener('mouseleave', () => cursor.style.opacity = '0');
  document.addEventListener('mouseenter', () => cursor.style.opacity = '1');

  function render() {
    posX = lerp(posX, mouseX, 0.18);
    posY = lerp(posY, mouseY, 0.18);
    cursor.style.transform = `translate(${posX}px, ${posY}px) translate(-50%, -50%)`;
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);

  const interactiveSelector = 'a, button, .btn, .nav-link, .project-link, [data-cursor="hover"]';
  document.querySelectorAll(interactiveSelector).forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('custom-cursor--hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('custom-cursor--hover'));
    el.addEventListener('mousedown', () => cursor.classList.add('custom-cursor--active'));
    el.addEventListener('mouseup', () => cursor.classList.remove('custom-cursor--active'));
  });
});