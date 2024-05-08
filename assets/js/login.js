//import users from "./Data/userData.js";

const loginForm = document.querySelector("form");
const users = JSON.parse(sessionStorage.getItem("userData")) || [];

loginForm.addEventListener("submit", event => {
  event.preventDefault();

  // Find matching user based on email in the database
  const matchingUser = users.find(user => user.email === loginForm.email.value);
  console.log(matchingUser);
  // Validate credentials securely (type number)
  if (
    matchingUser &&
    validatePassword(Number(loginForm.password.value), matchingUser.password)
  ) {
    // Login successful in the sessionStorage
    sessionStorage.setItem("isLoggedIn", true); // Store login status
    sessionStorage.setItem("userData", JSON.stringify(matchingUser));
    sessionStorage.setItem("userRole", matchingUser.role); // Store user role
    alert("Login successfully!");

    // check user roles
    matchingUser.role === "customer"
      ? (window.location.href = "index.html")
      : (window.location.href = "adminIndex.html");
  } else {
    // Login failed
    alert("Invalid credentials. Please check your email and password.");
  }

  return false;
});

// Secure password validation function
function validatePassword(inputPassword, storedPassword) {
  return inputPassword === parseInt(storedPassword);
}
