// Create floating particles
function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    const particleCount = 15;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Scroll progress indicator
function updateScrollProgress() {
    const scrollProgress = document.querySelector('.scroll-progress');
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.pageYOffset / scrollHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
}

// Animated counters
function animateCounters() {
    const counters = document.querySelectorAll('.stat-counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 50;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                if (counter.textContent.includes('%')) {
                    counter.textContent = Math.ceil(current) + '%';
                } else {
                    counter.textContent = Math.ceil(current) + '+';
                }
                setTimeout(updateCounter, 40);
            } else {
                if (counter.textContent.includes('%')) {
                    counter.textContent = target + '%';
                } else {
                    counter.textContent = target + '+';
                }
            }
        };
        
        updateCounter();
    });
}

// Magnetic effect for buttons
function addMagneticEffect() {
    const magneticElements = document.querySelectorAll('.magnetic');
    
    magneticElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const deltaX = (e.clientX - centerX) * 0.15;
            const deltaY = (e.clientY - centerY) * 0.15;
            
            element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translate(0, 0)';
        });
    });
}

// Reveal elements on scroll
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal-up');
    
    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('revealed');
        }
    });
}

// Parallax effect for hero
function parallaxHero() {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    const parallax = scrolled * 0.3;
    
    hero.style.transform = `translateY(${parallax}px)`;
}

// Initialize all interactive features
function initInteractivity() {
    createParticles();
    addMagneticEffect();
    
    // Animate typing text
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        typingText.style.width = '0';
        setTimeout(() => {
            typingText.style.width = '100%';
        }, 1000);
    }
    
    // Scroll event listeners
    window.addEventListener('scroll', () => {
        updateScrollProgress();
        revealOnScroll();
        parallaxHero();
    });
    
    // Initial reveal check
    revealOnScroll();
}

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

let isDark = localStorage.getItem('theme') === 'dark';
updateTheme();

themeToggle.addEventListener('click', () => {
    isDark = !isDark;
    updateTheme();
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

function updateTheme() {
    if (isDark) {
        body.setAttribute('data-theme', 'dark');
        themeToggle.textContent = '☀️';
    } else {
        body.removeAttribute('data-theme');
        themeToggle.textContent = '🌙';
    }
}

// Mobile Menu Toggle
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.querySelector('.nav-menu');

mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileToggle.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
});

// Close mobile menu when clicking on links
document.querySelectorAll('.nav-link, .cta-btn').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileToggle.textContent = '☰';
    });
});

// Cursor Gradient Effect
const cursorGradient = document.querySelector('.cursor-gradient');

document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    
    cursorGradient.style.setProperty('--mouse-x', x + '%');
    cursorGradient.style.setProperty('--mouse-y', y + '%');
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Ensure hero content is visible immediately
gsap.set('.hero-content', {
    opacity: 1,
    y: 0
});

// Then animate it in
gsap.from('.hero-content', {
    duration: 1.2,
    y: 30,
    opacity: 0,
    ease: "power3.out",
    delay: 0.2
});

// Scroll-triggered animations
gsap.utils.toArray('.fade-up').forEach((element, index) => {
    gsap.fromTo(element, 
        {
            y: 50,
            opacity: 0
        },
        {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: element,
                start: "top 85%",
                end: "bottom 15%",
                toggleActions: "play none none reverse"
            }
        }
    );
});

// Service cards hover animation
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card, {duration: 0.3, scale: 1.02, ease: "power2.out"});
    });
    
    card.addEventListener('mouseleave', () => {
        gsap.to(card, {duration: 0.3, scale: 1, ease: "power2.out"});
    });
});

// Project cards hover animation
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card.querySelector('.project-image'), {
            duration: 0.3, 
            scale: 1.05, 
            ease: "power2.out"
        });
    });
    
    card.addEventListener('mouseleave', () => {
        gsap.to(card.querySelector('.project-image'), {
            duration: 0.3, 
            scale: 1, 
            ease: "power2.out"
        });
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.transform = 'translateY(0)';
        return;
    }
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// Contact Form Handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Simple form validation
    if (!data.name || !data.email || !data.message) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Send to server
    fetch('/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            alert('Thank you! We\'ll get back to you within 24 hours.');
            this.reset();
        } else {
            alert('There was an error sending your message. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was an error sending your message. Please try again.');
    });
});

// Counter animation trigger
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Start interactivity and counter animation
document.addEventListener('DOMContentLoaded', () => {
    initInteractivity();
    
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});

// Hero title should be visible immediately
const heroTitle = document.querySelector('.hero h1');
if (heroTitle) {
    // Ensure title is visible
    heroTitle.style.opacity = '1';
}

// Simple fade-in instead
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '1';
});
