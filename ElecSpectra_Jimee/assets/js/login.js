import users from "./data.js";

const loginForm = document.querySelector("form");

loginForm.addEventListener("submit", event => {
  event.preventDefault();

  // Find matching user based on email
  const matchingUser = users.find(user => user.email === loginForm.email.value);

  // Validate credentials securely (avoid storing passwords in plain text)
  if (
    matchingUser &&
    validatePassword(Number(loginForm.password.value), matchingUser.password)
  ) {
    // Login successful
    sessionStorage.setItem("isLoggedIn", true); // Store login status
    sessionStorage.setItem("userData", JSON.stringify(matchingUser));
    sessionStorage.setItem("userRole", matchingUser.role); // Store user role
    console.log("Login successful!");
    matchingUser.role === "customer"
      ? (window.location.href = "index.html")
      : (window.location.href = "adminIndex.html");

    // Optionally redirect to a different page or perform actions based on role
  } else {
    // Login failed
    console.log("Invalid credentials. Please check your email and password.");
  }

  return false;
});

// Secure password validation function (replace with your preferred hashing method)
function validatePassword(inputPassword, storedPassword) {
  return inputPassword === storedPassword;
}
