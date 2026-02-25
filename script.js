/* =========================================
   LUCHIKY LOGISTICS — MAIN JS
   ========================================= */

   (function () {
    'use strict';
  
    // ---- NAVBAR SCROLL EFFECT ----
    const navbar = document.getElementById('navbar');
    function handleNavScroll() {
      if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
    window.addEventListener('scroll', handleNavScroll);
    handleNavScroll();
  
    // ---- MOBILE HAMBURGER ----
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  
    // ---- HERO SLIDER ----
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let sliderInterval;
  
    function goToSlide(index) {
      slides[currentSlide].classList.remove('active');
      dots[currentSlide].classList.remove('active');
      currentSlide = (index + slides.length) % slides.length;
      slides[currentSlide].classList.add('active');
      dots[currentSlide].classList.add('active');
    }
  
    function nextSlide() { goToSlide(currentSlide + 1); }
    function prevSlide() { goToSlide(currentSlide - 1); }
  
    function startSlider() {
      sliderInterval = setInterval(nextSlide, 5500);
    }
    function resetSlider() {
      clearInterval(sliderInterval);
      startSlider();
    }
  
    document.getElementById('heroNext').addEventListener('click', function () {
      nextSlide();
      resetSlider();
    });
    document.getElementById('heroPrev').addEventListener('click', function () {
      prevSlide();
      resetSlider();
    });
    dots.forEach(function (dot) {
      dot.addEventListener('click', function () {
        goToSlide(parseInt(dot.dataset.index));
        resetSlider();
      });
    });
    startSlider();
  
    // ---- BACK TO TOP ----
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  
    // ---- SCROLL REVEAL ----
    function addRevealClasses() {
      const targets = [
        { selector: '.service-card', delays: [0, 1, 2, 0, 1, 2] },
        { selector: '.review-card', delays: [0, 1, 2, 0, 1, 2] },
        { selector: '.step', delays: [0, 1, 2, 3] },
        { selector: '.stat-item', delays: [0, 1, 2, 3] },
      ];
      targets.forEach(function (group) {
        document.querySelectorAll(group.selector).forEach(function (el, i) {
          el.classList.add('reveal');
          if (group.delays[i] !== undefined) {
            el.classList.add('reveal-delay-' + group.delays[i]);
          }
        });
      });
      document.querySelectorAll('.section-header, .about-content, .about-visual, .contact-info, .contact-form-wrap').forEach(function (el) {
        el.classList.add('reveal');
      });
    }
    addRevealClasses();
  
    const revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
  
    document.querySelectorAll('.reveal').forEach(function (el) {
      revealObserver.observe(el);
    });
  
    // ---- STATS COUNTER ----
    const statNums = document.querySelectorAll('.stat-num');
    function animateCounter(el) {
      const target = parseInt(el.getAttribute('data-target'));
      const duration = 1800;
      const start = performance.now();
      function update(time) {
        const elapsed = time - start;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(ease * target);
        if (progress < 1) requestAnimationFrame(update);
        else el.textContent = target;
      }
      requestAnimationFrame(update);
    }
    const statsObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    statNums.forEach(function (num) { statsObserver.observe(num); });
  
    // ---- CONTACT FORM ----
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    if (contactForm) {
      contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const btn = contactForm.querySelector('button[type=submit]');
        btn.textContent = 'Sending...';
        btn.disabled = true;
        setTimeout(function () {
          formSuccess.classList.add('visible');
          contactForm.reset();
          btn.textContent = 'Send Message';
          btn.disabled = false;
          setTimeout(function () { formSuccess.classList.remove('visible'); }, 5000);
        }, 1200);
      });
    }
  
    // ---- SMOOTH SCROLL FOR ANCHOR LINKS ----
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          e.preventDefault();
          const offset = 76;
          const top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
      });
    });
  
  })();