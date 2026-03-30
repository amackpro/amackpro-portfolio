// Particle System
class ParticleSystem {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 80;
        this.connectedDistance = 150;
        this.init();
        this.animate();
        window.addEventListener('resize', () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        });
    }

    init() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 0.5,
                color: `rgba(0, 245, 255, ${Math.random() * 0.5 + 0.1})`
            });
        }
    }

    update() {
        this.particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.particles.forEach(p => {
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = p.color;
            this.ctx.fill();
        });
    }

    connect() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < this.connectedDistance) {
                    const opacity = 0.2 - (dist / (this.connectedDistance * 3.75));
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(0, 245, 255, ${opacity})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }

    animate() {
        this.update();
        this.draw();
        this.connect();
        requestAnimationFrame(() => this.animate());
    }
}

// Custom Cursor
class CustomCursor {
    constructor() {
        this.cursor = document.getElementById('cursor');
        this.cursorDot = document.getElementById('cursor-dot');
        if (!this.cursor || !this.cursorDot) return;
        this.mouseX = 0;
        this.mouseY = 0;
        this.cursorX = 0;
        this.cursorY = 0;
        this.dotX = 0;
        this.dotY = 0;
        document.addEventListener('mousemove', e => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });
        document.querySelectorAll('a, .btn, .skill-card, .project-card, .stat-item, .contact-link, .social-link, .tech-item, .skill-tag, .project-link, button').forEach(el => {
            el.addEventListener('mouseenter', () => this.cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => this.cursor.classList.remove('hover'));
        });
        this.animate();
    }

    animate() {
        this.cursorX += (this.mouseX - 10 - this.cursorX) * 0.15;
        this.cursorY += (this.mouseY - 10 - this.cursorY) * 0.15;
        this.cursor.style.left = this.cursorX + 'px';
        this.cursor.style.top = this.cursorY + 'px';
        this.dotX += (this.mouseX - 4 - this.dotX) * 0.35;
        this.dotY += (this.mouseY - 4 - this.dotY) * 0.35;
        this.cursorDot.style.left = this.dotX + 'px';
        this.cursorDot.style.top = this.dotY + 'px';
        requestAnimationFrame(() => this.animate());
    }
}

// Portfolio Animations
class PortfolioAnimations {
    init() {
        this.heroAnimations();
        this.scrollAnimations();
        this.marqueeAnimation();
        this.glitchEffect();
        this.typingAnimation();
        this.loaderAnimation();
        this.navbarScroll();
    }

    heroAnimations() {
        gsap.set('.hero-title', { y: 50 });
        gsap.set('.hero-subtitle, .hero-description, .typing-container, .hero-buttons, .scroll-indicator', { y: 30 });
        
        gsap.timeline({ defaults: { ease: 'power3.out' } })
            .to('.hero-subtitle', { opacity: 1, y: 0, duration: 0.8 }, 0.5)
            .to('.hero-title', { opacity: 1, y: 0, duration: 1 }, 0.7)
            .to('.hero-description', { opacity: 1, y: 0, duration: 0.8 }, 0.9)
            .to('.typing-container', { opacity: 1, y: 0, duration: 0.8 }, 1.1)
            .to('.hero-buttons', { opacity: 1, y: 0, duration: 0.8 }, 1.3)
            .to('.scroll-indicator', { opacity: 1, y: 0, duration: 0.8 }, 1.5);
    }

    scrollAnimations() {
        document.querySelectorAll('.section-header').forEach(el => {
            gsap.fromTo(el, { opacity: 0, y: 50 }, {
                opacity: 1, y: 0, duration: 1,
                scrollTrigger: { trigger: el, start: 'top 80%', toggleActions: 'play none none reverse' }
            });
        });

        document.querySelectorAll('.about-image-container').forEach(el => {
            gsap.fromTo(el, { opacity: 0, x: -100 }, {
                opacity: 1, x: 0, duration: 1,
                scrollTrigger: { trigger: el, start: 'top 80%', toggleActions: 'play none none reverse' }
            });
        });

        document.querySelectorAll('.about-text').forEach(el => {
            gsap.fromTo(el, { opacity: 0, x: 100 }, {
                opacity: 1, x: 0, duration: 1,
                scrollTrigger: { trigger: el, start: 'top 80%', toggleActions: 'play none none reverse' }
            });
        });

        document.querySelectorAll('.skill-card').forEach((card, i) => {
            gsap.fromTo(card, { opacity: 0, y: 50, scale: 0.9 }, {
                opacity: 1, y: 0, scale: 1, duration: 0.6, delay: i * 0.1,
                scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none reverse' }
            });
        });

        document.querySelectorAll('.project-card').forEach((card, i) => {
            gsap.fromTo(card, { opacity: 0, y: 80 }, {
                opacity: 1, y: 0, duration: 0.8, delay: i * 0.15,
                scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none reverse' }
            });
        });

        document.querySelectorAll('.stat-item').forEach((stat, i) => {
            gsap.fromTo(stat, { opacity: 0, y: 30 }, {
                opacity: 1, y: 0, duration: 0.5, delay: i * 0.1,
                scrollTrigger: { trigger: stat, start: 'top 90%', toggleActions: 'play none none reverse' }
            });
        });

        document.querySelectorAll('.contact-link').forEach((link, i) => {
            gsap.fromTo(link, { opacity: 0, y: 30 }, {
                opacity: 1, y: 0, duration: 0.5, delay: i * 0.1,
                scrollTrigger: { trigger: link, start: 'top 90%', toggleActions: 'play none none reverse' }
            });
        });

        document.querySelectorAll('.floating-icon').forEach((icon, i) => {
            gsap.to(icon, {
                y: '+=30', x: '+=10', rotation: 10,
                duration: 2 + Math.random() * 2, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: i * 0.5
            });
        });
    }

    marqueeAnimation() {
        const marquee = document.querySelector('.tech-marquee');
        if (!marquee) return;
        const totalWidth = marquee.scrollWidth / 2;
        gsap.to(marquee, {
            x: -totalWidth, duration: 30, ease: 'none', repeat: -1,
            modifiers: { x: gsap.utils.unitize(x => parseFloat(x) % totalWidth) }
        });
    }

    glitchEffect() {
        const glitchElement = document.querySelector('.glitch');
        if (!glitchElement) return;
        gsap.to(glitchElement, {
            skewX: 10, duration: 0.1, repeat: -1, yoyo: true, ease: 'power1.inOut', repeatDelay: 3
        });
    }

    typingAnimation() {
        const typingText = document.querySelector('.typing-text');
        if (!typingText) return;
        const texts = ['Android Kernel Developer', 'Rust Enthusiast', '.NET Architect', 'Open Source Contributor'];
        let currentIndex = 0;
        
        gsap.to(typingText, {
            y: -60, duration: 0.3, ease: 'power2.inOut', repeat: -1, repeatDelay: 2,
            onComplete: () => {
                currentIndex = (currentIndex + 1) % texts.length;
                typingText.innerHTML = texts.join('<br>');
                gsap.set(typingText, { y: 0 });
            }
        });
    }

    loaderAnimation() {
        const loader = document.getElementById('loader');
        const progress = document.querySelector('.loader-progress');
        if (!loader || !progress) return;
        gsap.to(progress, {
            width: '100%', duration: 2, ease: 'power2.inOut',
            onComplete: () => {
                gsap.to(loader, {
                    opacity: 0, duration: 0.5,
                    onComplete: () => { loader.style.display = 'none'; }
                });
            }
        });
    }

    navbarScroll() {
        const navbar = document.getElementById('navbar');
        if (!navbar) return;
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        });
    }
}

// Mobile detection
const isMobile = window.innerWidth <= 768;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    if (!isMobile) {
        new PortfolioAnimations().init();
        new ParticleSystem('particles-canvas');
        new CustomCursor();
    } else {
        // Simplified animations for mobile
        new PortfolioAnimations().init();
        // Reduced particle count for mobile
        const ps = new ParticleSystem('particles-canvas');
        ps.particleCount = 30;
        ps.init();
        // Show elements without animation
        document.querySelectorAll('.hero-subtitle, .hero-title, .hero-description, .typing-container, .hero-buttons, .scroll-indicator').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
    }
    
    // Navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // Mobile Menu
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
});
