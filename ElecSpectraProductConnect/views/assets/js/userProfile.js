import users from "./data.js";

// Here using Function to find a user by email
function findUserByEmail(email) {
  return users.find((user) => user.email === email);
}

// using Function to update user profile
function updateUserProfile(formData) {
  const { email, firstName, lastName, password, address, mobileNumber } =
    formData;

  // Here Finding the user by email
  const user = findUserByEmail(email);

  if (!user) {
    console.error("User not found!");
    return;
  }

  // Update user profile
  user.firstName = firstName;
  user.lastName = lastName;
  user.address = address;
  user.mobileNumber = mobileNumber;

  // If password is provided and not empty, we are updating it
  if (password) {
    user.password = password;
    user.confirmPassword = password; // Assuming confirmPassword is updated with password
  }

  console.log("Profile updated successfully:", user);
}

// Here using Function to initialize form fields with default data
function initializeForm() {
  const defaultUser = users[0]; //Here let's  Assume the first user in the array is the current user

  document.getElementById("email").value = defaultUser.email;
  document.getElementById("firstName").value = defaultUser.firstName;
  document.getElementById("lastName").value = defaultUser.lastName;
  document.getElementById("address").value = defaultUser.address;
  document.getElementById("mobileNumber").value = defaultUser.mobileNumber;
  document.getElementById("password").value = defaultUser.password; // Populating password field with existing password
  document.getElementById("confirmPassword").value = defaultUser.password; // Populating  confirm password field with existing password
}

// Here we use Function to handle form submission
function handleFormSubmit(event) {
  event.preventDefault();

  // Getting form data
  const formData = {
    email: document.getElementById("email").value,
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    password: document.getElementById("password").value,
    confirmPassword: document.getElementById("confirmPassword").value,
    address: document.getElementById("address").value,
    mobileNumber: document.getElementById("mobileNumber").value,
  };

  // Here Checking  if password and confirm password match
  if (formData.password !== formData.confirmPassword) {
    window.alert("Password and confirm password must match!");
    return;
  }

  //Here  Updating user profile
  updateUserProfile(formData);

  // Here Displaying success message
  window.alert("Profile updated successfully!");
}

// Function to handle cancel button click
function handleCancelClick() {
  if (confirm("Are you sure you want to cancel?")) {
    console.log("User canceled profile update.");
  } else {
  }
}

// Adding event listener to save button click
document.getElementById("saveBtn").addEventListener("click", handleFormSubmit);

// Adding event listener to cancel button click
document
  .getElementById("cancelBtn")
  .addEventListener("click", handleCancelClick);

// Calling  initializeForm function when the page content is fully loaded
document.addEventListener("DOMContentLoaded", initializeForm);
