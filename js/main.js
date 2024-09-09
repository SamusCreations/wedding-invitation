const openMenuBtn = document.getElementById('openMenuBtn');
const closeMenuBtn = document.getElementById('closeMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

openMenuBtn.addEventListener('click', () => {
  mobileMenu.classList.remove('hidden');  // Mostrar el menú
});

closeMenuBtn.addEventListener('click', () => {
  mobileMenu.classList.add('hidden');  // Ocultar el menú
});