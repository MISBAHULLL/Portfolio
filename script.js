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

// Mulai animasi setelah DOM loaded
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeWriter, 1000);
});