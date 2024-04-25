const loginForm = document.querySelector("form");

let acutuID = "kjm12081@gmail.com";
let actuPw = 123456;

loginForm.addEventListener("submit", event => {
  event.preventDefault();

  // Store credentials in sessionStorage
  sessionStorage.setItem("userID", actuID);
  sessionStorage.setItem("userPW", actuPw);

  let inputId = this.email.value;
  let inputPw = this.password.value;

  inputId === acutuID && inputPw === actuPw
    ? console.log("success")
    : console.log("check agine");

  return false;
});
