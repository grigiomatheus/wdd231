import { getProducts } from "./products.js";

async function getCartProducts() {
  const products = await getProducts();

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  var processedProducts = cart.map((item) => {
    const product = products.find((product) => product.id == item.id);
    product.quantity = item.quantity;
    product.unitPrice = product.price;
    product.totalPrice = product.price * item.quantity;

    return product;
  });

  return processedProducts;
}

function displayCartProducts(products) {
  const container = document.getElementById("cart-products");
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
                  <p>Quantity: ${product.quantity}</p>
                  <p>Unit price: $${product.unitPrice}</p>
                  <p>Total price: $${product.totalPrice}</p>
                  <button class="remove-button">Remove</button>
              </div>
          `;
    container.innerHTML += productCard;
  });

  configureRemoveButton();
}

function configureRemoveButton() {
    const removeButtons = document.querySelectorAll(".remove-button");

    removeButtons.forEach((button) => {
        button.addEventListener("click", async (event) => {
            const itemId = event.currentTarget.parentNode.querySelector("span").textContent;
            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            const itemIndex = cart.findIndex((item) => item.id == itemId);
            if (itemIndex > -1) {
                cart[itemIndex].quantity--;

                if (cart[itemIndex].quantity <= 0) {
                    cart.splice(itemIndex, 1);
                }

                localStorage.setItem("cart", JSON.stringify(cart));
                await display();
            }
        });
    });
}

function displayNoResults() {
  const container = document.getElementById("cart-products");

  container.innerHTML = "";

  const h2Element = document.createElement("h2");
  h2Element.id = "empty-cart-message";
  h2Element.textContent = "Your cart is empty.";

  container.appendChild(h2Element);
}

function displaySummary(products) {
    const container = document.getElementById("cart-summary");

    if (products.length === 0) {
        container.hidden = true;
        return;
    }

    container.innerHTML = "";
    container.hidden = false;

    const total = products.reduce((acc, product) => acc + product.totalPrice, 0);
    
    const h2Element = document.createElement("h2");
    h2Element.textContent = "Summary";
    
    const totalElement = document.createElement("p");
    totalElement.textContent = `Total: $${total.toFixed(2)}`;

    const checkoutButton = document.createElement("button");
    checkoutButton.textContent = "Checkout";
    
    container.appendChild(h2Element);
    container.appendChild(totalElement);
    container.appendChild(checkoutButton);
}

async function display() {
  const products = await getCartProducts();

  if (products.length === 0) {
    displayNoResults();
  } else {
    displayCartProducts(products);
  }

  displaySummary(products);
}

(function () {
  display();
})();
