const logInButton = document.getElementById('log-in-btn');

function getlogInParams(event) {
  event.preventDefault();

  const userName = document.getElementById('validationCustom01').value;
  const password = document.getElementById('validationCustom02').value;
  const companyDB = document.getElementById('validationCustom03').value;
  const userDetails = { userName, password, companyDB };

  function logIn() {
    $.ajax({
      type: 'POST',
      url: '/login',
      data: JSON.stringify({
        username: userDetails.userName,
        password: userDetails.password,
        companyDB: userDetails.companyDB,
      }),
      dataType: 'json',
      contentType: 'application/json',
      success(data) {
        if (data.redirect) {
          window.location.href = data.redirect;
        }
      },
      error(xhr) {
        const err = xhr.responseText;
        $('#message').show(err);
      },
    });
  }

  const form = document.getElementsByClassName('needs-validation');
  if (form[0].checkValidity() === false) {
    event.stopPropagation();
    form[0].classList.add('was-validated');
  } else {
    logIn(userDetails);
  }
  form[0].classList.add('was-validated');
}

logInButton.addEventListener('click', getlogInParams);
