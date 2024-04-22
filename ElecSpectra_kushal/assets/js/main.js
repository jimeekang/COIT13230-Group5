$(document).ready(function () {
  $("#header").load("header.html");
});

$(document).ready(function () {
  $("#navbar").load("navbar.html");
});

$(document).ready(function () {
  $("#footer").load("footer.html");
});
document
  .getElementById("writeReviewBtn")
  .addEventListener("click", function () {
    document.getElementById("writeReviewSection").style.display = "block";
  });

document.querySelector(".cancel").addEventListener("click", function () {
  document.getElementById("writeReviewSection").style.display = "none";
});

document
  .getElementById("reviewForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    // Handle form submission
    // You can add your code to handle form submission here, e.g., send review to server
  });
