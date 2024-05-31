$(document).ready(function () {
  const userId = JSON.parse(localStorage.getItem('currentUser'))._id;

  $.ajax({
    url: `/user/${userId}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    success: function (data) {
      $('#email').val(data.data.email);
      $('#fullName').val(data.data.fullName);
      $('#address').val(data.data.address);
      $('#mobileNumber').val(data.data.phoneNumber);
    },
    error: function (xhr, status, error) {
      alert('An error occurred while fetching the profile. Please try again.');
      console.error('Error:', error);
    },
  });

  $('#userProfileForm').submit(function (event) {
    event.preventDefault();

    const address = $('#address').val();
    const phoneNumber = $('#mobileNumber').val();
    const password = $('#password').val();
    const confirmPassword = $('#confirmPassword').val();

    $.ajax({
      url: '/user/updateProfile',
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({ address, phoneNumber }),
      success: function (data) {
        if (password !== confirmPassword) {
          $('#passwordError').show();
        } else {
          $('#passwordError').hide();
          $('#successModal').modal('show');
        }
      },
      error: function (xhr, status, error) {
        alert(
          'An error occurred while updating the profile. Please try again.'
        );
        console.error('Error:', error);
      },
    });
  });

  $('#cancelBtn').click(function () {
    window.location.reload();
  });
});
