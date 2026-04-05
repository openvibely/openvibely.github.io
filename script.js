// ========================================
// OpenVibely Marketing Site - Interactions
// ========================================

(function () {
    'use strict';

    // --- Scroll-triggered animations ---
    const animateElements = document.querySelectorAll('[data-animate]');

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const delay = parseInt(entry.target.dataset.delay || '0', 10);
                    setTimeout(() => {
                        entry.target.classList.add('animated');
                    }, delay);
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    animateElements.forEach((el) => observer.observe(el));

    // --- Nav scroll effect ---
    const nav = document.getElementById('nav');

    function updateNav() {
        if (window.scrollY > 20) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav();

    // --- Mobile nav toggle ---
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('open');
        });

        // Close mobile nav on link click
        navLinks.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
            });
        });
    }

    // --- Smooth scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offset = nav.offsetHeight + 20;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // --- Animated counter ---
    const counters = document.querySelectorAll('[data-count]');

    const counterObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.5 }
    );

    counters.forEach((el) => counterObserver.observe(el));

    function animateCounter(el) {
        const target = parseInt(el.dataset.count, 10);
        const duration = 1500;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * target);
            el.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }

    // --- Terminal typing animation ---
    const typingEl = document.getElementById('typing-text');
    const lines = [
        'Analyzing codebase structure...',
        'Creating auth middleware...',
        'Writing JWT token handler...',
        'Adding route guards...',
        'Running test suite... 42 passed',
        'Committing changes to feature/auth',
        'Task completed successfully.',
    ];

    let lineIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let pauseTimer = null;

    function typeLoop() {
        if (!typingEl) return;

        const currentLine = lines[lineIndex];

        if (!isDeleting) {
            typingEl.textContent = currentLine.substring(0, charIndex + 1);
            charIndex++;

            if (charIndex === currentLine.length) {
                // Pause at end of line
                pauseTimer = setTimeout(() => {
                    isDeleting = true;
                    typeLoop();
                }, 2000);
                return;
            }

            setTimeout(typeLoop, 30 + Math.random() * 40);
        } else {
            typingEl.textContent = currentLine.substring(0, charIndex - 1);
            charIndex--;

            if (charIndex === 0) {
                isDeleting = false;
                lineIndex = (lineIndex + 1) % lines.length;
                setTimeout(typeLoop, 400);
                return;
            }

            setTimeout(typeLoop, 15);
        }
    }

    // Start typing after a delay
    setTimeout(typeLoop, 1500);
})();
