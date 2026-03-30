import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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

export default PortfolioAnimations;
