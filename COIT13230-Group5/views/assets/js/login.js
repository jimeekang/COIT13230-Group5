$(document).ready(function () {
  $('#loginForm').submit(function (event) {
    event.preventDefault();

    const email = $('#email').val();
    const password = $('#password').val();

    $.ajax({
      url: '/user/login',
      method: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({
        email: email,
        password: password,
      }),
      success: function (response) {
        console.log(response.data);

        if (response.statusCode === 200) {
          // Login successful
          const token = document.cookie;
          const userName = response.data.user.fullName;
          const userRole = response.data.user.role;
          const currentUser = response.data.user;

          if (token) {
            localStorage.setItem('userName', userName);
            localStorage.setItem('userRole', userRole);
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            if (userRole) {
              window.location.href = '/main';
            } else {
              console.error('Unknown user role:', role);
            }
          } else {
            console.error('Login token not found in cookie!');
          }
        } else {
          // Login failed .error-msg
          let errorMessage = 'Login failed.';

          if (response.statusCode === 404 || response.statusCode === 401) {
            errorMessage = 'Invalid email or password.';
          }
          $('.error-msg').addClass('visible');
          $('.error-msg').text(errorMessage);
        }
      },
      error: function (error) {
        $('.error-msg').text(
          'An error occurred during login. Please try again.'
        );
      },
    });
  });
});
