$(document).ready(function () {
  $('#loginForm').submit(function (event) {
    event.preventDefault();

    const email = $('#email').val();
    const password = $('#password').val();
    const role = $('#role').is(':checked') ? 'admin' : 'user';

    $.ajax({
      url: '/user/login',
      method: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({ email, password, role }),
      success: function (response) {
        if (response.statusCode === 200) {
          /* Login successful */
          const token = document.cookie;
          const userName = response.data.user.fullName;
          const userRole = response.data.user.role;
          const currentUser = response.data.user;

          if (token) {
            if (userRole === role) {
              localStorage.setItem('userName', userName);
              localStorage.setItem('userRole', userRole);
              localStorage.setItem('currentUser', JSON.stringify(currentUser));

              const redirectUrl = userRole === 'admin' ? '/admin' : '/main';

              const successMessage = `Login successful! Welcome, ${userName}.`;
              $('#success-msg .message-text').text(successMessage);
              $('#success-msg').removeClass('hidden').addClass('visible');

              setTimeout(function () {
                window.location.href = redirectUrl;
              }, 2000);
            } else {
              showError('Role mismatch. Access denied.');
            }
          } else {
            console.error('Login token not found in cookie!');
          }
        }
      },
      error: function (jqXHR) {
        let errorMessage = 'Login failed.';

        switch (jqXHR.status) {
          case 404:
            errorMessage = 'User not found.';
            break;
          case 401:
            errorMessage = 'Invalid password.';
            break;
          case 403:
            errorMessage = 'Access denied for non-admin users.';
            break;
          case 400:
            errorMessage = 'Enter email and password.';
            break;
        }

        showError(errorMessage);
      },
    });
  });

  function showError(message) {
    $('.error-msg').addClass('visible').text(message);
  }
});
