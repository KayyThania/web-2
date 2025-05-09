document.addEventListener('DOMContentLoaded', function() {
  // Carousel functionality
  const slides = document.querySelector('.carousel-slides');
  const slideItems = Array.from(document.querySelectorAll('.carousel-slide'));
  const nextButton = document.querySelector('.carousel-button.next');
  const prevButton = document.querySelector('.carousel-button.prev');
  const dots = Array.from(document.querySelectorAll('.dot'));
  
  let currentIndex = 0;
  const slideCount = slideItems.length;
  
  // Function to update carousel position
  function updateCarousel() {
    slides.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    // Update active dot
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }
  
  // Next button click
  nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slideCount;
    updateCarousel();
  });
  
  // Previous button click
  prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slideCount) % slideCount;
    updateCarousel();
  });
  
  // Dot click
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentIndex = index;
      updateCarousel();
    });
  });
  
  // Touch swipe functionality
  let touchStartX = 0;
  let touchEndX = 0;
  
  slides.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });
  
  slides.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });
  
  const handleSwipe = () => {
    const swipeThreshold = 50; // Minimum distance to be considered a swipe
    
    if (touchEndX < touchStartX - swipeThreshold) {
      // Swipe left, go to next slide
      currentIndex = (currentIndex + 1) % slideCount;
      updateCarousel();
    } else if (touchEndX > touchStartX + swipeThreshold) {
      // Swipe right, go to previous slide
      currentIndex = (currentIndex - 1 + slideCount) % slideCount;
      updateCarousel();
    }
  };
  
  // Auto slide every 5 seconds
  setInterval(() => {
    currentIndex = (currentIndex + 1) % slideCount;
    updateCarousel();
  }, 5000);
});