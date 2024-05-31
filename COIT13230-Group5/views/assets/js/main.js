/* get products Main page */
$(document).ready(function () {
  $.ajax({
    url: '/product',
    method: 'GET',
    dataType: 'json',
    success: function (data) {
      const products = data.data.slice(0, 8);
      const productGrid = document.querySelector('.product-grid');
      if (productGrid) {
        products.forEach((p) => {
          let showcase = `<div class="showcase">
          <div class="showcase-banner">
            <img
              src=${p.image}
              alt="Product Image"
              class="product-img default"
              width="300"
            />
            <img
              src=${p.image}
              alt="Product Image"
              class="product-img hover"
              width="300"
            />
            <div class="showcase-actions"></div>
          </div>
          <div class="showcase-content">
            <a href="/product/${p._id}" class="showcase-category">${p.name}</a>
            <h3>
              <a href="/product/${p._id}" class="showcase-title">${p.name}</a>
            </h3>
            <div class="showcase-rating">
              ${Array.from({ length: 5 }, (v, i) =>
                i < p.ratingAverage
                  ? `<ion-icon name="star"></ion-icon>`
                  : `<ion-icon name="star-outline"></ion-icon>`
              ).join('')}
            </div>
            <div class="price-box">
              <p class="price">$${p.price}</p>
            </div>
          </div>
        </div>`;
          productGrid.innerHTML += showcase;
        });
      } else {
        console.error('.product-grid element not found');
      }
    },
    error: function (xhr, status, error) {
      console.error('AJAX error:', error);
    },
  });
});
