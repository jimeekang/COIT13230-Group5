'use strict';

/******* File load *******/
$(document).ready(function () {
  $('#header').load('header.html');
});

$(document).ready(function () {
  $('#navbar').load('navbar.html');
});

$(document).ready(function () {
  $('#footer').load('footer.html');
});

/******* Admin main page direction *******/
const addNewProductBtn = document.querySelector('.add-product-btn');
$(document).ready(function () {
  $(addNewProductBtn).click(function () {
    location.href = 'adminAddProduct.html';
  });
});

const manageProduct = document.querySelector('.manage-product-btn');
$(document).ready(function () {
  $(manageProduct).click(function () {
    location.href = 'adminManageProduct.html';
  });
});

const manageReview = document.querySelector('.manage-review-btn');
$(document).ready(function () {
  $(manageReview).click(function () {
    location.href = 'adminManageReview.html';
  });
});

// move to product detail page
const showcase = document.querySelectorAll('.showcase');
$(document).ready(function () {
  $(showcase).click(function () {
    location.href = 'productDetail.html';
  });
});
