/* ══════════════════════════════════════════════════════════
   SCRIPT PRINCIPAL — Hostería Oceanic
══════════════════════════════════════════════════════════ */

/* ── 1. Toggle del menú mobile ─────────────────────────── */
(function () {
  var toggle = document.getElementById('navToggle');
  var menu = document.getElementById('navMobile');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', function () {
    var isOpen = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Cierra el menú al hacer clic en cualquier link interno
  menu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();

/* ── 2. Carruseles (room-carousel y frases-carousel) ───── */
(function () {
  function initCarousel(root, opts) {
    var track = root.querySelector(opts.track);
    var slides = root.querySelectorAll(opts.slide);
    var prevBtn = root.querySelector(opts.prev);
    var nextBtn = root.querySelector(opts.next);
    var dots = root.querySelectorAll(opts.dot);
    if (!track || !slides.length) return;

    var count = slides.length;

    function currentIndex() {
      var slideWidth = track.clientWidth;
      if (!slideWidth) return 0;
      return Math.round(track.scrollLeft / slideWidth);
    }

    function goTo(index) {
      var clamped = Math.max(0, Math.min(count - 1, index));
      track.scrollTo({ left: clamped * track.clientWidth, behavior: 'smooth' });
    }

    function updateDots() {
      var idx = currentIndex();
      dots.forEach(function (dot, i) {
        dot.classList.toggle('is-active', i === idx);
      });
      if (prevBtn) prevBtn.style.visibility = idx === 0 ? 'hidden' : 'visible';
      if (nextBtn) nextBtn.style.visibility = idx === count - 1 ? 'hidden' : 'visible';
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function (e) {
        e.preventDefault();
        goTo(currentIndex() - 1);
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', function (e) {
        e.preventDefault();
        goTo(currentIndex() + 1);
      });
    }

    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () {
        goTo(i);
      });
    });

    track.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        goTo(currentIndex() + 1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goTo(currentIndex() - 1);
      }
    });

    var scrollTimer;
    track.addEventListener('scroll', function () {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(updateDots, 80);
    });

    updateDots();
  }

  function initAll() {
    document.querySelectorAll('.room-carousel').forEach(function (root) {
      initCarousel(root, {
        track: '.room-carousel-track',
        slide: '.room-carousel-slide',
        prev: '.room-carousel-arrow--prev',
        next: '.room-carousel-arrow--next',
        dot: '.room-carousel-dot',
      });
    });

    document.querySelectorAll('.frases-carousel').forEach(function (root) {
      initCarousel(root, {
        track: '.frases-carousel-track',
        slide: '.frases-carousel-slide',
        prev: '.frases-carousel-arrow--prev',
        next: '.frases-carousel-arrow--next',
        dot: '.frases-carousel-dot',
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
})();
