$(document).ready(function () {
  $('#signupForm').on('submit', function (e) {
    e.preventDefault();

    var password = $('#password').val();
    var confirmPassword = $('#confirmPassword').val();

    if (password !== confirmPassword) {
      $('#passwordError').show();
    } else {
      $('#passwordError').hide();

      $.ajax({
        url: '/user/signup',
        type: 'POST',
        data: $(this).serialize(),
        success: function (response) {
          console.log('Signup successful:', response);
          window.location.href = '/loginPage';
        },

        error: function (error) {
          console.log('Error response:', error);

          if (
            error.status === 400 &&
            error.responseJSON.error === 'Email already registered'
          ) {
            $('#emailError').show().text('This email is already registered.');
          } else if (error.status === 500) {
            $('#emailError')
              .show()
              .text('Internal Server Error. Please try again later.');
          } else {
            $('#emailError')
              .show()
              .text('An unexpected error occurred. Please try again.');
          }
        },
      });
    }
  });
});

$('.cancel-btn').on('click', function () {
  window.location.href = '/loginPage';
});
