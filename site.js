// Abstract toggles: each button shows or hides its paper's abstract.
document.querySelectorAll('.abs-toggle').forEach((btn) => {
  const panel = document.getElementById(btn.getAttribute('aria-controls'));
  btn.addEventListener('click', () => {
    const open = btn.getAttribute('aria-expanded') !== 'true';
    btn.setAttribute('aria-expanded', String(open));
    panel.classList.toggle('open', open);
  });
});

// Enlarge a paper figure in a pop-up. Without script, the figure link opens the image directly.
(() => {
  const box = document.querySelector('.lightbox');
  if (!box || typeof box.showModal !== 'function') return;
  const img = box.querySelector('img');
  const caption = box.querySelector('figcaption');

  document.querySelectorAll('.fig').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      img.src = link.getAttribute('href');
      img.alt = link.querySelector('img').alt;
      caption.textContent = link.dataset.caption;
      box.showModal();
    });
  });

  box.querySelector('.close').addEventListener('click', () => box.close());
  // A click on the dark area around the figure closes it; Escape closes it natively.
  box.addEventListener('click', (event) => {
    const r = box.getBoundingClientRect();
    const inside = event.clientX >= r.left && event.clientX <= r.right && event.clientY >= r.top && event.clientY <= r.bottom;
    if (!inside) box.close();
  });
  box.addEventListener('close', () => { img.removeAttribute('src'); });
})();
