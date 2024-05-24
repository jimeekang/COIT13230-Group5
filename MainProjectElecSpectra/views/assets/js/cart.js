const cartItemRow = document.querySelector('.table-row');
const clearAllBtn = document.querySelector('.cart-all_delete-btn');

const subtotalSpan = document.querySelectorAll('.summary p span')[0];
const shippingCost = document.querySelectorAll('.summary p span')[1];
const totalCost = document.querySelectorAll('.summary p span')[2];

let cartItemContent = '';
let totalPrice = 0;
let deliverCost = 20;

const checkoutBtn = document.querySelector('.checkout-btn');
const continueBtn = document.querySelector('.continue-btn');
const cancelBtn = document.querySelector('.cancel-btn');

const products = JSON.parse(localStorage.getItem('products')) || [];

//Product Item table
function cartProductList(products) {
  products.forEach((p, index) => {
    cartItemContent += ` <tr>
    <th scope="row" >${index + 1}</th>
    <td>${p.name}</td>
    <td>${p.brand}</td>
    <td>$${p.price}</td>
    <td>${p.quantity}</td>
    <td>${p.subtotalPrice}</td>
    <td><button class="item-delete-btn" data-product-id="${
      p.id
    }">Delete</button></td>
    </tr>`;
  });
  cartItemRow.innerHTML = cartItemContent;
}

// All delete data
function deleteAllProduct(products) {
  if (confirm('Are you sure you want to delete all cart items?')) {
    products.length = 0;
    cartItemRow.innerHTML = '';
    totalPrice = 0;
    subtotalSpan.textContent = `$${totalPrice}`;
    updateTotalAfterDiscount(totalPrice);
    localStorage.removeItem('products');
  } else {
    // User canceled deletion
  }
}

function handleDelete(productId) {
  const indexToDelete = products.find((product) => product.id === productId);
  if (indexToDelete !== -1) {
    // Remove the product from the products array
    const removedProduct = products.splice(indexToDelete, 1)[0];

    totalPrice -= removedProduct.subtotalPrice;
    subtotalSpan.textContent = `$${totalPrice}`;
    updateTotalAfterDiscount(totalPrice);

    // Update localStorage with the modified products array
    localStorage.setItem('products', JSON.stringify(products));
  }
}

function updateTotalAfterDiscount(currentTotalPrice) {
  let shippingPrice = currentTotalPrice >= 100 ? 0 : deliverCost;
  let totalPriceWithShipping = currentTotalPrice + shippingPrice;
  shippingCost.textContent = `$${shippingPrice.toFixed(2)}`;
  totalCost.textContent = `$${totalPriceWithShipping.toFixed(2)}`;
}

document.addEventListener('DOMContentLoaded', () => {
  // show all Product in cart
  cartProductList(products);

  // delete All items in cart
  clearAllBtn.addEventListener('click', () => {
    deleteAllProduct(products);
  });

  // delete buttons
  document.querySelectorAll('.item-delete-btn').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.getAttribute('data-product-id');

      handleDelete(productId);

      const trElement = button.closest('tr');
      if (trElement) {
        trElement.remove();
      }
    });
  });

  // Get final total cost
  products.forEach((p) => {
    const subtotalPrice = p.subtotalPrice;
    totalPrice += subtotalPrice;
  });

  subtotalSpan.textContent = `$${totalPrice}`;
  updateTotalAfterDiscount(totalPrice);

  // check out to payment
  checkoutBtn.addEventListener('click', () => {
    const cartData = {
      products: products, // Corrected variable name
      subtotal: totalPrice,
      shippingCost: totalPrice > 100 ? 0 : deliverCost,
      totalCost: totalPrice + (totalPrice > 100 ? 0 : deliverCost),
    };

    try {
      // Store cart data in localStorage
      localStorage.setItem('cartData', JSON.stringify(cartData));
      window.location.href = '/payment';
    } catch (error) {
      // Handle storage error
      console.error('Error saving cart data to localStorage:', error);
      alert('Error saving cart data to localStorage:');
    }
  });

  $(document).ready(function () {
    $(cancelBtn).click(function () {
      location.href = '/main';
    });
  });

  $(document).ready(function () {
    $(continueBtn).click(function () {
      history.back();
    });
  });
});
