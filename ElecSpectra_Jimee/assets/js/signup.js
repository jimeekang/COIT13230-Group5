const signupForm = document.getElementById("signupForm");
const cancelBtn = document.querySelector(".cancel-btn");

signupForm.addEventListener("submit", event => {
  event.preventDefault(); // Prevent default form submission

  // Get form data
  const formData = new FormData(signupForm);
  let isAllRequiredFieldsFilled = true;

  // Store user data in session storage
  if (isAllRequiredFieldsFilled) {
    const user = {
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      address: formData.get("address"),
      mobileNumber: formData.get("mobileNumber"),
      registrationDate: new Date(),
      role: "customer", // Assuming customer role by default
    };

    let users = JSON.parse(sessionStorage.getItem("userData")) || [];
    users.push(user);
    sessionStorage.setItem("userData", JSON.stringify(users));
    location.href = "userLogin.html";
    alert("Create Account successful!");
  } else {
    // Handle validation errors (display error messages, etc.)
    console.error("Form validation failed!");
    alert("orm validation failed! Please check your fields.");
  }
});

cancelBtn.addEventListener("click", () => {
  location.href = "index.html";
});
