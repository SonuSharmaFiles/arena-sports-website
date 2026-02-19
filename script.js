/* ============================================================
   ARENA SPORTS — INTERACTIVITY
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ===== NAVBAR =====
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  // Scroll detection for navbar
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    navbar.classList.toggle('scrolled', scrollY > 50);
    lastScroll = scrollY;
  });

  // Mobile toggle
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close mobile nav on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });


  // ===== HERO PARTICLES =====
  const particlesContainer = document.getElementById('heroParticles');
  if (particlesContainer) {
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.classList.add('hero-particle');
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = (60 + Math.random() * 40) + '%';
      particle.style.animationDuration = (4 + Math.random() * 8) + 's';
      particle.style.animationDelay = Math.random() * 6 + 's';
      particle.style.width = (1 + Math.random() * 3) + 'px';
      particle.style.height = particle.style.width;
      particlesContainer.appendChild(particle);
    }
  }


  // ===== HERO PARALLAX =====
  const heroBg = document.querySelector('.hero-bg');
  window.addEventListener('scroll', () => {
    if (heroBg) {
      const scrolled = window.scrollY;
      heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
  });


  // ===== HERO STAT COUNTERS =====
  function formatNumber(num) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'K';
    }
    return num.toString();
  }

  function animateHeroStats() {
    const statNums = document.querySelectorAll('.hero-stat-num');
    statNums.forEach(el => {
      const target = parseInt(el.dataset.target);
      const duration = 2000;
      const startTime = performance.now();

      function updateCount(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease-out-quart
        const eased = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(eased * target);
        el.textContent = formatNumber(current);
        if (progress < 1) {
          requestAnimationFrame(updateCount);
        } else {
          el.textContent = formatNumber(target);
        }
      }
      requestAnimationFrame(updateCount);
    });
  }

  // Start hero stats after a delay
  setTimeout(animateHeroStats, 1200);


  // ===== MATCH COUNTDOWN TIMERS =====
  function updateCountdowns() {
    const cards = document.querySelectorAll('.match-card');
    cards.forEach(card => {
      const matchDate = new Date(card.dataset.matchDate).getTime();
      const now = Date.now();
      const diff = matchDate - now;

      const daysEl = card.querySelector('[data-cd="days"]');
      const hoursEl = card.querySelector('[data-cd="hours"]');
      const minutesEl = card.querySelector('[data-cd="minutes"]');
      const secondsEl = card.querySelector('[data-cd="seconds"]');

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        daysEl.textContent = String(days).padStart(2, '0');
        hoursEl.textContent = String(hours).padStart(2, '0');
        minutesEl.textContent = String(minutes).padStart(2, '0');
        secondsEl.textContent = String(seconds).padStart(2, '0');
      } else {
        daysEl.textContent = '00';
        hoursEl.textContent = '00';
        minutesEl.textContent = '00';
        secondsEl.textContent = '00';
      }
    });
  }

  updateCountdowns();
  setInterval(updateCountdowns, 1000);


  // ===== SCROLL REVEAL =====
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger the animation
        setTimeout(() => {
          entry.target.classList.add('active');
        }, index * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));


  // ===== PLAYER STAT BARS =====
  const playerCards = document.querySelectorAll('.player-card');

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fills = entry.target.querySelectorAll('.stat-fill');
        fills.forEach((fill, i) => {
          setTimeout(() => {
            fill.style.width = fill.dataset.width + '%';
          }, i * 150);
        });
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  playerCards.forEach(card => statsObserver.observe(card));


  // ===== ACHIEVEMENT COUNTERS =====
  const counterElements = document.querySelectorAll('.counter');
  const counterAnimated = new Set();

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !counterAnimated.has(entry.target)) {
        counterAnimated.add(entry.target);
        const target = parseInt(entry.target.dataset.target);
        const duration = 2500;
        const startTime = performance.now();

        function updateCounter(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 4);
          const current = Math.floor(eased * target);
          entry.target.textContent = current.toLocaleString();
          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            entry.target.textContent = target.toLocaleString();
          }
        }
        requestAnimationFrame(updateCounter);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counterElements.forEach(el => counterObserver.observe(el));


  // ===== NEWSLETTER FORM =====
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('newsletterEmail');
      const btn = newsletterForm.querySelector('.btn');
      const originalText = btn.textContent;

      btn.textContent = 'JOINED!';
      btn.style.background = '#22c55e';
      emailInput.value = '';

      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
      }, 3000);
    });
  }


  // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      e.preventDefault();
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const navHeight = navbar.offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });


  // ===== MOUSE MOVE EFFECT ON HERO =====
  const heroContent = document.querySelector('.hero-content');
  const hero = document.querySelector('.hero');

  if (hero && heroContent) {
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      heroContent.style.transform = `translate(${x * 10}px, ${y * 5}px)`;
    });

    hero.addEventListener('mouseleave', () => {
      heroContent.style.transform = 'translate(0, 0)';
      heroContent.style.transition = 'transform 0.5s ease';
      setTimeout(() => {
        heroContent.style.transition = '';
      }, 500);
    });
  }


  // ===== DYNAMIC TICKER PAUSE ON HOVER =====
  const tickerScroll = document.getElementById('tickerScroll');
  if (tickerScroll) {
    tickerScroll.addEventListener('mouseenter', () => {
      tickerScroll.style.animationPlayState = 'paused';
    });
    tickerScroll.addEventListener('mouseleave', () => {
      tickerScroll.style.animationPlayState = 'running';
    });
  }

});
