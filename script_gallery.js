document.addEventListener('DOMContentLoaded', function () {
    const swiper = new Swiper('.swiper-container', {
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        effect: 'cube',
        cubeEffect: {
            shadow: true,
            slideShadows: true,
            shadowOffset: 20,
            shadowScale: 0.94,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    const sliders = {};

    function initializeSlider(sliderElement) {
        const slides = sliderElement.querySelector('.slides');
        const totalSlides = slides.children.length;
        const sliderId = sliderElement.dataset.sliderId;

        sliders[sliderId] = {
            currentIndex: 0,
            totalSlides: totalSlides,
            slides: slides
        };
        const prevButton = sliderElement.querySelector('.prev');
        const nextButton = sliderElement.querySelector('.next');

        prevButton.addEventListener('click', () => changeSlide(sliderId, -1));
        nextButton.addEventListener('click', () => changeSlide(sliderId, 1));
    }

    function showSlide(sliderId, index) {
        const slider = sliders[sliderId];
        if (!slider) return;

        if (index >= slider.totalSlides) {
            slider.currentIndex = 0;
        } else if (index < 0) {
            slider.currentIndex = slider.totalSlides - 1;
        } else {
            slider.currentIndex = index;
        }

        const offset = -slider.currentIndex * 100;
        slider.slides.style.transform = `translateX(${offset}%)`;
    }

    function changeSlide(sliderId, direction) {
        const slider = sliders[sliderId];
        if (!slider) return;

        showSlide(sliderId, slider.currentIndex + direction);
    }
    

    window.onload = function() {
        const sliderElements = document.querySelectorAll('.slider');

        sliderElements.forEach((sliderElement, index) => {
            sliderElement.dataset.sliderId = `slider${index + 1}`;
            initializeSlider(sliderElement);
            showSlide(`slider${index + 1}`, 0);
        });
    };

    
});


const captions = document.querySelectorAll('.caption');

captions.forEach(caption => {
    caption.addEventListener('click', function() {
        const textDiv = this.nextElementSibling;

        if (textDiv.style.display === "none" || textDiv.style.display === "") {
            textDiv.style.display = "flex"; 
        } else {
            textDiv.style.display = "none"; 
        }
    });
});