document.addEventListener('DOMContentLoaded', function () {
  // Retrieve shipping information from localStorage
  const shippingInfo = JSON.parse(localStorage.getItem('shippingInfo'));

  // Populate shipping information
  document.getElementById('email').textContent = shippingInfo.email;
  document.getElementById('fullName').textContent = shippingInfo.fullName;
  document.getElementById('address').textContent = shippingInfo.address;
  document.getElementById('mobile').textContent = shippingInfo.mobile;

  // Retrieve order items from localStorage
  const orderItems = JSON.parse(localStorage.getItem('orderItems'));

  // Populate order items
  const orderItemsBody = document.getElementById('order-items-body');
  let orderItemsHTML = '';
  orderItems.forEach((item) => {
    orderItemsHTML += `
      <tr>
        <td>${item.name}</td>
        <td>${item.brand}</td>
        <td>$${item.price}</td>
        <td>${item.quantity}</td>
        <td>$${item.subtotalPrice}</td>
      </tr>
    `;
  });
  orderItemsBody.innerHTML = orderItemsHTML;

  // Retrieve order total from localStorage
  const orderTotal = JSON.parse(localStorage.getItem('orderTotal'));

  // Populate order total
  document.getElementById(
    'subtotal'
  ).textContent = `$${orderTotal.subtotal.toFixed(2)}`;
  document.getElementById(
    'shippingCost'
  ).textContent = `$${orderTotal.shippingCost.toFixed(2)}`;
  document.getElementById(
    'totalCost'
  ).textContent = `$${orderTotal.totalCost.toFixed(2)}`;

  // Back to shop button click event
  document.getElementById('backToShop').addEventListener('click', function () {
    window.location.href = '/shop'; // Change the href to your shop page
  });

  // Confirm order button click event
  document
    .getElementById('confirmOrder')
    .addEventListener('click', function () {
      // Implement the logic to confirm the order, e.g., redirect to a confirmation page
      window.location.href = '/confirmation'; // Change the href to your confirmation page
    });
});
