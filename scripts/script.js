// Strong 3D tilt + parallax + small UI helpers
document.addEventListener('DOMContentLoaded', () => {
    // year readouts
    const y = new Date().getFullYear();
    document.querySelectorAll('#year, #year2, #year3, #year4').forEach(el => {
      if (el) el.textContent = y;
    });
  
    // Mobile toggle (basic)
    const toggle = document.querySelector('.mobile-toggle');
    const nav = document.querySelector('.nav');
    if (toggle && nav) {
      toggle.addEventListener('click', () => {
        nav.classList.toggle('open');
      });
    }
  
    // Tilt effect for all elements with data-tilt
    const tiltEls = document.querySelectorAll('[data-tilt]');
    tiltEls.forEach(el => {
      el.addEventListener('mousemove', (ev) => {
        const r = el.getBoundingClientRect();
        const px = (ev.clientX - r.left) / r.width;
        const py = (ev.clientY - r.top) / r.height;
        // rotate based on pointer
        const rotY = (px - 0.5) * 26;   // horizontal sensitivity
        const rotX = (0.5 - py) * 20;   // vertical sensitivity
        const translateZ = 20 + (0.5 - Math.abs(px - 0.5)) * 40;
        el.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(${translateZ}px)`;
        // subtle parallax for children
        const children = el.querySelectorAll('.card, .proj-inner, .case-media, .plate-1, .plate-2');
        children.forEach((c, i) => {
          // different depth per child
          const depth = (i + 1) * 8;
          c.style.transform = `translateZ(${depth}px)`;
        });
      });
  
      el.addEventListener('mouseleave', () => {
        el.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0px)';
        const children = el.querySelectorAll('.card, .proj-inner, .case-media, .plate-1, .plate-2');
        children.forEach(c => c.style.transform = '');
      });
    });
  
    // small hover lift for project cards to amplify 3D feeling
    document.querySelectorAll('.proj, .project-case').forEach(p => {
      p.addEventListener('mouseenter', () => p.style.transform = 'translateY(-12px) scale(1.01)');
      p.addEventListener('mouseleave', () => p.style.transform = '');
    });
  
    // Contact form (client-side only)
    const form = document.getElementById('contactForm');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = new FormData(form);
        // simulate send
        alert(`Thanks ${data.get('name') || 'there'} — message received (demo).`);
        form.reset();
      });
    }
  
    // light fade-in on load for tilt elements
    document.querySelectorAll('[data-tilt]').forEach((el, idx) => {
      el.style.opacity = 0;
      el.style.transform = 'translateY(10px)';
      setTimeout(() => {
        el.style.transition = 'opacity .6s ease, transform .6s cubic-bezier(.2,.9,.3,1)';
        el.style.opacity = 1;
        el.style.transform = '';
      }, 120 * idx);
    });
  });
  
