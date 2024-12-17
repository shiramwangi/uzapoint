class ShoppingCart {
    constructor() {
        this.cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        this.shippingFee = 0;
        this.discount = 0;
        this.init();
    }

    init() {
        this.renderCart();
        this.setupEventListeners();
        this.updateTotals();
    }

    setupEventListeners() {
        // Quantity buttons
        document.querySelectorAll('.qty-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const itemId = e.target.closest('.cart-item').dataset.id;
                const change = e.target.classList.contains('minus') ? -1 : 1;
                this.updateQuantity(itemId, change);
            });
        });

        // Remove buttons
        document.querySelectorAll('.remove-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const itemId = e.target.closest('.cart-item').dataset.id;
                this.removeItem(itemId);
            });
        });

        // Shipping calculator
        document.querySelector('.shipping-select').addEventListener('change', (e) => {
            this.calculateShipping(e.target.value);
        });

        // Coupon code
        document.querySelector('.apply-btn').addEventListener('click', () => {
            this.applyCoupon();
        });

        // Checkout button
        document.querySelector('.checkout-btn').addEventListener('click', () => {
            this.proceedToCheckout();
        });
    }

    renderCart() {
        const cartContainer = document.querySelector('.cart-items');
        if (!this.cartItems.length) {
            cartContainer.innerHTML = `
                <div class="empty-cart">
                    <img src="src/images/empty-cart.png" alt="Empty Cart">
                    <p>Your cart is empty</p>
                    <a href="shopping.html" class="continue-shopping">Continue Shopping</a>
                </div>
            `;
            return;
        }

        cartContainer.innerHTML = this.cartItems.map(item => this.generateCartItemHTML(item)).join('');
        this.updateItemsCount();
    }

    generateCartItemHTML(item) {
        return `
            <div class="cart-item" data-id="${item.id}">
                <div class="item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p class="item-price">KSh ${item.price}</p>
                    <div class="quantity-controls">
                        <button class="qty-btn minus" ${item.quantity <= 1 ? 'disabled' : ''}>-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="qty-btn plus">+</button>
                    </div>
                </div>
                <button class="remove-btn">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
    }

    updateQuantity(itemId, change) {
        const itemIndex = this.cartItems.findIndex(item => item.id === itemId);
        if (itemIndex === -1) return;

        const newQuantity = this.cartItems[itemIndex].quantity + change;
        if (newQuantity < 1) return;

        this.cartItems[itemIndex].quantity = newQuantity;
        this.saveCart();
        this.renderCart();
        this.updateTotals();

        // Add animation
        const quantitySpan = document.querySelector(`[data-id="${itemId}"] .quantity`);
        quantitySpan.classList.add('quantity-changed');
        setTimeout(() => quantitySpan.classList.remove('quantity-changed'), 300);
    }

    removeItem(itemId) {
        const itemElement = document.querySelector(`[data-id="${itemId}"]`);
        itemElement.classList.add('removing');

        setTimeout(() => {
            this.cartItems = this.cartItems.filter(item => item.id !== itemId);
            this.saveCart();
            this.renderCart();
            this.updateTotals();
        }, 300);
    }

    calculateShipping(location) {
        const shippingRates = {
            'nairobi': 200,
            'mombasa': 400,
            'kisumu': 350
        };
        this.shippingFee = shippingRates[location] || 0;
        this.updateTotals();
    }

    applyCoupon() {
        const couponInput = document.querySelector('.coupon-input input');
        const couponCode = couponInput.value.trim().toUpperCase();
        
        const validCoupons = {
            'WELCOME10': 10,
            'SAVE20': 20,
            'FLASH50': 50
        };

        if (validCoupons[couponCode]) {
            this.discount = validCoupons[couponCode];
            this.showNotification('Coupon applied successfully!', 'success');
        } else {
            this.showNotification('Invalid coupon code', 'error');
        }
        this.updateTotals();
    }

    updateTotals() {
        const subtotal = this.cartItems.reduce((total, item) => 
            total + (item.price * item.quantity), 0);
        const discountAmount = (subtotal * this.discount) / 100;
        const total = subtotal + this.shippingFee - discountAmount;

        document.querySelector('.subtotal').textContent = `KSh ${subtotal.toFixed(2)}`;
        document.querySelector('.shipping-fee').textContent = 
            this.shippingFee ? `KSh ${this.shippingFee.toFixed(2)}` : 'Free';
        document.querySelector('.discount').textContent = 
            this.discount ? `- KSh ${discountAmount.toFixed(2)}` : 'No discount';
        document.querySelector('.final-total').textContent = `KSh ${total.toFixed(2)}`;
    }

    updateItemsCount() {
        const totalItems = this.cartItems.reduce((total, item) => total + item.quantity, 0);
        document.querySelector('.items-count').textContent = 
            `${totalItems} item${totalItems !== 1 ? 's' : ''} in your bag`;
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 300);
            }, 2000);
        }, 100);
    }

    saveCart() {
        localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    }

    proceedToCheckout() {
        if (!this.cartItems.length) {
            this.showNotification('Your cart is empty', 'error');
            return;
        }
        // Add your checkout logic here
        window.location.href = 'checkout.html';
    }
}

// Initialize cart when page loads
document.addEventListener('DOMContentLoaded', () => {
    const cart = new ShoppingCart();
}); 