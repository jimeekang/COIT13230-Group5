$(document).ready(function () {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const orderList = JSON.parse(localStorage.getItem('cartData'));
  const orderProducts = orderList.products;

  $('#email').text(currentUser.email);
  $('#fullName').text(currentUser.fullName);
  $('#address').text(currentUser.address);
  $('#mobile').text(currentUser.phoneNumber);

  $.ajax({
    url: '/order',
    method: 'GET',
    success: function (response) {
      const allOrders = response.data.orders;

      const userOrders = allOrders.filter(
        (order) => currentUser._id === order.user._id
      );

      const orderProduct = orderProducts.filter(
        (p) => p._id === userOrders.products_id
      );

      console.log(userOrders);
      console.log(orderProduct);

      if (userOrders && orderProduct) {
        let orderItemsHtml = '';
        userOrders.forEach((order) => {
          orderProducts.forEach((product) => {
            orderItemsHtml += `
                  <tr>
                    <td>${product.name}</td>
                    <td>${product.brand}</td>
                    <td>$${product.price}</td>
                    <td>${product.quantity}</td>
                    <td>$${product.subtotalPrice}</td>
                  </tr>
                `;
          });

          $('#order-items-body').html(orderItemsHtml);
          $('#subtotal').text(`$${order.SubTotal}`);
          $('#shippingCost').text(`$${order.shippingCost}`);
          $('#totalCost').text(`$${order.Total}`);
        });
      }
    },
    error: function (error) {
      console.error('Error fetching order data:', error);
    },
  });

  $('#backToShop').click(function () {
    window.location.href = '/main';
  });

  $('#confirmOrder').click(function () {
    localStorage.removeItem('cartData');
    alert('Order confirmed!');
    window.location.href = '/main';
  });
});
