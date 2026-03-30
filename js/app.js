import ParticleSystem from './particles.js';
import CustomCursor from './cursor.js';
import PortfolioAnimations from './animations.js';

class PortfolioApp {
    constructor() {
        this.init();
    }

    init() {
        this.animations = new PortfolioAnimations();
        this.animations.init();
        this.particles = new ParticleSystem('particles-canvas');
        this.cursor = new CustomCursor();
        this.setupNavigation();
        this.setupMobileMenu();
    }

    setupNavigation() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', e => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });
    }

    setupMobileMenu() {
        const menuToggle = document.getElementById('menu-toggle');
        const navLinks = document.getElementById('nav-links');
        if (!menuToggle || !navLinks) return;
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
}

document.addEventListener('DOMContentLoaded', () => {
    new PortfolioApp();
});
