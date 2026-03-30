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

export default CustomCursor;
