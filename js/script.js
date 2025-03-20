document.addEventListener('DOMContentLoaded', function() {
    // Select all scroll sections
    const scrollSections = document.querySelectorAll('.scroll-wrapper');

    scrollSections.forEach((section) => {
        const scrollContainer = section.querySelector('.scroll-container');
        const prevButton = section.querySelector('.nav-arrow.prev');
        const nextButton = section.querySelector('.nav-arrow.next');

        function scrollPrev() {
            scrollContainer.scrollBy({
                left: -296, // card width + gap
                behavior: 'smooth'
            });
        }

        function scrollNext() {
            scrollContainer.scrollBy({
                left: 296, // card width + gap
                behavior: 'smooth'
            });
        }

        function updateArrowVisibility() {
            const isAtStart = scrollContainer.scrollLeft <= 10;
            const isAtEnd = scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth;

            prevButton.style.opacity = isAtStart ? '0.5' : '1';
            prevButton.style.pointerEvents = isAtStart ? 'none' : 'auto';

            nextButton.style.opacity = isAtEnd ? '0.5' : '1';
            nextButton.style.pointerEvents = isAtEnd ? 'none' : 'auto';
        }

        prevButton.addEventListener('click', scrollPrev);
        nextButton.addEventListener('click', scrollNext);
        scrollContainer.addEventListener('scroll', updateArrowVisibility);
        window.addEventListener('resize', updateArrowVisibility);

        // Initial check
        updateArrowVisibility();
    });
});
