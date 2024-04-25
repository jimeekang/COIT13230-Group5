const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", event => {
  event.preventDefault(); // Prevent default form submission

  // Get form data
  const formData = new FormData(signupForm);

  // Log data to console
  console.log("Form Data:");
  for (const [key, value] of formData.entries()) {
    console.log(key, ":", value);
  }

  // Send data to server (using Fetch API)
  fetch(signupForm.action, {
    method: "POST",
    body: formData,
  })
    .then(response => {
      if (!response.ok) {
        console.error("Error sending data:", response.statusText);
        // Handle error (e.g., display error message to user)
      } else {
        console.log("Data sent successfully!");
        // Handle successful response (e.g., redirect to confirmation page)
      }
    })
    .catch(error => {
      console.error("Error sending data:", error);
      // Handle network or other errors
    });
});
