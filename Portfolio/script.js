"use strict";

/* =========================================
   PERSONAL PORTFOLIO - SCRIPT.JS
========================================= */

document.addEventListener("DOMContentLoaded", function () {
  /* =========================================
     1. PORTFOLIO TABS
     Projects, Certificates, Skills
  ========================================= */

  const tabs = document.querySelectorAll(".portfolio-tab");
  const panels = document.querySelectorAll(".portfolio-panel");

  function openTab(tabName) {
    const selectedTab = document.querySelector(
      '.portfolio-tab[data-tab="' + tabName + '"]',
    );

    const selectedPanel = document.querySelector(
      '.portfolio-panel[data-panel="' + tabName + '"]',
    );

    // Jika tombol atau panel tidak ditemukan, hentikan fungsi
    if (!selectedTab || !selectedPanel) {
      console.warn("Tab atau panel tidak ditemukan:", tabName);
      return;
    }

    // Atur status tombol tab
    tabs.forEach(function (tab) {
      const isActive = tab.dataset.tab === tabName;

      tab.classList.toggle("active", isActive);
      tab.setAttribute("aria-selected", String(isActive));
      tab.setAttribute("tabindex", isActive ? "0" : "-1");
    });

    // Tampilkan panel yang dipilih dan sembunyikan panel lainnya
    panels.forEach(function (panel) {
      const isActive = panel.dataset.panel === tabName;

      panel.hidden = !isActive;
      panel.classList.toggle("active", isActive);
    });
  }

  // Tambahkan fungsi klik pada setiap tombol tab
  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      openTab(tab.dataset.tab);
    });
  });

  // Navigasi tab menggunakan keyboard
  tabs.forEach(function (tab, index) {
    tab.addEventListener("keydown", function (event) {
      let nextIndex = index;

      if (event.key === "ArrowRight") {
        nextIndex = (index + 1) % tabs.length;
      } else if (event.key === "ArrowLeft") {
        nextIndex = (index - 1 + tabs.length) % tabs.length;
      } else if (event.key === "Home") {
        nextIndex = 0;
      } else if (event.key === "End") {
        nextIndex = tabs.length - 1;
      } else {
        return;
      }

      event.preventDefault();

      const nextTab = tabs[nextIndex];

      if (nextTab) {
        openTab(nextTab.dataset.tab);
        nextTab.focus();
      }
    });
  });

  // Tampilkan Projects saat halaman pertama kali dibuka
  if (document.querySelector('.portfolio-tab[data-tab="projects"]')) {
    openTab("projects");
  }

  /* =========================================
     2. MOBILE NAVIGATION
  ========================================= */

  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  function closeMobileMenu() {
    if (!menuToggle || !navLinks) {
      return;
    }

    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }

  if (menuToggle && navLinks) {
    // Buka atau tutup menu saat tombol diklik
    menuToggle.addEventListener("click", function () {
      const isOpen = navLinks.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Tutup menu setelah link diklik
    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        closeMobileMenu();
      });
    });

    // Tutup menu jika pengguna mengklik di luar navigasi
    document.addEventListener("click", function (event) {
      const clickedInsideMenu = navLinks.contains(event.target);
      const clickedToggle = menuToggle.contains(event.target);

      if (!clickedInsideMenu && !clickedToggle) {
        closeMobileMenu();
      }
    });

    // Tutup menu jika tombol Escape ditekan
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeMobileMenu();
      }
    });

    // Tutup menu saat layar berubah menjadi desktop
    window.addEventListener("resize", function () {
      if (window.innerWidth > 760) {
        closeMobileMenu();
      }
    });
  }

  /* =========================================
     3. AUTOMATIC FOOTER YEAR
  ========================================= */

  const currentYear = document.getElementById("currentYear");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  /* =========================================
     4. BACK TO TOP
  ========================================= */

  const backToTopButtons = document.querySelectorAll(".back-to-top");

  backToTopButtons.forEach(function (button) {
    button.addEventListener("click", function (event) {
      const href = button.getAttribute("href");

      // Hanya tangani link yang menuju bagian atas halaman ini
      if (href === "#home" || href === "#") {
        event.preventDefault();

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    });
  });

  /* =========================================
     5. CARD REVEAL ANIMATION
  ========================================= */

  const animatedElements = document.querySelectorAll(
    ".portfolio-card, .skill-card, .info-card",
  );

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      function (entries, currentObserver) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
      },
    );

    animatedElements.forEach(function (element) {
      observer.observe(element);
    });
  } else {
    // Fallback untuk browser yang tidak mendukung IntersectionObserver
    animatedElements.forEach(function (element) {
      element.classList.add("visible");
    });
  }

  /* =========================================
     6. PROJECT AND CERTIFICATE PDF LINKS
  ========================================= */

  const pdfLinks = document.querySelectorAll("a.project-link");

  pdfLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      const destination = link.getAttribute("href");

      // Cegah navigasi jika link belum diisi
      if (!destination || destination.trim() === "" || destination === "#") {
        event.preventDefault();

        alert("File PDF belum ditautkan. Silakan tambahkan alamat file PDF.");

        return;
      }

      // Link PDF akan dibuka oleh browser menggunakan target="_blank".
      // JavaScript tidak mengganti alamat atau membuka file tambahan.
    });
  });

  /* =========================================
     7. IMAGE FALLBACK
     Tampilkan latar jika gambar gagal dimuat
  ========================================= */

  const images = document.querySelectorAll(
    ".project-image img, .certificate-image img",
  );

  images.forEach(function (img) {
    img.addEventListener("error", function () {
      img.style.opacity = "0.35";
      img.alt = "Gambar belum tersedia";
    });
  });

  /* =========================================
     8. ACTIVE NAVIGATION LINK
  ========================================= */

  const navItems = document.querySelectorAll(".nav-links .nav-link");

  navItems.forEach(function (link) {
    link.addEventListener("click", function () {
      const targetHref = link.getAttribute("href");

      // Jangan ubah status link halaman terpisah
      if (
        targetHref &&
        !targetHref.startsWith("#") &&
        !targetHref.includes("#")
      ) {
        return;
      }

      navItems.forEach(function (item) {
        item.classList.remove("active");
      });

      link.classList.add("active");
    });
  });

  /* =========================================
     9. INITIALIZATION COMPLETE
  ========================================= */

  console.log("Portfolio JavaScript berhasil dijalankan.");
});