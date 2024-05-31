document.addEventListener('DOMContentLoaded', () => {
  let products = [];
  let reviews = [];
  let orders = [];

  // Select Menu
  setupMenuNavigation();

  // Fetch and render Users
  fetchUsers();

  // Fetch and render product list
  fetchProducts();

  // Fetch and render review list
  fetchReviews();

  // Fetch and render order list
  fetchOrders();

  // Setup logout functionality
  setupLogout();

  function setupMenuNavigation() {
    const links = document.querySelectorAll('.sidebar ul li a');
    const sections = document.querySelectorAll('section');

    links.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        sections.forEach((section) => {
          section.classList.toggle('hidden', section.id !== targetId);
        });
      });
    });
  }

  /* Users */
  function fetchUsers() {
    $.ajax({
      url: '/user',
      method: 'GET',
      dataType: 'json',
      success: function (data) {
        const users = data.data;
        const totalUser = document.querySelector('.total-users');
        totalUser.textContent = users.length;
      },
      error: function (err) {
        console.error('Error fetching orders:', err);
      },
    });
  }

  /* Product */
  function fetchProducts() {
    $.ajax({
      url: '/product',
      method: 'GET',
      dataType: 'json',
      success: function (data) {
        products = data.data;
        const totalProduct = document.querySelector('.total-products');
        totalProduct.textContent = products.length;
        renderProducts(products);
        setupProductFilters();
        setupProductActions();
      },
      error: function (err) {
        console.error('Error fetching products:', err);
      },
    });
  }

  function setupProductFilters() {
    const filterBtn = document.getElementById('product-filter-btn');
    const categoryFilter = document.getElementById('filter-category');
    const brandFilter = document.getElementById('filter-brand');
    const priceSort = document.getElementById('sort-price');

    filterBtn.addEventListener('click', () => {
      let filteredProducts = products;
      const categoryValue = categoryFilter.value;
      if (categoryValue) {
        filteredProducts = filteredProducts.filter(
          (product) => product.category === categoryValue
        );
      }

      const brandValue = brandFilter.value;
      if (brandValue) {
        filteredProducts = filteredProducts.filter(
          (product) => product.brand === brandValue
        );
      }

      const sortValue = priceSort.value;
      if (sortValue) {
        filteredProducts.sort((a, b) =>
          sortValue === 'asc' ? a.price - b.price : b.price - a.price
        );
      }

      renderProducts(filteredProducts);
    });
  }

  function setupProductActions() {
    const productList = document.querySelector('#products tbody');

    productList.addEventListener('click', (e) => {
      const row = e.target.closest('tr');
      const productId = row.dataset.id;
      const product = products.find((p) => p._id === productId);

      if (e.target.classList.contains('edit-btn')) {
        editProduct(product);
      }

      if (e.target.classList.contains('delete-btn')) {
        deleteProduct(row, product);
      }
    });
  }

  function editProduct(product) {
    if (!product) {
      console.error('Product not found');
      return;
    }

    document.querySelector('#products').classList.add('hidden');
    document.querySelector('#editProduct').classList.remove('hidden');

    const editForm = document.querySelector('#edit-product-form');
    for (let key in product) {
      const field = editForm.querySelector(`[name=${key}]`);
      if (field) {
        if (field.type === 'file') {
          continue;
        }
        field.value = product[key];
      }
    }

    if (product.specifications) {
      for (let specKey in product.specifications) {
        const specField = editForm.querySelector(`[name=${specKey}]`);
        if (specField) {
          specField.value = product.specifications[specKey];
        }
      }
    }

    editForm.dataset.id = product._id;
  }

  function deleteProduct(row, product) {
    if (confirm(`Are you sure you want to delete ${product.name}?`)) {
      $.ajax({
        url: `/product/${product._id}`,
        type: 'DELETE',
        success: function (data) {
          if (data.status === 'success') {
            row.remove();
            alert('The product deleted!');
          } else {
            alert('Failed to delete product on server');
          }
        },
        error: function (xhr, status, error) {
          console.error('Error:', error);
          alert('An error occurred while deleting the product');
        },
      });
    }
  }

  /* Edit Product */
  document.querySelector('#editSave-btn').addEventListener('click', (e) => {
    e.preventDefault();
    saveProductChanges();
  });

  document
    .querySelector('#cancel-editProduct-btn')
    .addEventListener('click', cancelEditProduct);

  function saveProductChanges() {
    const form = document.querySelector('#edit-product-form');
    const productId = form.dataset.id;
    const formData = new FormData(form);
    const updatedProduct = {};

    formData.forEach((value, key) => {
      if (key !== 'image') {
        updatedProduct[key] = value;
      }
    });

    $.ajax({
      url: `/product/${productId}`,
      type: 'PATCH',
      data: JSON.stringify(updatedProduct),
      contentType: 'application/json',
      success: function (data) {
        if (data.status === 'success') {
          alert('Product updated successfully!');
          document.querySelector('#editProduct').classList.add('hidden');
          document.querySelector('#products').classList.remove('hidden');
          location.reload(); // Reload the page to reflect changes
        } else {
          alert('Failed to update product on server');
        }
      },
      error: function (xhr, status, error) {
        console.error('Error:', error);
        alert('An error occurred while updating the product');
      },
    });
  }

  function cancelEditProduct() {
    document.querySelector('#editProduct').classList.add('hidden');
    document.querySelector('#products').classList.remove('hidden');
  }

  /* Review */
  function fetchReviews() {
    $.ajax({
      url: '/review',
      method: 'GET',
      dataType: 'json',
      success: function (data) {
        reviews = data.data.data;
        const totalReview = document.querySelector('.total-reviews');
        totalReview.textContent = reviews.length;
        renderReviews(reviews);
        setupReviewFilters();
        //setupReviewActions();
      },
      error: function (err) {
        console.error('Error fetching reviews:', err);
      },
    });
  }

  function setupReviewFilters() {
    const reviewFilterBtn = document.getElementById('review-filter-btn');
    const searchEmailBtn = document.getElementById('review-search-btn');

    reviewFilterBtn.addEventListener('click', () => {
      let filteredReviews = reviews;
      const starRateValue = document.getElementById(
        'review-filter-star-rate'
      ).value;

      if (starRateValue) {
        filteredReviews = filteredReviews.filter(
          (review) => review.rating === parseInt(starRateValue)
        );
      }

      const dateValue = document.getElementById('review-date-filter').value;
      if (dateValue) {
        filteredReviews = filteredReviews.filter(
          (review) => review.createdAt.slice(0, 10) === dateValue
        );
      }

      renderReviews(filteredReviews);
    });

    searchEmailBtn.addEventListener('click', () => {
      const emailValue = document.getElementById('review-email-filter').value;
      const filteredReviews = emailValue
        ? reviews.filter((review) => review.user.email === emailValue)
        : reviews;

      renderReviews(filteredReviews);
    });

    const reviewList = document.querySelector('#reviews tbody');
    reviewList.addEventListener('click', (e) => {
      const row = e.target.closest('tr');
      const reviewId = row.dataset.reviewid;
      const review = reviews.find((r) => r._id === reviewId);

      if (e.target.classList.contains('review-delete-btn')) {
        deleteReview(row, review);
      }
    });

    function deleteReview(row, review) {
      const token = document.cookie;
      if (
        confirm(
          `Are you sure you want to delete ${review.user.email}?'s review?`
        )
      ) {
        $.ajax({
          url: `/review/${review._id}`,
          type: 'DELETE',
          headers: {
            Authorization: token,
          },
          success: function (data) {
            console.log(data);
            if (data.status === 'success') {
              alert('The review deleted successfully');
              row.remove();
            } else {
              alert('Failed to delete review on server');
            }
          },
          error: function (xhr, status, error) {
            console.error('Error:', error);
            alert('An error occurred while deleting the product');
          },
        });
      }
    }
  }

  /* Order */
  function fetchOrders() {
    $.ajax({
      url: '/order',
      method: 'GET',
      dataType: 'json',
      success: function (data) {
        orders = data.data.orders;
        const totalOrder = document.querySelector('.total-orders');
        totalOrder.textContent = orders.length;
        renderOrders(orders);
        setupOrderFilters();
      },
      error: function (err) {
        console.error('Error fetching orders:', err);
      },
    });
  }

  function setupLogout() {
    $('#logout').click(function () {
      $.ajax({
        url: '/user/logout',
        method: 'POST',
        success: function (response) {
          if (response.statusCode === 200) {
            localStorage.clear();
            document.cookie = '';
            window.location.href = '/main';
          } else {
            console.error('Logout failed:', response.error);
          }
        },
        error: function (error) {
          console.error('AJAX error:', error);
        },
      });
    });
  }

  function setupOrderFilters() {
    const orderFilterBtn = document.getElementById('order-filter-btn');

    orderFilterBtn.addEventListener('click', () => {
      let filteredOrders = orders;
      const emailValue = document.getElementById('order-email-filter').value;
      const dateValue = document.getElementById('order-date-filter').value;

      if (emailValue) {
        filteredOrders = filteredOrders.filter(
          (order) => order.user.email === emailValue
        );
      }

      if (dateValue) {
        filteredOrders = filteredOrders.filter(
          (order) => order.orderDate.split('T')[0] === dateValue
        );
      }

      renderOrders(filteredOrders);
    });
  }

  function renderProducts(filteredProducts) {
    const productList = document.querySelector('#products tbody');
    productList.innerHTML = '';

    filteredProducts.forEach((product, index) => {
      const row = document.createElement('tr');
      row.setAttribute('data-id', product._id);
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${product.category}</td>
        <td>${product.brand}</td>
        <td>${product.name}</td>
        <td>$${product.price}</td>
        <td>${product.description}</td>
        <td>${product.stock}</td>
        <td>${
          product.createdAt ? product.createdAt.slice(0, 10) : 'Unknown Date'
        }</td>
        <td>
          <button class="edit-btn">Edit</button>
          <button class="delete-btn">Delete</button>
        </td>
      `;
      productList.appendChild(row);
    });
  }

  function renderReviews(reviews) {
    const reviewList = document.querySelector('#reviews tbody');
    reviewList.innerHTML = '';

    reviews.forEach((review, index) => {
      const row = document.createElement('tr');
      row.setAttribute('data-reviewid', review._id);
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${review.user ? review.user.email : 'Unknown User'}</td>
        <td>${review.product ? review.product.name : 'Unknown Product'}</td>
        <td>${review.reviewTitle}</td>
        <td>${review.reviewDescription}</td>
        <td>${review.rating}</td>
        <td>${
          review.createdAt ? review.createdAt.slice(0, 10) : 'Unknown Date'
        }</td>
        <td>
          <button class="review-delete-btn">Delete</button>
        </td>
      `;
      reviewList.appendChild(row);
    });
  }

  function renderOrders(orders) {
    const orderListBody = document.querySelector('#order-list-body');
    orderListBody.innerHTML = '';

    orders.forEach((order) => {
      const row = document.createElement('tr');
      row.setAttribute('data-orderid', order._id);
      row.innerHTML = `
        <td>${order._id}</td>
        <td>${order.user.email}</td>
        <td>${order.products.length}</td> 
        <td>$${order.Total}</td>
        <td>${order.orderDate.split('T')[0]}</td>
      `;
      orderListBody.appendChild(row);
    });
  }
});

function hideForm() {
  document.getElementById('addProduct').classList.add('hidden');
}
