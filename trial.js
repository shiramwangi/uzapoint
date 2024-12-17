// Listen for scroll events
window.addEventListener('scroll', function () {
    const section = document.querySelector('.image-section');
    const body = document.querySelector('body');
    const scrollPosition = window.scrollY;
  
    // Add or remove 'scrolled' class based on scroll position
    if (scrollPosition > 100) { // 100px scroll threshold
      section.classList.add('scrolled');
      body.classList.add('scrolled'); // Add scrolled class to body to trigger background change
    } else {
      section.classList.remove('scrolled');
      body.classList.remove('scrolled'); // Remove scrolled class to revert background color
    }
  });
  
  
  