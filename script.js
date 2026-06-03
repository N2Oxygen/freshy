
/* ============================================
   FRESHY — Premium Beverage Brand
   Interactive JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // ============================================
  // NAVBAR — Scroll Behavior (Disabled as navbar is static)
  // ============================================

  // ============================================
  // MOBILE MENU
  // ============================================
  const navbar = document.getElementById('navbar');
  const heroSection = document.getElementById('hero');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll('.mobile-link') : [];

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    if (navbar) {
      navbar.classList.toggle('mobile-menu-active');
    }
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
      if (navbar) {
        navbar.classList.remove('mobile-menu-active');
      }
      document.body.style.overflow = '';
    });
  });

  // ============================================
  // SCROLL REVEAL ANIMATIONS
  // ============================================
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));



  // ============================================
  // COUNTER ANIMATION
  // ============================================
  const counterValues = document.querySelectorAll('.counter-value');

  const animateCounter = (el) => {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 2000;
    const startTime = performance.now();

    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);

      el.textContent = current + suffix;

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.5
  });

  counterValues.forEach(el => counterObserver.observe(el));


  // ============================================
  // SCROLL-TO-TOP BUTTON
  // ============================================
  const scrollTopBtn = document.getElementById('scrollTop');

  const handleScrollTop = () => {
    const scrollY = window.scrollY;
    const heroHeight = heroSection ? heroSection.offsetHeight : 600;

    if (scrollY > heroHeight) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', handleScrollTop, { passive: true });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ============================================
  // MOBILE STICKY CTA
  // ============================================
  const mobileCta = document.getElementById('mobileCta');

  const handleMobileCta = () => {
    const scrollY = window.scrollY;
    const heroHeight = heroSection ? heroSection.offsetHeight : 600;

    if (scrollY > heroHeight && window.innerWidth <= 768) {
      mobileCta.classList.add('visible');
    } else {
      mobileCta.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', handleMobileCta, { passive: true });

  // ============================================
  // SMOOTH SCROLL for all anchor links
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      e.preventDefault();
      const target = document.querySelector(targetId);
      if (target) {
        const navbar = document.getElementById('navbar');
        const navHeight = navbar ? navbar.offsetHeight : 80;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });



  // ============================================
  // EMAIL CAPTURE — Simple feedback
  // ============================================
  const emailInput = document.getElementById('emailInput');
  const emailSubmit = document.getElementById('emailSubmit');

  if (emailSubmit && emailInput) {
    emailSubmit.addEventListener('click', (e) => {
      e.preventDefault();
      const email = emailInput.value.trim();

      if (email && email.includes('@')) {
        emailInput.value = '';
        emailSubmit.textContent = 'Terima Kasih! ✨';
        emailSubmit.style.pointerEvents = 'none';

        setTimeout(() => {
          emailSubmit.textContent = 'Daftar';
          emailSubmit.style.pointerEvents = '';
        }, 3000);
      } else {
        emailInput.style.outline = '2px solid #FF6F61';
        emailInput.placeholder = 'Masukkan email yang valid...';

        setTimeout(() => {
          emailInput.style.outline = '';
          emailInput.placeholder = 'Masukkan email untuk info promo...';
        }, 2000);
      }
    });
  }


  // ============================================
  // GALLERY — Lightbox effect
  // ============================================
  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (!img) return;

      // Create lightbox
      const lightbox = document.createElement('div');
      lightbox.style.cssText = `
        position: fixed;
        inset: 0;
        z-index: 9999;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s ease;
        padding: 40px;
      `;

      const lightboxImg = document.createElement('img');
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightboxImg.style.cssText = `
        max-width: 90%;
        max-height: 90vh;
        border-radius: 16px;
        object-fit: contain;
        transform: scale(0.9);
        transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      `;

      lightbox.appendChild(lightboxImg);
      document.body.appendChild(lightbox);
      document.body.style.overflow = 'hidden';

      // Animate in
      requestAnimationFrame(() => {
        lightbox.style.opacity = '1';
        lightboxImg.style.transform = 'scale(1)';
      });

      // Close on click
      lightbox.addEventListener('click', () => {
        lightbox.style.opacity = '0';
        lightboxImg.style.transform = 'scale(0.9)';
        setTimeout(() => {
          document.body.removeChild(lightbox);
          document.body.style.overflow = '';
        }, 300);
      });
    });
  });


  // ============================================
  // INITIAL STATE
  // ============================================
  // handleNavbarScroll();
  handleScrollTop();
  handleMobileCta();
});
