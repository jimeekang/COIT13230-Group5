"use strict";

/******* File load *******/
$(document).ready(function () {
  $("#header").load("header.html");
});

$(document).ready(function () {
  $("#navbar").load("navbar.html");
});

$(document).ready(function () {
  $("#footer").load("footer.html");
});

const checkoutBtn = document.querySelector(".checkout-btn");
$(document).ready(function () {
  $(checkoutBtn).click(function () {
    location.href = "shipping.html";
  });
});

const cancelBtn = document.querySelector(".cancel-btn");
$(document).ready(function () {
  $(cancelBtn).click(function () {
    location.href = "index.html";
  });
});
