document.addEventListener('DOMContentLoaded', function() {
    // Campaign Slideshow
    const slides = document.querySelectorAll('.campaign-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        // Fade out current slide
        slides[currentSlide].style.opacity = '0';
        
        setTimeout(() => {
            slides[currentSlide].classList.remove('active');
            // Update current slide
            currentSlide = index;
            // Show and fade in new slide
            slides[currentSlide].classList.add('active');
            slides[currentSlide].style.opacity = '1';
        }, 750); // Half of the transition time
    }

    function nextSlide() {
        let next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }

    function prevSlide() {
        let prev = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prev);
    }

    // Initialize slideshow
    showSlide(0);
    slideInterval = setInterval(nextSlide, 4000);

    // Event Listeners
    prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        prevSlide();
        resetInterval();
    });

    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        nextSlide();
        resetInterval();
    });

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            resetInterval();
        });
    });

    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 4000);
    }

    // Pause on hover
    const campaignCard = document.querySelector('.campaign-card');
    
    campaignCard.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    campaignCard.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 4000);
    });

    // Add click functionality to campaign card
    campaignCard.addEventListener('click', () => {
        window.location.href = 'shopping.html';
    });

    // Featured Products
    const featuredTrack = document.querySelector('.featured-track');
    
    // Create featured products cards
    const products = [
        { name: 'Mabuyu', price: 50, image: 'mabuyu.png' },
        { name: 'Wireless Earbuds', price: 2500, image: 'earbuds.png' },
        { name: 'Traditional Dress', price: 3500, image: 'traditionaldress.png' },
        { name: 'Tusker', price: 250, image: 'tusker.png' },
        { name: 'Achari', price: 50, image: 'achari.png' },
        { name: 'Smartphone', price: 15000, image: 'phone.png' },
        { name: 'Men\'s Suit', price: 12000, image: 'suit.png' },
        { name: 'Soda', price: 100, image: 'soda.png' }
    ];

    // Create and duplicate product cards for infinite scroll
    let cardsHTML = '';
    
    // Create first set of cards
    products.forEach(product => {
        cardsHTML += `
            <div class="featured-card" onclick="window.location.href='cart.html'">
                <img src="${product.image}" alt="${product.name}" class="featured-image">
                <div class="featured-info">
                    <h3 class="featured-name">${product.name}</h3>
                    <div class="featured-price">KSh ${product.price}</div>
                </div>
            </div>
        `;
    });
    
    // Duplicate cards for infinite scroll
    cardsHTML = cardsHTML + cardsHTML;
    
    // Insert into DOM
    featuredTrack.innerHTML = cardsHTML;

    // Add smooth scroll effect when clicking Shop Now
    const shopNowBtn = document.querySelector('.shop-now-btn');
    
    shopNowBtn.addEventListener('click', function(e) {
        // Optional: Add any click animations or effects here
    });

    // Animated text typing effect for welcome message
    const welcomeMessage = "Welcome to UzaPoint - Your Premier Shopping Destination";
    const welcomeHeading = document.querySelector('.home-content h1');
    welcomeHeading.textContent = '';

    let charIndex = 0;
    function typeWelcome() {
        if (charIndex < welcomeMessage.length) {
            welcomeHeading.textContent += welcomeMessage.charAt(charIndex);
            charIndex++;
            
            // Vary the typing speed slightly for more natural effect
            const randomDelay = Math.random() * (150 - 50) + 50;
            setTimeout(typeWelcome, randomDelay);
        } else {
            // Add a subtle fade-in effect after typing
            welcomeHeading.style.transition = 'all 0.5s ease';
            welcomeHeading.style.opacity = '1';
            welcomeHeading.style.transform = 'scale(1.02)';
        }
    }

    // Start typing with initial delay
    setTimeout(() => {
        welcomeHeading.style.opacity = '0';
        typeWelcome();
    }, 500);

    // Shop Now Button Effects
    const shopButton = document.querySelector('.shop-now-btn');
    const cartIcon = shopButton.querySelector('.cart-icon');
    
    shopButton.addEventListener('mouseover', function() {
        // Add cart shake animation
        cartIcon.style.animation = 'cartBounce 0.8s ease infinite';
        
        // Add button pulse effect
        this.classList.add('pulse');
    });

    shopButton.addEventListener('mouseout', function() {
        cartIcon.style.animation = '';
        this.classList.remove('pulse');
    });

    // Add click effect
    shopButton.addEventListener('click', function(e) {
        // Create ripple effect
        let ripple = document.createElement('span');
        ripple.classList.add('ripple');
        this.appendChild(ripple);

        // Position the ripple
        let x = e.clientX - e.target.offsetLeft;
        let y = e.clientY - e.target.offsetTop;
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';

        // Remove ripple after animation
        setTimeout(() => ripple.remove(), 1000);
    });

    // Scroll-based animations
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        // Parallax effect for background
        const homeSection = document.querySelector('.home-section');
        homeSection.style.backgroundPositionY = scrollPosition * 0.5 + 'px';

        // Fade effects for content based on scroll
        const homeContent = document.querySelector('.home-content');
        if (scrollPosition > 100) {
            homeContent.style.opacity = 1 - (scrollPosition - 100) / 300;
        } else {
            homeContent.style.opacity = 1;
        }
    });

    // Logo typing animation
    const logoText = document.querySelector('.logo-text');
    const logoTextContent = 'UzaPoint';
    let logoCharIndex = 0;

    function typeLogo() {
        if(logoCharIndex < logoTextContent.length) {
            logoText.textContent += logoTextContent.charAt(logoCharIndex);
            logoCharIndex++;
            setTimeout(typeLogo, 150);
        } else {
            // Start cart animation after typing
            startCartAnimation();
        }
    }

    // Cart animation and reveal elements
    function startCartAnimation() {
        const cart = document.querySelector('.cart-animate');
        
        // Drop animation
        cart.style.animation = 'dropCart 1s forwards';

        // After drop, start moving
        setTimeout(() => {
            cart.style.animation = 'moveCart 1.5s forwards';
            revealElements();
        }, 1000);
    }

    // Reveal header elements sequentially
    function revealElements() {
        const elements = [
            ...document.querySelectorAll('.nav-link'),
            ...document.querySelectorAll('.icon-wrapper')
        ];

        elements.forEach((element, index) => {
            setTimeout(() => {
                element.style.animation = 'fadeInUp 0.5s forwards';
                element.classList.remove('hidden');
            }, index * 200); // 200ms delay between each element
        });
    }

    // Add hover effects for nav items
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.color = 'var(--navy-blue)';
        });

        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.color = '';
        });
    });

    // Start the animation sequence
    setTimeout(() => {
        typeLogo();
    }, 500);

    // Optional: Add click effects
    document.querySelectorAll('.icon-wrapper').forEach(icon => {
        icon.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
        });
    });

    const sectionTitle = document.querySelector('.section-title');
    
    // Smooth entrance animation
    sectionTitle.style.opacity = '0';
    sectionTitle.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        sectionTitle.style.transition = 'all 0.8s ease';
        sectionTitle.style.opacity = '1';
        sectionTitle.style.transform = 'translateY(0)';
    }, 300);

    // Interactive hover effect
    sectionTitle.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.02)';
    });

    sectionTitle.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });

    // Click effect
    sectionTitle.addEventListener('click', function() {
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });

    const track = document.querySelector('.featured-track');
    
    // Clone all cards for infinite scroll
    const cards = track.querySelectorAll('.product-card');
    cards.forEach(card => {
        const clone = card.cloneNode(true);
        track.appendChild(clone);
    });

    // Optional: Smooth pause/resume
    track.addEventListener('mouseenter', () => {
        track.style.animationPlayState = 'paused';
    });

    track.addEventListener('mouseleave', () => {
        track.style.animationPlayState = 'running';
    });

    // Add to Cart functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent card hover effect
            // Add your cart functionality here
            button.textContent = 'Added!';
            setTimeout(() => {
                button.textContent = 'Add to Cart';
            }, 1000);
        });
    });

    // For Featured Section - Clone cards for infinite scroll
    if(document.querySelector('.featured-track')) {
        const track = document.querySelector('.featured-track');
        const cards = track.querySelectorAll('.product-card');
        cards.forEach(card => {
            const clone = card.cloneNode(true);
            track.appendChild(clone);
        });
    }

    // Handle Add to Cart clicks
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent navigation to shopping page
            e.stopPropagation(); // Prevent card click
            
            button.textContent = 'Added!';
            setTimeout(() => {
                button.textContent = 'Add to Cart';
            }, 1000);
            
            // Add your cart functionality here
        });
    });

    // Handle card clicks (navigation to shopping page)
    document.querySelectorAll('.card-link').forEach(card => {
        card.addEventListener('click', () => {
            window.location.href = 'shopping.html';
        });
    });

    const typingText = document.querySelector('.typing-text');
    let i = 0;

    function type() {
        if (i < welcomeMessage.length) {
            typingText.textContent += welcomeMessage.charAt(i);
            i++;
            setTimeout(type, 100); // Typing speed
        }
    }

    // Start typing animation
    setTimeout(type, 1000); // Delay before starting

    // Add these functions to your existing script.js

    function addToCart(button) {
        const productCard = button.closest('.product-card');
        const product = {
            id: Date.now().toString(),
            name: productCard.querySelector('.product-name').textContent,
            price: productCard.querySelector('.product-price').textContent,
            image: productCard.querySelector('.product-img').src,
            quantity: 1
        };

        // Add success animation
        button.classList.add('success');
        
        // Get existing cart items
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        
        // Add new item
        cartItems.push(product);
        
        // Save to localStorage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        
        // Update cart count
        updateCartCount();

        // Reset button after 2 seconds
        setTimeout(() => {
            button.classList.remove('success');
        }, 2000);
    }

    // Show notification function
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-check-circle"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.getElementById('notification-container').appendChild(notification);

        // Add show class after a small delay (for animation)
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // Update cart count in header
    function updateCartCount() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            cartCount.textContent = cartItems.length;
        }
    }

    // Initialize cart count when page loads
    document.addEventListener('DOMContentLoaded', () => {
        updateCartCount();
    });

    // Update card click functionality
    document.querySelectorAll('.featured-card').forEach(card => {
        card.addEventListener('click', () => {
            window.location.href = 'cart.html';
        });
    });

    // Add this to your existing script.js
    function addToCart(button) {
        const productCard = button.closest('.product-card');
        const product = {
            id: Date.now().toString(),
            name: productCard.querySelector('.product-name').textContent,
            price: productCard.querySelector('.product-price').textContent,
            image: productCard.querySelector('.product-img').src,
            quantity: 1
        };

        // Get existing cart items
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        
        // Add new item
        cartItems.push(product);
        
        // Save to localStorage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        
        // Show confirmation
        alert('Item added to cart!');
    }

    // Add click listeners to all "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', () => addToCart(button));
    });

    // This function runs when someone clicks "Add to Cart"
    function addToCart(button) {
        // Find the product details
        const productCard = button.closest('.product-card');
        const product = {
            name: productCard.querySelector('.product-name').textContent,
            price: productCard.querySelector('.product-price').textContent,
            image: productCard.querySelector('.product-img').src,
            quantity: 1
        };

        // Save to cart
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        cartItems.push(product);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        
        // Show message
        alert('Added to cart!');
    }

    // Add this to your existing script.js
    function addToCart(productId) {
        // Find the product from your products object
        let product = null;
        Object.values(products).forEach(category => {
            const found = category.find(p => p.id === productId);
            if (found) product = found;
        });

        if (!product) return;

        // Create cart item
        const cartItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        };

        // Get existing cart items
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        
        // Add new item
        cartItems.push(cartItem);
        
        // Save to localStorage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        
        // Show confirmation
        alert('Added to cart!');
        
        // Redirect to cart page
        window.location.href = 'cart.html';
    }
}); 