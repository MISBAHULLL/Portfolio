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

// Mulai animasi setelah DOM loaded
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeWriter, 1000);
    initThemeSelector();
});