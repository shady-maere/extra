// Hero Slider functionality
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    slides[index].classList.add('active');
    dots[index].classList.add('active');
}

// Auto advance slides
setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}, 5000);

// Dot navigation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
    });
});

// Brand carousel navigation
const brandPrev = document.querySelector('.brand-carousel .prev');
const brandNext = document.querySelector('.brand-carousel .next');
const brands = document.querySelector('.brands');

if (brandPrev && brandNext) {
    brandPrev.addEventListener('click', () => {
        brands.scrollBy({
            left: -200,
            behavior: 'smooth'
        });
    });

    brandNext.addEventListener('click', () => {
        brands.scrollBy({
            left: 200,
            behavior: 'smooth'
        });
    });
}

// Product carousel navigation
const productPrev = document.querySelector('.product-carousel .prev');
const productNext = document.querySelector('.product-carousel .next');
const products = document.querySelector('.products');

if (productPrev && productNext) {
    productPrev.addEventListener('click', () => {
        products.scrollBy({
            left: -200,
            behavior: 'smooth'
        });
    });

    productNext.addEventListener('click', () => {
        products.scrollBy({
            left: 200,
            behavior: 'smooth'
        });
    });
}

// Cookie notification
const cookieNotification = document.querySelector('.cookie-notification');
const gotItButton = document.querySelector('.got-it');

if (gotItButton) {
    gotItButton.addEventListener('click', () => {
        cookieNotification.style.display = 'none';
        // Store the preference in localStorage
        localStorage.setItem('cookieConsent', 'true');
    });
}

// Check if user has already consented
if (localStorage.getItem('cookieConsent') === 'true') {
    cookieNotification.style.display = 'none';
} 