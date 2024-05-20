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
    if (password !== confirmPassword) {
      alert('Passwords do not match. Please try again.');
      return;
    }
    $.ajax({
      url: '/user/updateProfile',
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({ address, phoneNumber }),
      success: function (data) {
        alert('Profile updated successfully!');

        window.location.href = '/main';
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
