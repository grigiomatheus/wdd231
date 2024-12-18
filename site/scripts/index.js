import { getProducts } from "./products.js";

function filterProducts(products, query) {
  return products.filter((product) =>
    product.title.toLowerCase().includes(query.toLowerCase())
  );
}

function displayProducts(products) {
  const container = document.getElementById("products-section");
  container.innerHTML = "";

  products.forEach((product) => {
    const productCard = `
            <div class="product-card">
                <span hidden>${product.id}</span>
                <h3>${product.title}</h3>
                <div class="image-container">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                </div>
                <p>${product.description}</p>
                <p class="product-price">$${product.price}</p>
                <button class="buy-button">Buy</button>
            </div>
        `;
    container.innerHTML += productCard;
  });

  configureBuyButtons();
}

function configureBuyButtons() {
  const buyButtons = document.querySelectorAll(".buy-button");

  buyButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const dialog = document.querySelector("dialog");
      dialog.showModal();
      addToCart(event);
    });
  });
}

function addToCart(event) {
    const itemId = event.currentTarget.parentNode.querySelector("span").textContent;
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const cartItem = cart.find((item) => item.id === itemId);

    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ id: itemId, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
}

function displayNoResults() {
  const container = document.getElementById("products-section");

  container.innerHTML = "";

  const h2Element = document.createElement("h2");
  h2Element.id = "no-results";
  h2Element.textContent = "Sorry! We couldn't find this product.";

  container.appendChild(h2Element);
}

async function searchProducts() {
  const query = document.getElementById("search-input").value;
  const products = await getProducts();
  const filteredProducts = filterProducts(products, query);

  if (filteredProducts.length) {
    displayProducts(filteredProducts);
  } else {
    displayNoResults();
  }
}

document
  .querySelector("#search-button")
  .addEventListener("click", async () => await searchProducts());

document
  .querySelector("#search-input")
  .addEventListener("keyup", async (event) => {
    if (event.key === "Enter") {
      await searchProducts();
    }
  });

document.getElementById("close-dialog").addEventListener("click", () => {
  const dialog = document.querySelector("dialog");
  dialog.close();
});

document.querySelector("#search-button").click();
document.querySelector("#search-input").focus();
