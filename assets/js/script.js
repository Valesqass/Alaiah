document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuLinks = document.querySelectorAll('.mobile-menu a');

    const toggleMenu = () => {
        menuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    };

    menuToggle.addEventListener('click', toggleMenu);

    menuLinks.forEach(link => {
        link.addEventListener('click', () => {

            toggleMenu();
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            toggleMenu();
        }
    });


    const scrollArrowContainer = document.getElementById('scroll-arrow-container');

    const alaiaPresentationSection = document.getElementById('alaia-presentation');

    if (scrollArrowContainer && alaiaPresentationSection) {
        scrollArrowContainer.addEventListener('click', () => {
            alaiaPresentationSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }
});



// Carousel JavaScript
let currentSlide = 0;
const totalSlides = 3;
const carousel = document.getElementById('carousel');
const indicators = document.querySelectorAll('.indicator');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function updateCarousel() {
    const translateX = -currentSlide * 100;
    carousel.style.transform = `translateX(${translateX}%)`;


    indicators.forEach((indicator, index) => {
        if (index === currentSlide) {
            indicator.classList.remove('bg-opacity-50');
            indicator.classList.add('bg-opacity-100');
        } else {
            indicator.classList.remove('bg-opacity-100');
            indicator.classList.add('bg-opacity-50');
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        currentSlide = index;
        updateCarousel();
    });
});

let startX = 0;
let endX = 0;

carousel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

carousel.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (Math.abs(diff) > 50) {
        if (diff > 0) {
            nextSlide();
        } else {
            prevSlide();
        }
    }
});

setInterval(nextSlide, 5000);

updateCarousel();


// Fonctions pour le modal des plateformes musicales
function openMusicModal() {
    const modal = document.getElementById('musicModal');
    const modalContent = document.getElementById('modalContent');

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    // Animation d'ouverture
    setTimeout(() => {
        modalContent.classList.remove('scale-95', 'opacity-0');
        modalContent.classList.add('scale-100', 'opacity-100');
    }, 10);
}

function closeMusicModal() {
    const modal = document.getElementById('musicModal');
    const modalContent = document.getElementById('modalContent');

    // Animation de fermeture
    modalContent.classList.remove('scale-100', 'opacity-100');
    modalContent.classList.add('scale-95', 'opacity-0');

    setTimeout(() => {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }, 300);
}

// Fermer le modal en cliquant à l'extérieur
document.getElementById('musicModal').addEventListener('click', function (e) {
    if (e.target === this) {
        closeMusicModal();
    }
});

// Fermer le modal avec la touche Échap
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        const modal = document.getElementById('musicModal');
        if (!modal.classList.contains('hidden')) {
            closeMusicModal();
        }
    }
});


function openModal(src, type) {
    const modal = document.getElementById('imageModal');
    const modalContent = document.getElementById('modalContent');

    if (type === 'image') {
        modalContent.innerHTML = `<img src="${src}" alt="Merch Image">`;
    } else if (type === 'video') {
        modalContent.innerHTML = `<video controls autoplay style="width: 100%; height: auto;"><source src="${src}" type="video/mp4"></video>`;
    }

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Fermer le modal en cliquant à l'extérieur
window.onclick = function (event) {
    const modal = document.getElementById('imageModal');
    if (event.target === modal) {
        closeModal();
    }
}

// Fermer avec Escape
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});