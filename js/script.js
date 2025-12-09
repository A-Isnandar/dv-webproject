/* LOGIC UTAMA WEBSITE
   Dijalankan setelah semua komponen HTML (Navbar, Hero, dll) selesai dimuat oleh loader.js
*/

document.addEventListener('componentsLoaded', () => {
  console.log('Website Ready! Menjalankan Logic...');

  // ==========================================
  // 1. NAVBAR SCROLL & HAMBURGER
  // ==========================================
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

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
      // 1. Toggle menu child
      navMenu.classList.toggle('active');

      // 2. [TAMBAHAN BARU] Toggle background navbar induk
      navbar.classList.toggle('mobile-open');

      // 3. Ganti icon hamburger/silang
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

  // Close menu when clicking link
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (navMenu) navMenu.classList.remove('active');

      // [TAMBAHAN BARU] Hapus background navbar saat link diklik
      if (navbar) navbar.classList.remove('mobile-open');

      if (hamburger) {
        const icon = hamburger.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
  });

  // Close menu when clicking link
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (navMenu) navMenu.classList.remove('active');
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
  // Kita tempel fungsi ini ke 'window' biar bisa dipanggil HTML onclick=""
  window.openMenu = function (evt, menuName) {
    let i, menuContent, tabBtn;

    // Sembunyikan semua konten
    menuContent = document.getElementsByClassName('menu-content');
    for (i = 0; i < menuContent.length; i++) {
      menuContent[i].style.display = 'none';
      menuContent[i].classList.remove('active');
    }

    // Matikan semua tombol active
    tabBtn = document.getElementsByClassName('tab-btn');
    for (i = 0; i < tabBtn.length; i++) {
      tabBtn[i].className = tabBtn[i].className.replace(' active', '');
    }

    // Nyalakan yang dipilih
    const selectedMenu = document.getElementById(menuName);
    if (selectedMenu) {
      selectedMenu.style.display = 'block';
      selectedMenu.classList.add('active');
    }

    // Cek jika evt valid (kadang dipanggil manual tanpa event klik)
    if (evt && evt.currentTarget) {
      evt.currentTarget.className += ' active';
    }
  };

  // ==========================================
  // 4. MODAL POPUP LOGIC (FIXED)
  // ==========================================
  const modalOverlay = document.getElementById('modal-overlay');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const closeModal = document.querySelector('.close-modal');

  // PENTING: Kita pasang fungsi ini ke object 'window'
  // Supaya tombol HTML onclick="openModal(...)" bisa menemukannya
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

  // Event Listener Tutup Modal
  if (closeModal) {
    closeModal.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
    });
  }

  // Tutup kalau klik di luar area
  window.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove('active');
    }
  });
});
