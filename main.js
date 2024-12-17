function addToCart(productCard) {
    const product = {
        id: Date.now().toString(), // Unique ID for each product
        name: productCard.querySelector('.product-name').textContent,
        price: parseFloat(productCard.querySelector('.product-price').textContent.replace('$', '')),
        image: productCard.querySelector('.product-image').src,
        quantity: 1
    };

    // Get existing cart items or initialize empty array
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    // Add new item
    cartItems.push(product);
    
    // Save to localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    
    // Update cart count in header
    updateCartCount();
    
    // Show confirmation message
    alert('Item added to cart!');
}

// Add click listeners to all "Add to Cart" buttons
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const productCard = e.target.closest('.product-card');
        addToCart(productCard);
    });
});

// Update cart count in header
function updateCartCount() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = cartItems.length;
    }
}

// Initialize cart count on page load
updateCartCount(); 