let products = []; // JSON data will be loaded here
let currentIndex = 0;
let filteredProducts = [];
const itemsPerLoad = 20;
const productClass = "product col"
const placeholderImage = "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-collection-4_large.png?v=1530129177"

// Function to fetch products
async function fetchProducts() {
    try {
        const response = await fetch('https://codequillskills.github.io/ff_fresh/assets/products.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const products = await response.json();
        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

// Function to render products
function renderProducts(productsToRender, startIndex, endIndex) {
    const container = document.getElementById('product-container');
    for (let i = startIndex; i < endIndex && i < productsToRender.length; i++) {
        const product = productsToRender[i];
        const productElement = document.createElement('div');
        productElement.className = productClass;
        productElement.innerHTML = `
            <div class="product-image ratio ratio-1x1"><img class="object-fit-contain w-full" src="${product['img link'] || placeholderImage}" alt=""></div>
            <div class="product-title text-center h4 mt-4 fw-bold"  style="color: #753617;">${product.Name}</div>
            <div class="product-price text-center h1 mt-1 fw-bold" style="color: #729e3d;">₹${product["Selling Price"]}</div>
            <div class="product-description text-center mt-1">${product.Description}</div>
        `;
        container.appendChild(productElement);
    }
}

// Function to load more products
function loadMore() {
    const startIndex = currentIndex;
    const endIndex = currentIndex + itemsPerLoad;
    renderProducts(filteredProducts, startIndex, endIndex);
    currentIndex = endIndex;

    if (currentIndex >= filteredProducts.length) {
        document.getElementById('loadMore').style.display = 'none';
    } else {
        document.getElementById('loadMore').style.display = 'initial';
    }
}

// Function to filter products based on search query
function filterProducts(query) {
    return products.filter(product =>
        product.Name.toLowerCase().includes(query.toLowerCase()) ||
        product.Description.toLowerCase().includes(query.toLowerCase())
    );
}

// Function to handle search
function handleSearch() {
    const searchQuery = document.getElementById('searchInput').value;
    const container = document.getElementById('product-container');
    filteredProducts = filterProducts(searchQuery);
    currentIndex = 0;
    container.innerHTML = ''; // Clear existing products
    loadMore();
}


// Initialize
async function init() {
    products = await fetchProducts();
    filteredProducts = products;
    loadMore();
    document.getElementById('loadMore').addEventListener('click', loadMore);
    document.getElementById('searchInput').addEventListener('input', handleSearch);
}

init();
