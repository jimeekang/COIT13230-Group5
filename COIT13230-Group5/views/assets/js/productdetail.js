/*******product detail*******/
const addCartBtn = document.querySelector(".add-to-cart");
const productName = document.querySelector("h3 span").outerText;
const price = parseInt(document.querySelector("p span").outerText);
const modelSelect = document.getElementById("model");
const quantitySelect = document.getElementById("qty");

// add cart
addCartBtn.addEventListener("click", () => {
  // create cart item in the localStorage
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  let id = cartItems.length + 1;
  const selectedModel = modelSelect.value;
  const selectQuantity = parseInt(quantitySelect.value);
  const subtotalPrice = price * selectQuantity;

  const cartItem = {
    id,
    productName,
    price,
    model: selectedModel,
    quantity: selectQuantity,
    subtotalPrice: subtotalPrice,
  };

  if (selectQuantity === 0) {
    alert("Please select quantity.");
  } else {
    // add item data (type array)
    cartItems.push(cartItem);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    alert("Product added to cart successfully.");
    location.href = "cart.html";
  }
});

const writeReviewBtn = document.querySelector("#writeReviewBtn");
const reviewSection = document.querySelector("#writeReviewSection");
let clickCount = 0;
writeReviewBtn.addEventListener("click", () => {
  console.log(clickCount);
  clickCount++;
  if (clickCount % 2 === 0) {
    reviewSection.style.display = "none";
  } else {
    reviewSection.style.display = "block";
  }
});

const review = JSON.parse(localStorage.getItem("reviewItems")) || [];
let reviewItemList = "";

function reviewList(reviews) {
  reviews.forEach(r => {
    reviewItemList += `<div class="form-group">
  <label for="reviewTitle">Title:</label>
  <input type="text" id="reviewTitle" name="reviewTitle" required />
</div>
<div class="form-group">
  <label for="reviewDescription">Description:</label>
  <textarea
    id="reviewDescription"
    name="reviewDescription"
    rows="4"
    required
  ></textarea>
</div>
<div class="form-group">
  <label for="starRating">Star Rating:</label>
  <select id="starRating" name="starRating" required>
    <option value="1">1 Star</option>
    <option value="2">2 Stars</option>
    <option value="3">3 Stars</option>
    <option value="4">4 Stars</option>
    <option value="5">5 Stars</option>
  </select>
</div>
<div class="btn-group">
  <button type="submit">Save</button>
  <button type="button" class="cancel">Cancel</button>
</div>`;
  });
}
reviewForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const reviewTitle = document.getElementById("reviewTitle").value;
  const reviewDescription = document.getElementById("reviewDescription").value;
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
