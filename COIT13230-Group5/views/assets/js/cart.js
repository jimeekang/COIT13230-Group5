const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

const cartItemRow = document.querySelector(".table-row");
const clearAllBtn = document.querySelector(".cart-all_delete-btn");

const subtotalSpan = document.querySelectorAll(".summary p span")[0];
const shippingCost = document.querySelectorAll(".summary p span")[1];
const totalCost = document.querySelectorAll(".summary p span")[2];

let cartItemContent = "";
let totalPrice = 0;
let deliverCost = 20;

const checkoutBtn = document.querySelector(".checkout-btn");
const cancelBtn = document.querySelector(".cancel-btn");

//Product Item table
function cartProductList(products) {
  products.forEach(p => {
    cartItemContent += ` <tr>
    <th scope="row" >${p.id}</th>
    <td>${p.productName}</td>
    <td>${p.model}</td>
    <td>$${p.price}</td>
    <td>${p.quantity}</td>
    <td>${p.subtotalPrice}</td>
    <td><button class="item-delete-btn" data-product-id="${p.id}">Delete</button></td>
    </tr>`;
  });
  products.length > 0
    ? (cartItemRow.innerHTML = cartItemContent)
    : console.log("error");
}

cartProductList(cartItems);

// All delete data
function deleteAllProduct(products) {
  if (confirm("Are you sure you want to delete all cart items?")) {
    products.length = 0;
    cartItemRow.innerHTML = "";
    totalPrice = 0;
    subtotalSpan.textContent = `$${totalPrice}`;
    updateTotalAfterDiscount(totalPrice);
    localStorage.removeItem("cartItems");
  } else {
    // User canceled deletion
  }
}

clearAllBtn.addEventListener("click", () => {
  deleteAllProduct(cartItems);
});

// Delete one product
function deleteOneProduct(event, products) {
  if (event.target.classList.contains("item-delete-btn")) {
    const clickedButton = event.target;
    const itemId = clickedButton.dataset.productId;

    const productIndex = products.findIndex(p => p.id === parseInt(itemId));

    if (productIndex !== -1) {
      const removedProduct = products.splice(productIndex, 1)[0];
      console.log(removedProduct);

      totalPrice -= removedProduct.subtotalPrice;

      const tableRow = clickedButton.closest("tr");
      cartItemRow.removeChild(tableRow);

      // Update localStorage with remaining items
      localStorage.setItem("cartItems", JSON.stringify(products));

      // Update subtotal and total in UI
      subtotalSpan.textContent = `$${totalPrice}`;
      updateTotalAfterDiscount(totalPrice);
    }
  }
}

/**
function handleDelete(productId) {

  const indexToDelete = products.findIndex(
    product => product.id === parseInt(productId)
  );

document.querySelectorAll(".delete-btn").forEach(button => {
  button.addEventListener("click", () => {
    const productId = button
      .closest("tr")
      .querySelector("td:first-child").innerText;
    handleDelete(productId);
  });
});
 */

cartItemRow.addEventListener("click", event => {
  deleteOneProduct(event, cartItems);
});

// Get final total cost
cartItems.forEach(p => {
  const subtotalPrice = p.subtotalPrice;
  totalPrice += subtotalPrice;
});

subtotalSpan.textContent = `$${totalPrice}`;
updateTotalAfterDiscount(totalPrice);

function updateTotalAfterDiscount(currentTotalPrice) {
  let shippingPrice = currentTotalPrice >= 100 ? 0 : deliverCost;
  shippingCost.textContent = `$${shippingPrice}`;
  totalCost.textContent = `$${currentTotalPrice}`;
}

// check out to payment
checkoutBtn.addEventListener("click", () => {
  const cartData = {
    products: cartItems, // Array of product objects
    subtotal: totalPrice,
    shippingCost: totalPrice > 100 ? 0 : deliverCost,
    totalCost: totalPrice + (totalPrice > 100 ? 0 : deliverCost),
  };

  try {
    // Store cart data in localStorage
    localStorage.setItem("cartData", JSON.stringify(cartData));
    window.location.href = "shipping.html";
  } catch (error) {
    // Handle storage error
    console.error("Error saving cart data to localStorage:", error);
    alert("Error saving cart data to localStorage:");
  }
});

$(document).ready(function () {
  $(cancelBtn).click(function () {
    location.href = "index.html";
  });
});
