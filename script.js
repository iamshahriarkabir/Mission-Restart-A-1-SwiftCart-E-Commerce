// Global Variables
const API_URL = "https://fakestoreapi.com/products";
const CATEGORIES_URL = "https://fakestoreapi.com/products/categories";
let cart = []; 
let allProducts = [];

// DOM Elements
const productContainer = document.getElementById("product-container");
const categoryContainer = document.getElementById("category-filters");
const trendingContainer = document.getElementById("trending-products"); 
const loadingSpinner = document.getElementById("loading-spinner");
const cartCountElement = document.getElementById("cart-count"); 

// Page Load Initialization
document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Feather Icon
    if(typeof feather !== 'undefined') {
        feather.replace();
    }

    // 2. Cart Load for all pages
    const storedCart = localStorage.getItem("swiftCart");
    if (storedCart) {
        cart = JSON.parse(storedCart);
        updateCartCount();
    }

    // 3.Page specific function call to avoid errors
    const categoryContainer = document.getElementById("category-filters");
    if (categoryContainer) {
        
        fetchCategories();
        fetchProducts('all'); 
    }

    const trendingContainer = document.getElementById("trending-products");
    if (trendingContainer) {
        
        loadTrending();
    }
});

// 1. Fetch Categories
async function fetchCategories() {
    try {
        const res = await fetch(CATEGORIES_URL);
        const categories = await res.json();
        
        let categoryHTML = `<button onclick="fetchProducts('all')" class="btn btn-sm btn-active btn-primary rounded-full px-6 category-btn">All</button>`;
        
        categories.forEach(cat => {
            // ⚠️ FIX: Escape apostrophe for onclick (men's clothing -> men\'s clothing)
            const safeCat = cat.replace(/'/g, "\\'"); 
            categoryHTML += `<button onclick="fetchProducts('${safeCat}')" class="btn btn-sm btn-ghost bg-gray-100 rounded-full px-6 category-btn capitalize">${cat}</button>`;
        });
        
        categoryContainer.innerHTML = categoryHTML;
    } catch (error) {
        console.error("Error categories:", error);
    }
}

// 2. Fetch Products (Main Grid)
async function fetchProducts(category) {
    loadingSpinner.classList.remove("hidden");
    productContainer.innerHTML = "";
    
    // Active Button Logic
    const buttons = document.querySelectorAll(".category-btn");
    buttons.forEach(btn => {
        // Remove active class from all
        btn.classList.remove("btn-primary", "btn-active", "text-white");
        btn.classList.add("btn-ghost", "bg-gray-100");
        
        // Add active class to clicked one
        if(btn.innerText.toLowerCase() === category.toLowerCase() || (category === 'all' && btn.innerText === 'All')) {
            btn.classList.remove("btn-ghost", "bg-gray-100");
            btn.classList.add("btn-primary", "btn-active", "text-white");
        }
    });

    let url = API_URL;
    if (category !== 'all') {
        url = `${API_URL}/category/${category}`;
    }

    try {
        const res = await fetch(url);
        const products = await res.json();
        displayProducts(products);
    } catch (error) {
        console.error("Error products:", error);
        productContainer.innerHTML = "<p class='text-red-500'>Failed to load data.</p>";
    } finally {
        loadingSpinner.classList.add("hidden");
    }
}

// ✅ 3. Display Products (Main Grid)
function displayProducts(products) {
    if (products.length === 0) {
        productContainer.innerHTML = "<p>No products found.</p>";
        return;
    }

    productContainer.innerHTML = products.map(product => createCardHTML(product)).join('');
    
    // Re-initialize icons for new elements
    if(typeof feather !== 'undefined') feather.replace();
}

// ✅ 4. Load Trending (One from each of the 4 categories)
async function loadTrending() {
    try {
        const res = await fetch(API_URL); 
        const products = await res.json();
        
        // Categories we want
        const targetCategories = ["electronics", "jewelery", "men's clothing", "women's clothing"];
        let trendingHTML = "";

        targetCategories.forEach(cat => {
            // Find the first product of this category
            const product = products.find(p => p.category === cat);
            if (product) {
                trendingHTML += createCardHTML(product);
            }
        });

        trendingContainer.innerHTML = trendingHTML;
        if(typeof feather !== 'undefined') feather.replace();

    } catch (error) {
        console.error("Error trending:", error);
        trendingContainer.innerHTML = "<p class='text-red-500'>Failed to load trending items.</p>";
    }
}

// Helper: Create HTML for a Single Card (Reusable)
function createCardHTML(product) {
    return `
    <div class="card bg-white shadow-sm hover:shadow-xl transition duration-300 group border border-gray-100">
        <figure class="px-6 pt-6 bg-gray-50 h-64 flex items-center justify-center m-4 rounded-xl group-hover:bg-violet-50 transition relative">
            <img src="${product.image}" alt="${product.title}" class="h-40 object-contain mix-blend-multiply" />
        </figure>
        <div class="card-body px-6 pb-6 pt-0">
            <div class="badge bg-violet-100 text-primary border-none text-xs font-semibold px-3 py-2 mb-2 capitalize">${product.category}</div>
            <h2 class="card-title text-base font-bold text-gray-800 h-12 overflow-hidden" title="${product.title}">
                ${product.title.length > 25 ? product.title.slice(0, 25) + "..." : product.title}
            </h2>
            <div class="flex justify-between items-center mt-3">
                <span class="text-xl font-bold text-gray-900">$${product.price}</span>
                <div class="flex items-center text-yellow-500 text-sm gap-1">
                    <i data-feather="star" class="w-4 h-4 fill-current"></i> 
                    <span class="text-gray-500 font-medium">${product.rating.rate}</span>
                </div>
            </div>
            <div class="grid grid-cols-2 gap-3 mt-4">
                <button onclick="openModal(${product.id})" class="btn btn-outline border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900 btn-sm font-normal">Details</button>
                <button onclick="addToCart(${product.id})" class="btn btn-primary text-white btn-sm font-normal">Add</button>
            </div>
        </div>
    </div>
    `;
}

// ✅ 5. Modal & Cart Logic 
async function openModal(id) {
    const modal = document.getElementById("product_modal");
    const modalContent = document.getElementById("modal-content");
    modal.showModal();
    
    modalContent.innerHTML = `<div class="flex justify-center items-center h-64"><span class="loading loading-spinner text-primary"></span></div>`;

    try {
        const res = await fetch(`${API_URL}/${id}`);
        const product = await res.json();

        modalContent.innerHTML = `
            <div class="flex flex-col md:flex-row gap-6 md:gap-8 p-6 md:p-8 h-full">
                <div class="w-full md:w-1/2 flex justify-center items-center bg-gray-50 rounded-xl p-6 relative">
                    <img src="${product.image}" class="max-h-64 md:max-h-80 object-contain mix-blend-multiply" />
                </div>
                <div class="w-full md:w-1/2 flex flex-col justify-center">
                    <div class="badge bg-violet-100 text-primary mb-3 capitalize px-3 py-1">${product.category}</div>
                    <h3 class="text-2xl md:text-3xl font-bold mb-3 text-gray-900 leading-tight">${product.title}</h3>
                    <p class="text-gray-500 mb-6 leading-relaxed text-sm md:text-base max-h-40 overflow-y-auto scrollbar-thin">${product.description}</p>
                    <div class="flex items-center gap-4 mb-8">
                        <span class="text-4xl font-bold text-primary">$${product.price}</span>
                        <div class="flex items-center gap-1 text-yellow-500 font-bold bg-yellow-50 px-3 py-1 rounded-full">
                            <span>★</span> ${product.rating.rate} <span class="text-gray-400 font-normal">(${product.rating.count} reviews)</span>
                        </div>
                    </div>
                    <div class="flex gap-4">
                        <button onclick="addToCart(${product.id})" class="btn btn-primary flex-1 text-white">Add to Cart</button>
                        <form method="dialog"><button class="btn btn-outline flex-1">Close</button></form>
                    </div>
                </div>
            </div>
        `;
    } catch (e) { console.error(e); }
}

function addToCart(id) {
    fetch(`${API_URL}/${id}`).then(res => res.json()).then(product => {
        cart.push(product);
        updateCartCount();
        localStorage.setItem("swiftCart", JSON.stringify(cart));
        
        // Optional: Small toast animation or log
        const btn = event.target;
        const originalText = btn.innerText;
        btn.innerText = "Added!";
        setTimeout(() => btn.innerText = originalText, 1000);
    });
}

function updateCartCount() {
    if(cartCountElement) {
        cartCountElement.innerText = cart.length;
        cartCountElement.classList.add("scale-125");
        setTimeout(() => cartCountElement.classList.remove("scale-125"), 200);
    }
}

// ✅ Cart Modal Functions
function openCartModal() {
    document.getElementById("cart_modal").showModal();
    renderCartItems();
}

function renderCartItems() {
    const container = document.getElementById("cart-items-container");
    const totalEl = document.getElementById("cart-total-price");
    
    if (cart.length === 0) {
        container.innerHTML = `<div class="text-center py-10 text-gray-400">Your cart is empty</div>`;
        totalEl.innerText = "0.00";
        return;
    }

    let total = 0;
    container.innerHTML = cart.map((item, index) => {
        total += item.price;
        return `
        <div class="flex items-center gap-4 border-b pb-4 last:border-0">
            <img src="${item.image}" class="w-16 h-16 object-contain bg-gray-50 p-2 rounded-md">
            <div class="flex-1">
                <h4 class="font-bold text-sm text-gray-800 line-clamp-1">${item.title}</h4>
                <p class="text-primary font-bold">$${item.price}</p>
            </div>
            <button onclick="removeFromCart(${index})" class="btn btn-ghost btn-sm text-red-500 hover:bg-red-50">
                <i data-feather="trash-2" class="w-4 h-4"></i>
            </button>
        </div>`;
    }).join('');
    
    totalEl.innerText = total.toFixed(2);
    if(typeof feather !== 'undefined') feather.replace();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("swiftCart", JSON.stringify(cart));
    updateCartCount();
    renderCartItems();
}

function checkout() {
    if(cart.length === 0) return alert("Cart is empty!");
    alert("Order Placed Successfully!");
    cart = [];
    localStorage.removeItem("swiftCart");
    updateCartCount();
    document.getElementById("cart_modal").close();
}
