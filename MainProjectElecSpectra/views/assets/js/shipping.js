document.addEventListener('DOMContentLoaded', function () {
  const currentUserString = localStorage.getItem('currentUser');

  // Check if currentUser exists in localStorage
  if (currentUserString) {
    const currentUser = JSON.parse(currentUserString);

    // Set the values of the input fields
    document.getElementById('email').value = currentUser.email;
    document.getElementById('fullName').value = currentUser.fullName;
    document.getElementById('address').value = currentUser.address;
    document.getElementById('mobile').value = currentUser.phoneNumber;
  }

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
