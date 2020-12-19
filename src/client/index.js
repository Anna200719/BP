const config = {
  LETTERS_REGX: /^[0-9a-zA-Z]+$/,
};
const logInButton = document.getElementById('log-in-btn');

const isSymbolValid = (userInput) => {
  if (userInput.match(config.LETTERS_REGX)) {
    return true;
  }
  return false;
};

function getlogInParams(event) {
  event.preventDefault();

  const userName = $('#validationCustom01').val();
  const password = $('#validationCustom02').val();
  const companyDB = $('#validationCustom03').val();
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
  if (!isSymbolValid(userName)) {
    $('#invalid-symbol').text('Username should be letters or numbers').show();
  }
  if (!isSymbolValid(password)) {
    $('#invalid-symbol').text('Password should be letters or numbers').show();
  }
  if (!isSymbolValid(companyDB)) {
    $('#invalid-symbol').text('Company should be letters or numbers').show();
  } else if (form[0].checkValidity() === false) {
    event.stopPropagation();
    form[0].classList.add('was-validated');
  } else {
    logIn(userDetails);
  }
  form[0].classList.add('was-validated');
}

logInButton.addEventListener('click', getlogInParams);
