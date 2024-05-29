const token = document.cookie;
// Extract product data from HTML
const productName = document.getElementById('productName').textContent;
const productBrand = document.getElementById('productBrand').textContent;
const productPrice = parseFloat(
  document.getElementById('productPrice').textContent.replace('$', '')
);
const productId = document.getElementById('productId').textContent;

document.addEventListener('DOMContentLoaded', function () {
  /* Add Cart */
  const addToCartBtn = document.querySelector('.add-to-cart');
  addToCartBtn.addEventListener('click', function (event) {
    event.preventDefault();

    const selectedQuantity = document.getElementById('qty').value;
    if (selectedQuantity === '0') {
      $('.error-msg-addCart')
        .addClass('visible')
        .text('Please select quantity.');
      return;
    }

    if (token) {
      let product = {
        id: productId,
        name: productName,
        brand: productBrand,
        price: productPrice,
        quantity: selectedQuantity,
        subtotalPrice: productPrice * selectedQuantity,
      };

      // Retrieve products array from localStorage
      let products = JSON.parse(localStorage.getItem('products')) || [];

      // Add the new product to the products array
      products.push(product);

      // Store the updated products array back into localStorage
      localStorage.setItem('products', JSON.stringify(products));

      $('#success-msg-addCart').removeClass('hidden').addClass('visible');
      $('#success-msg-addCart .message-text-addCart').text(
        'Your product successfully in the cart!'
      );

      setTimeout(function () {
        window.location.href = '/cart';
      }, 2000);
    } else {
      $('.error-msg-addCart').addClass('visible').text('Please Login');
    }
  });

  /* Display Write Review Button */
  document
    .querySelector('#writeReviewBtn')
    .addEventListener('click', function () {
      if (token) {
        document.getElementById('writeReviewSection').style.display = 'block';
      } else {
        $('.error-msg-review').addClass('visible').text('Please Login');
      }
    });

  document.querySelector('.cancel').addEventListener('click', function () {
    document.getElementById('writeReviewSection').style.display = 'none';
  });

  /* Get Review */
  $.ajax({
    url: `/review`,
    type: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    success: function (result) {
      const reviews = result.data.data;
      const reviewContainer = document.getElementById('review-container'); // 리뷰를 삽입할 컨테이너

      reviews.forEach((review) => {
        const reviewElement = createReviewElement(review);
        reviewContainer.innerHTML += reviewElement;
      });
    },
    error: function (xhr, status, error) {
      const result = xhr.responseJSON;
      alert(result.message || 'Failed to fetch reviews.');
    },
  });

  /* Save review */
  const token = document.cookie.split('auth_token=')[1];
  const loginUser = JSON.parse(localStorage.getItem('currentUser'));
  $(document).ready(function () {
    $('#reviewForm').on('submit', function (event) {
      event.preventDefault();

      const reviewTitle = $('#reviewTitle').val();
      const reviewDescription = $('#reviewDescription').val();
      const starRating = $('#starRating').val();
      const productId = $('#productId').text().trim();

      if (!reviewTitle || !reviewDescription || !starRating) {
        alert('Please fill in all required fields.');
        return;
      }

      const reviewData = {
        user: loginUser._id,
        product: productId,
        reviewTitle: reviewTitle,
        reviewDescription: reviewDescription,
        rating: starRating,
      };

      $.ajax({
        url: '/review',
        type: 'POST',
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
        data: JSON.stringify(reviewData),
        success: function (result) {
          // Show success message
          $('#success-msg-review .message-text-review').text(
            'Review submitted successfully.'
          );
          $('#success-msg-review').removeClass('hidden').addClass('visible');
          setTimeout(function () {
            $('#success-msg-review').removeClass('visible').addClass('hidden');
          }, 1000);

          $('#reviewTitle').val('');
          $('#reviewDescription').val('');
          $('#starRating').val('');
        },
        error: function (xhr, status, error) {
          const result = xhr.responseJSON;
          alert(result.message || 'Failed to submit review.');
        },
      });
    });
  });
});

function createReviewElement(review) {
  const reviewDate = new Date(review.createdAt);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = reviewDate.toLocaleDateString(undefined, options);

  const filledStars = '★'.repeat(review.rating);
  const emptyStars = '☆'.repeat(5 - review.rating);

  return `
    <div class="review">
      <div class="review-header">
        <div class="stars">${filledStars}${emptyStars}</div>
        <div class="customer-info">
          <p class="customer-name">${review.user.fullName}</p>
          <p class="review-date">${formattedDate}</p>
        </div>
      </div>
      <p class="review-title">${review.reviewTitle}</p>
      <p class="review-description">${review.reviewDescription}</p>
    </div>
  `;
}
