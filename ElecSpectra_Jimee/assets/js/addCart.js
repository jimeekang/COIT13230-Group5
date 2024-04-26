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

  // add item data (type array)
  cartItems.push(cartItem);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  location.href = "cart.html";
});
