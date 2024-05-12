// const signupForm = document.getElementById("signupForm");
// const cancelBtn = document.querySelector(".cancel-btn");

// signupForm.addEventListener("submit", (event) => {
//   event.preventDefault(); // Prevent default form submission

//   // Get form data
//   const formData = new FormData(signupForm);
//   let isAllRequiredFieldsFilled = true;

//   // Store user data in session storage
//   if (isAllRequiredFieldsFilled) {
//     const user = {
//       email: formData.get("email"),
//       password: formData.get("password"),
//       confirmPassword: formData.get("confirmPassword"),
//       firstName: formData.get("firstName"),
//       lastName: formData.get("lastName"),
//       address: formData.get("address"),
//       mobileNumber: formData.get("mobileNumber"),
//       registrationDate: new Date(),
//       role: "customer", // Assuming customer role by default
//     };

//     let users = JSON.parse(sessionStorage.getItem("userData")) || [];
//     users.push(user);
//     sessionStorage.setItem("userData", JSON.stringify(users));
//     location.href = "userLogin.html";
//     alert("Create Account successful!");
//   } else {
//     // Handle validation errors (display error messages, etc.)
//     console.error("Form validation failed!");
//     alert("orm validation failed! Please check your fields.");
//   }
// });

// cancelBtn.addEventListener("click", () => {
//   location.href = "index.html";
// });
// signup.js

// signup.js

// document.addEventListener("DOMContentLoaded", () => {
//   const signupForm = document.getElementById("signupForm");
//   const cancelBtn = document.querySelector(".cancel-btn");

//   signupForm.addEventListener("submit", async (event) => {
//     event.preventDefault(); // Prevent default form submission

//     // Get form data
//     const formData = new FormData(signupForm);
//     let isAllRequiredFieldsFilled = true;

//     // Check if all required fields are filled
//     formData.forEach((value, key) => {
//       if (!value.trim()) {
//         isAllRequiredFieldsFilled = false;
//       }
//     });

//     if (isAllRequiredFieldsFilled) {
//       const userData = {
//         email: formData.get("email"),
//         password: formData.get("password"),
//         confirmPassword: formData.get("confirmPassword"),
//         firstName: formData.get("firstName"),
//         lastName: formData.get("lastName"),
//         address: formData.get("address"),
//         mobileNumber: formData.get("mobileNumber"),
//         registrationDate: new Date().toISOString(),
//         role: "customer", // Assuming customer role by default
//       };

//       try {
//         const response = await fetch("http://localhost:8000/user/signup", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(userData),
//         });

//         if (!response.ok) {
//           throw new Error("Failed to create account");
//         }

//         // Redirect to the login page if account creation is successful
//         location.href = "userLogin.html";
//         alert("Account created successfully!");
//       } catch (error) {
//         console.error("Error:", error.message);
//         alert("Failed to create account. Please try again later.");
//       }
//     } else {
//       alert("Please fill in all required fields.");
//     }
//   });

//   cancelBtn.addEventListener("click", () => {
//     location.href = "index.html"; // Redirect to the index page
//   });
// });
// const signupForm = document.getElementById("signupForm");
// const cancelBtn = document.querySelector(".cancel-btn");

// signupForm.addEventListener("submit", async (event) => {
//   event.preventDefault(); // Prevent default form submission

//   // Get form data
//   const formData = new FormData(signupForm);
//   const userData = {
//     email: formData.get("email"),
//     password: formData.get("password"),
//     confirmPassword: formData.get("confirmPassword"),
//     fullName: formData.get("firstName") + " " + formData.get("lastName"),
//     gender: "", // Add gender field if needed
//     address: formData.get("address"),
//     phoneNumber: formData.get("mobileNumber"),
//     registrationDate: new Date().toISOString(),
//     role: "customer", // Assuming customer role by default
//   };

//   try {
//     const response = await fetch("http://localhost:8000/user/signup", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(userData),
//     });

//     if (!response.ok) {
//       throw new Error("Failed to create account");
//     }

//     // Redirect to thankYou.html after successful signup
//     window.location.href = "thankYou.html";
//     alert("Account created successfully!");
//   } catch (error) {
//     console.error("Error:", error.message);
//     alert("Failed to create account. Please try again.");
//   }
// });

// cancelBtn.addEventListener("click", () => {
//   // Redirect to index.html if cancel button is clicked
//   window.location.href = "index.html";
// });
const signupForm = document.getElementById("signupForm");
const cancelBtn = document.querySelector(".cancel-btn");

signupForm.addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevent default form submission

  // Get form data
  const formData = new FormData(signupForm);
  const userData = {
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    fullName: formData.get("fullName"),
    gender: getSelectedGender(),
    address: formData.get("address"),
    phoneNumber: formData.get("phoneNumber"),
    registrationDate: new Date().toISOString(),
    role: "customer", // Assuming customer role by default
  };

  try {
    const response = await fetch("http://localhost:8000/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Failed to create account");
    }

    // Redirect to thankYou.html after successful signup
    window.location.href = "thankYou.html";
    alert("Account created successfully!");
  } catch (error) {
    console.error("Error:", error.message);
    alert("Failed to create account. Please try again.");
  }
});

cancelBtn.addEventListener("click", () => {
  // Redirect to index.html if cancel button is clicked
  window.location.href = "index.html";
});

// Function to get the selected gender from the radio buttons
function getSelectedGender() {
  const genderInputs = document.querySelectorAll('input[name="gender"]');
  let selectedGender = "";
  genderInputs.forEach((input) => {
    if (input.checked) {
      selectedGender = input.value;
    }
  });
  return selectedGender;
}
