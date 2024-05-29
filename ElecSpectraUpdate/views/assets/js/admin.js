const links = document.querySelectorAll('.sidebar ul li a');
const sections = document.querySelectorAll('section');

const categoryFilter = document.getElementById('filter-category');
const brandFilter = document.getElementById('filter-brand');
const priceSort = document.getElementById('sort-price');
const filterBtn = document.getElementById('filter-btn');
const productList = document.querySelector('#products tbody');

const editButtons = document.querySelectorAll('.edit-btn');
const deleteButtons = document.querySelectorAll('.delete-btn');

const reviewFilterBtn = document.getElementById('review-filter-btn');
const searchEmailBtn = document.getElementById('review-search-btn');

const reviewEditButtons = document.querySelectorAll('.review-edit-btn');
const reviewDeleteButtons = document.querySelectorAll('.review-delete-btn');

document.addEventListener('DOMContentLoaded', () => {
  let products = [];
  let reviews = [];

  /* Select Menu */
  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      sections.forEach((section) => {
        if (section.id === targetId) {
          section.classList.remove('hidden');
        } else {
          section.classList.add('hidden');
        }
      });
    });
  });

  /* Get Product List */
  $.ajax({
    url: '/product',
    method: 'GET',
    dataType: 'json',
    success: function (data) {
      products.push(...data.data);
      renderProducts(products);

      /* Product Filter */
      const filterProducts = () => {
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
        if (sortValue && Array.isArray(filteredProducts)) {
          filteredProducts = filteredProducts.sort((a, b) => {
            if (sortValue === 'asc') {
              return a.price - b.price;
            } else {
              return b.price - a.price;
            }
          });
        }

        renderProducts(filteredProducts);
      };
      filterBtn.addEventListener('click', filterProducts);
    },
    error: function (err) {
      console.error('Error fetching products:', err);
    },
  });

  /* Product Edit, Delete */
  productList.addEventListener('click', (e) => {
    // Edit Product
    const row = e.target.closest('tr');
    const cells = row.querySelectorAll('td');
    const productId = row.dataset.id;
    const product = products.find((p) => p.id === productId);

    if (e.target.classList.contains('edit-btn')) {
      if (product) {
        console.log(productId);
      }
    }

    // Delete Product
    if (e.target.classList.contains('delete-btn')) {
      const productName = cells[3].textContent;
      if (confirm(`Are you sure you want to delete ${productName}?`)) {
        row.remove();
        // Add your delete logic here
      }
    }
  });

  /* Get Review List */
  $.ajax({
    url: '/review',
    method: 'GET',
    dataType: 'json',
    success: function (data) {
      reviews.push(...data.data.data); // Ensure reviews are populated correctly
      renderReviews(reviews);

      /* Review Filter */
      const filterReviews = () => {
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
      };

      const searchUserReviews = () => {
        let filteredReviews = reviews;
        const emailValue = document.getElementById('review-email-filter').value;

        if (emailValue) {
          filteredReviews = filteredReviews.filter(
            (review) => review.user.email === emailValue
          );
        }
        renderReviews(filteredReviews);
      };

      /* Review filtering */
      reviewFilterBtn.addEventListener('click', filterReviews);
      searchEmailBtn.addEventListener('click', searchUserReviews);
    },
    error: function (err) {
      console.error('Error fetching reviews:', err);
    },
  });

  /* Review Edit, Delete */
  const reviewList = document.querySelector('#reviews tbody');
  reviewList.addEventListener('click', (e) => {
    if (e.target.classList.contains('review-delete-btn')) {
      const row = e.target.closest('tr');
      const cells = row.querySelectorAll('td');
      const userEmail = cells[1].textContent;
      const productName = cells[2].textContent;
      if (
        confirm(
          `Are you sure you want to delete the review by ${userEmail} for ${productName}?`
        )
      ) {
        row.remove();
        // Add your delete logic here
      }
    }
  });

  /* Logout */
  $('#logout').click(function () {
    $.ajax({
      url: '/user/logout',
      method: 'POST',
      success: function (response) {
        console.log(response);
        if (response.statusCode === 200) {
          localStorage.removeItem('userName');
          localStorage.removeItem('userRole');
          localStorage.removeItem('products');
          localStorage.removeItem('cartData');
          localStorage.removeItem('currentUser');
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
});

function hideForm() {
  document.getElementById('addProduct').classList.add('hidden');
}

/* Product Render */
const renderProducts = (filteredProducts) => {
  productList.innerHTML = '';
  filteredProducts.forEach((product, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${product.category}</td>
      <td>${product.brand}</td>
      <td>${product.name}</td>
      <td>$${product.price}</td>
      <td>${product.description}</td>
      <td>${
        product.createdAt ? product.createdAt.slice(0, 10) : 'Unknown Date'
      }</td>
      <td>
        <button class="edit-btn" >Edit</button>
        <button class="delete-btn">Delete</button>
      </td>
    `;
    productList.appendChild(row);
  });
};

/* Review Render */
const renderReviews = (reviews) => {
  const tbody = document.querySelector('#reviews tbody');
  tbody.innerHTML = '';
  reviews.forEach((review, index) => {
    const row = document.createElement('tr');
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
    tbody.appendChild(row);
  });
};
