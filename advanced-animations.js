// Advanced Animation Library for Ctrl+C Landing Page
// Adds sophisticated interactions and delightful micro-animations

class AdvancedAnimations {
  constructor() {
    this.isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.init();
  }

  init() {
    if (this.isReduced) return;

    this.setupCursorFollower();
    this.setupTextAnimations();
    this.setupInteractiveElements();
    this.setupParallaxEffects();
    this.setupMorphingShapes();
    this.setupCounters();
  }

  // Custom cursor that follows mouse with trailing effect
  setupCursorFollower() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.innerHTML = '<div class="cursor-inner"></div>';
    document.body.appendChild(cursor);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // Smooth cursor following
    const animateCursor = () => {
      cursorX += (mouseX - cursorX) * 0.1;
      cursorY += (mouseY - cursorY) * 0.1;

      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
      requestAnimationFrame(animateCursor);
    };
    animateCursor();

    // Cursor interactions
    const interactiveElements = document.querySelectorAll('button, a, .feature-card, .logo-container');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
  }

  // Advanced text animations with staggered reveals
  setupTextAnimations() {
    // Split text into characters for animation
    const animateText = (element, delay = 0) => {
      const text = element.textContent;
      element.innerHTML = '';

      [...text].forEach((char, i) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.opacity = '0';
        span.style.transform = 'translateY(20px)';
        span.style.transition = `all 0.6s cubic-bezier(0.23, 1, 0.32, 1) ${delay + i * 0.03}s`;
        element.appendChild(span);
      });

      // Trigger animation
      setTimeout(() => {
        element.querySelectorAll('span').forEach(span => {
          span.style.opacity = '1';
          span.style.transform = 'translateY(0)';
        });
      }, 100);
    };

    // Observe elements and trigger animations
    const textObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateText(entry.target);
          textObserver.unobserve(entry.target);
        }
      });
    });

    document.querySelectorAll('.feature-title').forEach(el => {
      textObserver.observe(el);
    });
  }

  // Interactive elements with physics-based animations
  setupInteractiveElements() {
    // Magnetic effect for buttons
    const magneticElements = document.querySelectorAll('.submit-btn, .feature-card');

    magneticElements.forEach(el => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        const intensity = 0.3;
        el.style.transform = `translate3d(${x * intensity}px, ${y * intensity}px, 0)`;
      });

      el.addEventListener('mouseleave', () => {
        el.style.transform = 'translate3d(0, 0, 0)';
      });
    });

    // Ripple effect on click
    const createRipple = (e) => {
      const button = e.currentTarget;
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
      `;

      button.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    };

    document.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', createRipple);
    });
  }

  // Parallax scrolling effects
  setupParallaxEffects() {
    const parallaxElements = [
      { selector: '.particle', speed: 0.5 },
      { selector: '.hero-badge', speed: 0.8 },
      { selector: '.feature-icon', speed: 0.9 }
    ];

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;

      parallaxElements.forEach(({ selector, speed }) => {
        document.querySelectorAll(selector).forEach(el => {
          const yPos = -(scrollY * speed);
          el.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
      });
    });
  }

  // Morphing geometric shapes
  setupMorphingShapes() {
    const createShape = () => {
      const shape = document.createElement('div');
      shape.className = 'morphing-shape';
      shape.style.cssText = `
        position: absolute;
        width: 100px;
        height: 100px;
        background: linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1));
        border-radius: 50%;
        opacity: 0.6;
        animation: morph 8s ease-in-out infinite;
        top: ${Math.random() * 100}vh;
        left: ${Math.random() * 100}vw;
        z-index: -1;
      `;

      document.body.appendChild(shape);

      setTimeout(() => shape.remove(), 8000);
    };

    // Create shapes periodically
    setInterval(createShape, 3000);
  }

  // Animated counters for social proof
  setupCounters() {
    const animateCounter = (element, target, duration = 2000) => {
      let start = 0;
      const increment = target / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        element.textContent = Math.floor(start).toLocaleString();

        if (start >= target) {
          element.textContent = target.toLocaleString();
          clearInterval(timer);
        }
      }, 16);
    };

    // Observe and trigger counter animations
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const text = entry.target.textContent;
          const match = text.match(/(\d+k?)\+/);
          if (match) {
            const value = match[1].includes('k') ?
              parseInt(match[1]) * 1000 : parseInt(match[1]);
            animateCounter(entry.target, value);
          }
          counterObserver.unobserve(entry.target);
        }
      });
    });

    document.querySelectorAll('.proof-badge span').forEach(el => {
      if (/\d+k?\+/.test(el.textContent)) {
        counterObserver.observe(el);
      }
    });
  }
}

// Particle System for enhanced visual effects
class ParticleSystem {
  constructor() {
    this.particles = [];
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.init();
  }

  init() {
    this.canvas.className = 'particle-canvas';
    this.canvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: -1;
      opacity: 0.6;
    `;

    document.body.appendChild(this.canvas);
    this.resize();
    this.createParticles();
    this.animate();

    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createParticles() {
    for (let i = 0; i < 50; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2,
        color: `hsl(${Math.random() * 60 + 200}, 70%, 60%)`
      });
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles.forEach((particle, index) => {
      // Update position
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      // Wrap around edges
      if (particle.x < 0) particle.x = this.canvas.width;
      if (particle.x > this.canvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = this.canvas.height;
      if (particle.y > this.canvas.height) particle.y = 0;

      // Draw particle
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fillStyle = particle.color;
      this.ctx.globalAlpha = particle.opacity;
      this.ctx.fill();

      // Connect nearby particles
      this.particles.slice(index + 1).forEach(otherParticle => {
        const dx = particle.x - otherParticle.x;
        const dy = particle.y - otherParticle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          this.ctx.beginPath();
          this.ctx.moveTo(particle.x, particle.y);
          this.ctx.lineTo(otherParticle.x, otherParticle.y);
          this.ctx.strokeStyle = particle.color;
          this.ctx.globalAlpha = (100 - distance) / 100 * 0.2;
          this.ctx.stroke();
        }
      });
    });

    requestAnimationFrame(() => this.animate());
  }
}

// Initialize animations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new AdvancedAnimations();
  new ParticleSystem();
});

// CSS for additional animations
const advancedStyles = `
  .custom-cursor {
    position: fixed;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: rgba(59, 130, 246, 0.3);
    backdrop-filter: blur(5px);
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.2s ease;
  }

  .custom-cursor.hover {
    transform: scale(1.5);
    background: rgba(139, 92, 246, 0.5);
  }

  .cursor-inner {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 4px;
    height: 4px;
    background: var(--primary-600);
    border-radius: 50%;
    transform: translate(-50%, -50%);
  }

  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }

  @keyframes morph {
    0%, 100% {
      border-radius: 50%;
      transform: rotate(0deg) scale(1);
    }
    25% {
      border-radius: 20%;
      transform: rotate(90deg) scale(1.1);
    }
    50% {
      border-radius: 50%;
      transform: rotate(180deg) scale(0.9);
    }
    75% {
      border-radius: 30%;
      transform: rotate(270deg) scale(1.05);
    }
  }

  /* Enhanced micro-interactions */
  .feature-card {
    position: relative;
    overflow: hidden;
  }

  .feature-card::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
    transition: left 0.7s ease-in-out;
  }

  .feature-card:hover::after {
    left: 100%;
  }

  /* Breathing animation for CTA */
  @keyframes breathe {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.02); }
  }

  .submit-btn {
    animation: breathe 3s ease-in-out infinite;
  }

  .submit-btn:hover {
    animation: none;
  }

  /* Floating animation for hero elements */
  @keyframes float-gentle {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-5px); }
  }

  .hero-badge {
    animation: float-gentle 4s ease-in-out infinite;
  }

  /* Text reveal animations */
  .hero-title span {
    display: inline-block;
  }

  /* Enhanced particle effects */
  .particle {
    filter: blur(0.5px);
    box-shadow: 0 0 6px currentColor;
  }

  /* Smooth scrolling with easing */
  html {
    scroll-behavior: smooth;
  }

  @media (max-width: 768px) {
    .custom-cursor {
      display: none;
    }
  }
`;

// Inject advanced styles
const styleSheet = document.createElement('style');
styleSheet.textContent = advancedStyles;
document.head.appendChild(styleSheet);