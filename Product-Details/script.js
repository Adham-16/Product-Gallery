const productId = new URLSearchParams(window.location.search).get("id");
console.log("Product ID:", productId);

let currentImageIndex = 0;
let product = null;

// Fetch the product details based on ID
axios
  .get(`https://dummyjson.com/products/${productId}`)
  .then((response) => {
    product = response.data;
    displayProductDetails();
  })
  .catch((error) => {
    console.error("Error fetching product data:", error);
  });

// Display product details
function displayProductDetails() {
  // Check if data is available
  if (!product) return;

  // Set product details
  document.getElementById("productTitle").textContent =
    product.title || "No title available";
  document.getElementById("productPrice").textContent = product.price || "N/A";
  document.getElementById("productDescription").textContent =
    product.description || "No description available";
  document.getElementById("productCategory").textContent =
    product.category || "No category available";
  document.getElementById("productDiscount").textContent =
    product.discountPercentage
      ? `${product.discountPercentage}%`
      : "No discount";
  document.getElementById("productRating").textContent =
    product.rating || "N/A";
  document.getElementById("productStock").textContent =
    product.stock || "Out of stock";
  document.getElementById("productWarranty").textContent =
    product.warrantyInformation || "No warranty information";
  document.getElementById("productShipping").textContent =
    product.shippingInformation || "No shipping info available";
  document.getElementById("productAvailability").textContent =
    product.availabilityStatus ? "In stock" : "Out of stock";
  document.getElementById("productReturnPolicy").textContent =
    product.returnPolicy || "No return policy";
  document.getElementById("productMinOrder").textContent =
    product.minimumOrderQuantity || "N/A";

  // Display product images
  const imageContainer = document.getElementById("imageSlider");
  if (product.images && product?.images.length > 0) {
    product.images.forEach((image, index) => {
      const imgElement = document.createElement("img");
      imgElement.src = image;
      imgElement.alt = product.title;
      if (index === currentImageIndex) imgElement.classList.add("active");
      imageContainer.appendChild(imgElement);
    });
  }
}

// Handle image slider change
function changeImage(direction) {
  const images = document.querySelectorAll("#imageSlider img");
  if (images.length > 1) {
    currentImageIndex =
      (currentImageIndex + direction + images.length) % images.length;
    images.forEach((img, index) => {
      img.classList.remove("active");
      if (index === currentImageIndex) img.classList.add("active");
    });
  }
}
