export const products = [
  {
    id: 1,
    name: "Iphone15",
    price: 1500,
    quantity: 1,
    subtotalPrice: function () {
      return this.price * this.quantity;
    },
  },
  {
    id: 2,
    name: "Iphone14",
    price: 1400,
    quantity: 1,
    subtotalPrice: function () {
      return this.price * this.quantity;
    },
  },
  {
    id: 3,
    name: "Iphone13",
    price: 1300,
    quantity: 2,
    subtotalPrice: function () {
      return this.price * this.quantity;
    },
  },
];

/*******Cart*******/
const cartItem = document.querySelector(".table-row");
const clearAllBtn = document.querySelector(".cart-all_delete-btn");

const subtotalSpan = document.querySelectorAll(".summary p span")[0];
const shippingCost = document.querySelectorAll(".summary p span")[1];
const totalCost = document.querySelectorAll(".summary p span")[2];

let cartItemContent = "";
let totalPrice = 0;
let deliverCost = 20;

const checkoutBtn = document.querySelector(".checkout-btn");

//Product Item table
function cartProductList(products) {
  products.forEach(p => {
    cartItemContent += ` <tr>
    <th scope="row" >${p.id}</th>
    <td>${p.name}</td>
    <td>$${p.price}</td>
    <td>${p.quantity}</td>
    <td>${p.subtotalPrice()}</td>
    <td><button class="item-delete-btn" data-product-id="${
      p.id
    }">Delete</button></td>
    </tr>`;
  });
  products.length > 0
    ? (cartItem.innerHTML = cartItemContent)
    : console.log("error");
}

cartProductList(products);

// All delete data
function deleteAllProduct(products) {
  if (confirm("Are you sure you want to delete all cart items?")) {
    products.length = 0;
    cartItem.innerHTML = "";
    totalPrice = 0;
    subtotalSpan.textContent = `$${totalPrice}`;
    updateTotalAfterDiscount(totalPrice);
  } else {
    // User canceled deletion
  }
}

clearAllBtn.addEventListener("click", () => {
  deleteAllProduct(products);
});

// Delete one product
function deleteOneProduct(event, products) {
  if (event.target.classList.contains("item-delete-btn")) {
    const clickedButton = event.target;
    const itemId = clickedButton.dataset.productId;

    const productIndex = products.findIndex(p => p.id === parseInt(itemId));

    if (productIndex !== -1) {
      const removedProduct = products.splice(productIndex, 1)[0];

      totalPrice -= removedProduct.subtotalPrice();

      const tableRow = clickedButton.closest("tr");
      cartItem.removeChild(tableRow);

      // Update subtotal and total in UI
      subtotalSpan.textContent = `$${totalPrice}`;
      updateTotalAfterDiscount(totalPrice);
    }
  }
}

cartItem.addEventListener("click", event => {
  deleteOneProduct(event, products);
});

// Get final total cost
products.forEach(p => {
  const subtotalPrice = p.subtotalPrice();
  totalPrice += subtotalPrice;
});

subtotalSpan.textContent = `$${totalPrice}`;
updateTotalAfterDiscount(totalPrice);

function updateTotalAfterDiscount(currentTotalPrice) {
  let shippingPrice = currentTotalPrice >= 100 ? 0 : deliverCost;
  shippingCost.textContent = `$${shippingPrice}`;
  totalCost.textContent = `$${currentTotalPrice}`;
}

checkoutBtn.addEventListener("click", () => {
  const cartData = {
    products: products, // Array of product objects
    subtotal: totalPrice,
    shippingCost: totalPrice > 100 ? 0 : deliverCost,
    totalCost: totalPrice + (totalPrice > 100 ? 0 : deliverCost),
  };

  try {
    // Store cart data in localStorage
    localStorage.setItem("cartData", JSON.stringify(cartData));

    // Redirect to shipping.html only after successful storage
    window.location.href = "shipping.html";
  } catch (error) {
    console.error("Error saving cart data to localStorage:", error);
    // Handle storage error gracefully, e.g., display an error message to the user
  }
});
