document.addEventListener('DOMContentLoaded', function () {
  const currentUserString = localStorage.getItem('currentUser');
  const paymentBtn = document.querySelector('.payment-btn');

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

  paymentBtn.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent form submission

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const token = document.cookie; // Assuming token is stored in localStorage
    const creditCardNumber = document.getElementById('ccnum').value;
    const expireDate = document.getElementById('expdate').value;
    const cvv = document.getElementById('cvv').value;
    const nameOnCard = document.getElementById('cardname').value;

    if (
      cartData &&
      currentUser &&
      token &&
      creditCardNumber &&
      expireDate &&
      cvv &&
      nameOnCard
    ) {
      const orderData = {
        user: currentUser,
        products: cartData.products,
        Total: cartData.totalCost,
        shippingCost: cartData.shippingCost,
        SubTotal: cartData.subtotal,
        CVV: cvv,
        ExpireDate: expireDate,
        creditCardNumber: creditCardNumber,
        NameOnCard: nameOnCard,
      };

      $.ajax({
        url: `/order`,
        type: 'POST',
        headers: {
          Authorization: token,
        },
        data: JSON.stringify(orderData),
        contentType: 'application/json',
        success: function (data) {
          console.log(data);
          alert('Order placed successfully!');

          // After successful payment
          const paymentSuccess = true;
          if (paymentSuccess) {
            // Clear cart data
            //localStorage.removeItem('cartData');
            localStorage.removeItem('products');

            // Update cart count to 0
            const cartCount = document.querySelector('.count');
            cartCount.innerHTML = 0;

            window.location.href = '/orderDetail';
          }
        },
        error: function (xhr, status, error) {
          console.error('Error:', error);
          alert('An error occurred while placing the order');
        },
      });
    } else {
      alert('Missing cart data, user information, or authorization token.');
    }
  });
});
