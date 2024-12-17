// Product data with categories
const products = {
    food: [
        {
            id: 'f1',
            name: "Mabuyu",
            price: 50,
            category: "food",
            image: "mabuyu.png",
            description: "Sweet-sour baobab candy"
        },
        {
            id: 'f2',
            name: "Doritos",
            price: 200,
            category: "food",
            image: "doritos.png",
            description: "Nacho cheese flavored chips"
        },
        {
            id: 'f3',
            name: "Soko Flour",
            price: 180,
            category: "food",
            image: "sokoflour.png",
            description: "Premium maize flour"
        },
        {
            id: 'f4',
            name: "Pishori Rice",
            price: 250,
            category: "food",
            image: "pishoririce.png",
            description: "Aromatic long-grain rice"
        },
        {
            id: 'f5',
            name: "Royco Mchuzi Mix",
            price: 25,
            category: "food",
            image: "royco.png",
            description: "Food seasoning"
        },
        {
            id: 'f6',
            name: "Tropical Heat Chips",
            price: 100,
            category: "food",
            image: "tropicalheat.png",
            description: "Spicy potato crisps"
        },
        {
            id: 'f7',
            name: "Mumias Sugar",
            price: 150,
            category: "food",
            image: "mumiassugar.png",
            description: "Pure refined sugar"
        },
        {
            id: 'f8',
            name: "Indomie Noodles",
            price: 35,
            category: "food",
            image: "indomie.png",
            description: "Instant noodles"
        },
        {
            id: 'f9',
            name: "Ajab Flour",
            price: 190,
            category: "food",
            image: "ajabflour.png",
            description: "Premium wheat flour"
        },
        {
            id: 'f10',
            name: "Kimbo",
            price: 280,
            category: "food",
            image: "kimbo.png",
            description: "Cooking fat"
        },
        {
            id: 'f11',
            name: "Weetabix",
            price: 320,
            category: "food",
            image: "weetabix.png",
            description: "Whole grain breakfast cereal"
        },
        {
            id: 'f12',
            name: "Blue Band",
            price: 200,
            category: "food",
            image: "blueband.png",
            description: "Margarine spread"
        },
        {
            id: 'f13',
            name: "Proctor Silos Rice",
            price: 230,
            category: "food",
            image: "proctorrice.png",
            description: "Premium long grain rice"
        },
        {
            id: 'f14',
            name: "Farmers Choice Sausages",
            price: 280,
            category: "food",
            image: "sausages.png",
            description: "Pork sausages"
        },
        {
            id: 'f15',
            name: "Pembe Flour",
            price: 170,
            category: "food",
            image: "pembeflour.png",
            description: "Maize flour"
        },
        {
            id: 'f16',
            name: "Broadways Bread",
            price: 55,
            category: "food",
            image: "broadways.png",
            description: "Fresh sliced bread"
        },
        {
            id: 'f4',
            name: 'Achari',
            price: 50,
            category: 'food',
            image: 'achari.png',
            description: "Aromatic long-grain rice"
        }
    ],
    electronics: [
        {
            id: 'e1',
            name: "Wireless Earbuds",
            price: 2500,
            category: "electronics",
            image: "earbuds.png",
            description: "High-quality wireless earbuds"
        },
        {
            id: 'e4',
            name: 'Smartphone',
            price: 15000,
            category: 'electronics',
            image: 'phone.png',
            description: "High-end smartphone"
        },
        // ... add remaining electronics items to reach 16 total
    ],
    clothing: [
        {
            id: 'c1',
            name: "Traditional Dress",
            price: 3500,
            category: "clothing",
            image: "traditionaldress.png",
            description: "Handmade traditional dress"
        },
        {
            id: 'c4',
            name: 'Men\'s Suit',
            price: 12000,
            category: 'clothing',
            image: 'suit.png',
            description: "Elegant men's suit"
        },
        // ... add remaining clothing items to reach 16 total
    ],
    drinks: [
        {
            id: 'd1',
            name: "Tusker Beer",
            price: 250,
            category: "drinks",
            image: "tusker.png",
            description: "Classic Kenyan beer"
        },
        {
            id: 'd4',
            name: 'Soda',
            price: 100,
            category: 'drinks',
            image: 'soda.png',
            description: "Carbonated soft drink"
        },
        // ... add remaining drinks items to reach 16 total
    ]
};

// Get all products function
function getAllProducts() {
    let allProducts = [];
    Object.values(products).forEach(category => {
        allProducts = allProducts.concat(category);
    });
    return allProducts;
}

const itemsPerPage = 16; // 4x4 grid
let currentPage = 1;

function renderProducts(category = 'all') {
    const productsGrid = document.getElementById('products-grid');
    productsGrid.innerHTML = '';

    let productsList = category === 'all' 
        ? getAllProducts()
        : products[category] || [];

    // Randomize products for 'all' category
    if (category === 'all') {
        productsList = productsList.sort(() => Math.random() - 0.5);
    }

    const totalPages = Math.ceil(productsList.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentProducts = productsList.slice(startIndex, endIndex);

    currentProducts.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.name}" 
                     onerror="this.src='placeholder.png'" 
                     class="product-image">
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">KSh ${product.price}</div>
                <div class="product-buttons">
                    <button class="button button-primary" onclick="addToCart('${product.id}')">
                        Add to Cart
                    </button>
                    <button class="button button-secondary" onclick="buyNow('${product.id}')">
                        Buy Now
                    </button>
                </div>
            </div>
        `;
        productsGrid.appendChild(card);
    });

    // Only show pagination if there are more than 16 items
    if (productsList.length > itemsPerPage) {
        renderPagination(totalPages, category);
    }
}

function renderPagination(totalPages, category) {
    const pagination = document.createElement('div');
    pagination.className = 'pagination';

    // Previous page button
    if (currentPage > 1) {
        const prevButton = document.createElement('button');
        prevButton.className = 'page-button';
        prevButton.textContent = 'Previous Page';
        prevButton.onclick = () => {
            currentPage--;
            renderProducts(category);
            window.scrollTo(0, 0);
        };
        pagination.appendChild(prevButton);
    }

    // Next page button
    if (currentPage < totalPages) {
        const nextButton = document.createElement('button');
        nextButton.className = 'page-button';
        nextButton.textContent = 'Next Page';
        nextButton.onclick = () => {
            currentPage++;
            renderProducts(category);
            window.scrollTo(0, 0);
        };
        pagination.appendChild(nextButton);
    }

    document.getElementById('products-grid').after(pagination);
}

// Initialize products when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
});

// Category filter functionality
document.querySelectorAll('.category-btn').forEach(button => {
    button.addEventListener('click', () => {
        // Reset pagination
        currentPage = 1;
        
        // Remove active class from all buttons
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Filter products
        renderProducts(button.dataset.category);
    });
});

// Add to Cart functionality
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
    
    // Update cart count
    updateCartCount();
    
    // Show confirmation
    alert('Added to cart!');
}

// Update cart count in header
function updateCartCount() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = cartItems.length;
    }
}

// Category filter functionality
document.querySelectorAll('.category-btn').forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        const category = button.dataset.category;
        filterProducts(category);
    });
});

function filterProducts(category) {
    const products = document.querySelectorAll('.product-card');
    products.forEach(product => {
        if (category === 'all' || product.dataset.category === category) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
}); 