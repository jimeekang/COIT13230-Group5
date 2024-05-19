document.addEventListener('DOMContentLoaded', function () {
  // Show all Price
  const cartData = JSON.parse(localStorage.getItem('cartData'));
  if (cartData) {
    const subtotalSpan = document.querySelector('.subtotal-span');
    const shippingCostSpan = document.querySelector('.shipping-cost-span');
    const totalCostSpan = document.querySelector('.total-cost-span');

    subtotalSpan.textContent = `$${cartData.subtotal}`;
    shippingCostSpan.textContent = `$${cartData.shippingCost}`;
    totalCostSpan.textContent = `$${cartData.totalCost}`;
  } else {
    // Handle case where no cart data is found (empty cart)
    alert('No cart data found');
  }
});
