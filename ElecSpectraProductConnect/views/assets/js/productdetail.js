document.addEventListener("DOMContentLoaded", function () {
  const addToCartBtn = document.querySelector(".add-to-cart");
  const reviewForm = document.getElementById("reviewForm");

  addToCartBtn.addEventListener("click", function (event) {
    event.preventDefault();

    const selectedQuantity = document.getElementById("qty").value;

    if (selectedQuantity === "0") {
      window.alert("Please select quantity.");
      return;
    }

    window.alert("Product added to cart successfully.");
  });

  reviewForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const reviewTitle = document.getElementById("reviewTitle").value;
    const reviewDescription =
      document.getElementById("reviewDescription").value;
    const starRating = document.getElementById("starRating").value;

    // Here we can submit the review data to the backend or perform any other actions
    console.log("Review Title:", reviewTitle);
    console.log("Review Description:", reviewDescription);
    console.log("Star Rating:", starRating);

    // Here we can   can reset the form after submission
    reviewForm.reset();

    // Here displaying a success message or redirect the user to another page
    window.alert("Review submitted successfully.");
  });
});
