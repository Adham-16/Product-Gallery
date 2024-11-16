let currentPage = 1;
const limit = 10;
let allProducts = [];

window.onload = function () {
  getProducts();
};

function getProducts() {
  axios
    .get("https://dummyjson.com/products")
    .then((response) => {
      allProducts = response.data.products;
      displayProducts();
      updatePagination();
    })
    .catch((error) => console.error("Error fetching products:", error));
}

function displayProducts() {
  const productList = document.getElementById("productList");
  productList.innerHTML = "";

  const startIndex = (currentPage - 1) * limit;
  const endIndex = startIndex + limit;
  const productsToDisplay = allProducts.slice(startIndex, endIndex);

  productsToDisplay.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
      <img src="${product.thumbnail}" alt="${product.title}" width="100%">
      <h2>${product.title}</h2>
      <p>Price: $${product.price}</p>
      <button class="btn View-Details"  onclick="viewProduct(${product.id})">View Details</button>
      <div class="d-flex justify-content-between mt-3">
          <button class="btn btn-info" onclick="editProduct(${product.id})">Edit</button>
          <button class="btn btn-danger" onclick="deleteProduct(${product.id})">Delete</button>
      </div>

    `;
    productList.appendChild(productDiv);
  });
}

function searchProducts() {
  const query = document.getElementById("searchQuery").value.toLowerCase();
  const filteredProducts = allProducts.filter((product) =>
    product.title.toLowerCase().includes(query)
  );

  displaySearchResults(filteredProducts);
  updatePagination(filteredProducts.length);
}

function displaySearchResults(products) {
  const productList = document.getElementById("productList");
  productList.innerHTML = "";

  const startIndex = (currentPage - 1) * limit;
  const endIndex = startIndex + limit;
  const productsToDisplay = products.slice(startIndex, endIndex);

  productsToDisplay.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
      <img src="${product.thumbnail}" alt="${product.title}" width="100%">
      <h2>${product.title}</h2>
      <p>Price: $${product.price}</p>
      <button onclick="viewProduct(${product.id})">View Details</button>
      <button onclick="editProduct(${product.id})">Edit</button>
      <button onclick="deleteProduct(${product.id})">Delete</button>
    `;
    productList.appendChild(productDiv);
  });
}

function viewProduct(id) {
  location.href = `Product-Details/Details.html?id=${id}`;
}

function updatePagination(totalProducts = allProducts.length) {
  const paginationContainer = document.getElementById("pagination");
  paginationContainer.innerHTML = "";
  const totalPages = Math.ceil(totalProducts / limit);

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement("button");
    pageButton.innerText = i;
    pageButton.classList.add("page-btn");

    pageButton.addEventListener("click", () => {
      currentPage = i;
      displayProducts();
      updatePagination();
    });

    if (i === currentPage) {
      pageButton.classList.add("active");
    }

    paginationContainer.appendChild(pageButton);
  }
}

function editProduct(id) {
  const newTitle = prompt("Enter the new title:");
  if (newTitle) {
    axios
      .put(`https://dummyjson.com/products/${id}`, { title: newTitle })
      .then((response) => {
        allProducts = allProducts.map((product) =>
          product.id === id ? { ...product, title: newTitle } : product
        );
        displayProducts();
      })
      .catch((error) => console.error("Error updating product:", error));
  }
}

function deleteProduct(id) {
  if (confirm("Are you sure you want to delete this product?")) {
    axios
      .delete(`https://dummyjson.com/products/${id}`)
      .then(() => {
        allProducts = allProducts.filter((product) => product.id !== id);
        displayProducts();
        updatePagination();
      })
      .catch((error) => console.error("Error deleting product:", error));
  }
}

function openAddProductForm() {
  const title = prompt("Enter the product title:");
  const price = parseFloat(prompt("Enter the product price:"));

  if (title && price) {
    addProduct({ title, price });
  }
}

function addProduct(newProduct) {
  axios
    .post("https://dummyjson.com/products/add", newProduct)
    .then((response) => {
      allProducts.push(response.data);
      displayProducts();
      updatePagination();
    })
    .catch((error) => console.error("Error adding product:", error));
}
