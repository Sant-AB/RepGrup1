// Main JavaScript file for Bootstrap Responsive Website

document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            
            // Simple validation
            if (!name || !email) {
                alert('Por favor, completa todos los campos.');
                return;
            }
            
            // Show success message
            alert('¡Mensaje enviado exitosamente!');
            this.reset();
        });
    }

    // Navbar collapse on mobile after clicking link
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navbarToggler = document.querySelector('.navbar-toggler');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });
    });
});
// ==== Animación de scroll del bus ====
const scene = document.getElementById('scene');
const canvas = document.getElementById('canvas');
const bus = document.getElementById('bus');
const pct = document.getElementById('pct');

let vh = window.innerHeight;

function updateSizes() {
  vh = window.innerHeight;
  canvas.style.height = Math.max(320, vh * 0.6) + 'px';
}

function getProgress() {
  const rect = scene.getBoundingClientRect();
  const total = scene.offsetHeight - vh;
  const inside = Math.min(Math.max(-rect.top, 0), total);
  return total > 0 ? inside / total : 0;
}

function render(p) {
  const leftPad = canvas.clientWidth * 0.05;
  const rightPad = canvas.clientWidth * 0.15;
  const pathW = canvas.clientWidth - leftPad - rightPad;
  const x = leftPad + pathW * p;

  bus.style.transform = `translateX(${x}px) translateY(-50%)`;
  pct.textContent = Math.round(p * 100) + '%';
}

let ticking = false;
function onScrollOrResize() {
  if (!ticking) {
    ticking = true;
    requestAnimationFrame(() => {
      render(getProgress());
      ticking = false;
    });
  }
}

updateSizes();
render(0);
window.addEventListener('scroll', onScrollOrResize, { passive: true });
window.addEventListener('resize', () => {
  updateSizes();
  onScrollOrResize();
});
onScrollOrResize();
