document.addEventListener('DOMContentLoaded', function () {
  const openMenuBtn = document.getElementById('openMenuBtn');
  const closeMenuBtn = document.getElementById('closeMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  function openMenu() {
    mobileMenu.classList.remove('translate-x-full');
    mobileMenu.classList.add('translate-x-0');
    mobileMenu.classList.remove('hidden');
  }

  function closeMenu() {
    mobileMenu.classList.add('translate-x-full');
    mobileMenu.classList.remove('translate-x-0');
    setTimeout(() => {
      mobileMenu.classList.add('hidden');
    }, 300); // Match the duration of the transition
  }

  openMenuBtn.addEventListener('click', openMenu);
  closeMenuBtn.addEventListener('click', closeMenu);
  
  // Close the menu when a menu item is clicked
  mobileMenu.querySelectorAll('a').forEach(item => {
    item.addEventListener('click', closeMenu);
  });
});

