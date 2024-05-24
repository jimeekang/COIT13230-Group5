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
document.addEventListener('DOMContentLoaded', function () {
  const adminMenu = document.querySelector('.admin-menu');
  const currentUserRole = localStorage.getItem('userRole');
  if (adminMenu && currentUserRole === 'admin') {
    adminMenu.style.display = 'block';
  }
});

const addNewProductBtn = document.querySelector('.add-product-btn');

$(document).ready(function () {
  $('.add-product-btn').click(function () {
    window.location.href = '/addProduct';
  });
});

$(document).ready(function () {
  $('.manage-product-btn').click(function () {
    window.location.href = '/manageProduct';
  });
});
