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
        console.log(response);

        if (response.statusCode === 200) {
          // Login successful
          const token = document.cookie;
          const userName = response.user;
          const userRole = response.role;

          if (token) {
            localStorage.setItem('userName', userName);
            localStorage.setItem('userRole', userRole);

            if (userRole === 'user') {
              window.location.href = '/main';
            } else if (userRole === 'admin') {
              window.location.href = '/adminMain';
            } else {
              console.error('Unknown user role:', role);
            }
          } else {
            console.error('Login token not found in cookie!');
          }
        } else {
          // Login failed
          console.error('Login failed:', response.error);
        }
      },
      error: function (error) {
        console.error('AJAX error:', error);
      },
    });
  });
});
