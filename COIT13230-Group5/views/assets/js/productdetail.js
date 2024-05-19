document.addEventListener('DOMContentLoaded', function () {
  /* Add Cart */
  const addToCartBtn = document.querySelector('.add-to-cart');

  addToCartBtn.addEventListener('click', function (event) {
    event.preventDefault();

    const selectedQuantity = document.getElementById('qty').value;

    if (selectedQuantity === '0') {
      window.alert('Please select quantity.');
      return;
    }

    // Extract product data from HTML
    const productName = document.getElementById('productName').textContent;
    const productBrand = document.getElementById('productBrand').textContent;
    const productPrice = parseFloat(
      document.getElementById('productPrice').textContent.replace('$', '')
    );
    const productId = document.getElementById('productId').textContent;

    const product = {
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

    window.alert('Product added to cart successfully.');
    window.location.href = '/cart';
  });
  /* Display Write Review Button */
  const reviewForm = document.getElementById('reviewForm');
  document
    .getElementById('writeReviewBtn')
    .addEventListener('click', function () {
      document.getElementById('writeReviewSection').style.display = 'block';
    });

  document.querySelector('.cancel').addEventListener('click', function () {
    document.getElementById('writeReviewSection').style.display = 'none';
  });

  /* Save review */
  document
    .getElementById('reviewForm')
    .addEventListener('submit', function (event) {
      event.preventDefault();
      // Handle form submission
      // You can add your code to handle form submission here, e.g., send review to server
    });

  reviewForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const reviewTitle = document.getElementById('reviewTitle').value;
    const reviewDescription =
      document.getElementById('reviewDescription').value;
    const starRating = document.getElementById('starRating').value;

    // Here we can submit the review data to the backend or perform any other actions
    console.log('Review Title:', reviewTitle);
    console.log('Review Description:', reviewDescription);
    console.log('Star Rating:', starRating);

    // Here we can   can reset the form after submission
    reviewForm.reset();

    // Here displaying a success message or redirect the user to another page
    window.alert('Review submitted successfully.');
  });
});
