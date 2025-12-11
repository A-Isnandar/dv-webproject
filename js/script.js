/* LOGIC UTAMA WEBSITE (UPDATED FIX MOBILE DROPDOWN) */

document.addEventListener('componentsLoaded', () => {
  console.log('Website Ready! Menjalankan Logic...');

  // ==========================================
  // 1. NAVBAR SCROLL & HAMBURGER
  // ==========================================
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const allMenuLinks = document.querySelectorAll('.nav-menu a');

  // Scroll Effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile Menu Toggle
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      navbar.classList.toggle('mobile-open');

      const icon = hamburger.querySelector('i');
      if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
  }

  // ==========================================
  // [BARU] LOGIC DROPDOWN MOBILE (FIX BUG ANDROID)
  // ==========================================
  const dropdownParent = document.querySelector('.dropdown');
  const dropdownLink = document.querySelector('.dropdown > a');

  if (dropdownLink && dropdownParent) {
    dropdownLink.addEventListener('click', (e) => {
      // Hanya jalankan logic ini di mode mobile (layar kecil)
      if (window.innerWidth <= 768) {
        e.preventDefault(); // 1. TAHAN: Jangan pindah ke #more
        e.stopPropagation(); // 2. TAHAN: Jangan biarkan event naik ke "Tutup Menu"

        dropdownParent.classList.toggle('active'); // 3. AKSI: Cukup buka/tutup sub-menu
      }
    });
  }

  // ==========================================
  // LOGIC TUTUP MENU (UPDATED)
  // ==========================================
  allMenuLinks.forEach((link) => {
    link.addEventListener('click', () => {
      // PENTING: Kalau yang diklik adalah link "More" (Dropdown Parent) di HP,
      // JANGAN jalankan fungsi tutup menu ini. Biarkan logic di atas yang handle.
      if (
        window.innerWidth <= 768 &&
        link.parentElement.classList.contains('dropdown')
      ) {
        return;
      }

      // Selain itu (misal link Home, Menu, atau Sub-menu Events), BARU tutup menu
      if (navMenu) navMenu.classList.remove('active');
      if (navbar) navbar.classList.remove('mobile-open');

      // Reset Icon Hamburger
      if (hamburger) {
        const icon = hamburger.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
  });

  // ==========================================
  // 2. SCROLL ANIMATION (REVEAL)
  // ==========================================
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  // ==========================================
  // 3. MENU TABS (DAY / NIGHT)
  // ==========================================
  window.openMenu = function (evt, menuName) {
    let i, menuContent, tabBtn;

    menuContent = document.getElementsByClassName('menu-content');
    for (i = 0; i < menuContent.length; i++) {
      menuContent[i].style.display = 'none';
      menuContent[i].classList.remove('active');
    }

    tabBtn = document.getElementsByClassName('tab-btn');
    for (i = 0; i < tabBtn.length; i++) {
      tabBtn[i].className = tabBtn[i].className.replace(' active', '');
    }

    const selectedMenu = document.getElementById(menuName);
    if (selectedMenu) {
      selectedMenu.style.display = 'block';
      selectedMenu.classList.add('active');
    }

    if (evt && evt.currentTarget) {
      evt.currentTarget.className += ' active';
    }
  };

  // ==========================================
  // 4. MODAL POPUP LOGIC
  // ==========================================
  const modalOverlay = document.getElementById('modal-overlay');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const closeModal = document.querySelector('.close-modal');

  window.openModal = function (title, contentId) {
    const contentDiv = document.getElementById(contentId);

    if (contentDiv && modalOverlay) {
      modalTitle.innerText = title;
      modalBody.innerHTML = contentDiv.innerHTML;
      modalOverlay.classList.add('active');
    } else {
      console.error('Modal Content tidak ditemukan: ' + contentId);
    }
  };

  if (closeModal) {
    closeModal.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
    });
  }

  window.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove('active');
    }
  });

  // 0. MATIKAN PRELOADER
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add('hide');
    }, 1000);
  }
});
