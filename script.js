// Animasi Typing Text
const texts = [
    "Frontend Developer",
    "Backend Developer", 
    "UI/UX Designer",
    "Data Analyst",
    "Full Stack Developer"
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseTime = 2000;

function typeWriter() {
    const element = document.querySelector('.Animasi-Text span');
    const currentText = texts[textIndex];
    
    if (!isDeleting) {
        // Mengetik
        element.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        
        if (charIndex === currentText.length) {
            // Pause sebelum menghapus
            setTimeout(() => {
                isDeleting = true;
                typeWriter();
            }, pauseTime);
            return;
        }
        
        setTimeout(typeWriter, typingSpeed);
    } else {
        // Menghapus
        element.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        
        if (charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(typeWriter, 500);
            return;
        }
        
        setTimeout(typeWriter, deletingSpeed);
    }
}

// Theme Selector Functionality
function initThemeSelector() {
    const themeButtons = document.querySelectorAll('.theme-btn');
    const body = document.body;
    
    themeButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            themeButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Change theme
            const theme = button.getAttribute('data-theme');
            body.setAttribute('data-theme', theme);
            
            // Save theme preference
            localStorage.setItem('selectedTheme', theme);
        });
    });
    
    // Load saved theme
    const savedTheme = localStorage.getItem('selectedTheme') || 'purple';
    body.setAttribute('data-theme', savedTheme);
    
    // Set active button
    themeButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-theme') === savedTheme) {
            btn.classList.add('active');
        }
    });
}

// Scroll Reveal Animation
function initScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);
    
    // Observe timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        item.style.animationPlayState = 'paused';
        observer.observe(item);
    });
    
    // Observe project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.style.animationPlayState = 'paused';
        observer.observe(card);
    });
    
    // Observe contact items
    const contactItems = document.querySelectorAll('.contact-item, .contact-social, .contact-form');
    contactItems.forEach(item => {
        item.style.animationPlayState = 'paused';
        observer.observe(item);
    });
    
    // Observe footer items
    const footerItems = document.querySelectorAll('.footer-section, .footer-bottom');
    footerItems.forEach(item => {
        item.style.animationPlayState = 'paused';
        observer.observe(item);
    });
}

// Contact Form Handler
function initContactForm() {
    const form = document.querySelector('.contact-form form');
    const submitBtn = document.querySelector('.contact-btn');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Add loading state
            submitBtn.classList.add('loading');
            
            // Simulate form submission
            setTimeout(() => {
                submitBtn.classList.remove('loading');
                
                // Show success message (you can customize this)
                alert('Pesan berhasil dikirim! Terima kasih.');
                
                // Reset form
                form.reset();
            }, 2000);
        });
    }
    
    // Add focus effects to form inputs
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });
}

// Mobile Menu Toggle
function initMobileMenu() {
    const menuIcon = document.getElementById('menu-icon');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.navbar a');
    
    if (menuIcon && navbar) {
        menuIcon.addEventListener('click', () => {
            navbar.classList.toggle('active');
            menuIcon.classList.toggle('active');
        });
        
        // Close menu when clicking nav links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navbar.classList.remove('active');
                menuIcon.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navbar.contains(e.target) && !menuIcon.contains(e.target)) {
                navbar.classList.remove('active');
                menuIcon.classList.remove('active');
            }
        });
    }
}

// Mulai animasi setelah DOM loaded
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeWriter, 1000);
    initThemeSelector();
    initScrollReveal();
    initContactForm();
    initMobileMenu();
});