'use strict';

/******* File load *******/
$(document).ready(function () {
  $('#header').load('/header.html');
});

$(document).ready(function () {
  $('#navbar').load('/navbar.html');
});

$(document).ready(function () {
  $('#footer').load('/footer.html');
});

/******* Admin main page direction *******/
const addNewProductBtn = document.querySelector('.add-product-btn');
$(document).ready(function () {
  $(addNewProductBtn).click(function () {
    location.href = 'adminAddProduct.html';
  });
});

$(document).ready(function () {
  $('.add-product-btn').click(function () {
    window.location.href = '/addProduct';
  });
});
