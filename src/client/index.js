
const logInButton = document.getElementById("log-in-btn");


logInButton.addEventListener('click', getlogInParams);

function getlogInParams(event) {
    event.preventDefault();

    var userName = document.getElementById("validationCustom01").value;
    var password = document.getElementById("validationCustom02").value;
    var companyDB = document.getElementById("validationCustom03").value;
    const userDetails={
       "userName" : userName,
       "password": password,
       "companyDB": companyDB
    }
    var form = document.getElementsByClassName('needs-validation');
    if (form[0].checkValidity() === false) {
        event.stopPropagation();
        form[0].classList.add('was-validated');
    }
    else{
        logIn(userDetails);
    }
    
    form[0].classList.add('was-validated');
}

function logIn(userDetails) {
    $.ajax({
        type: "POST",
        url: "/login",
        data: JSON.stringify({
            username: userDetails.userName,
            password: userDetails.password,
            companyDB: userDetails.companyDB
        }),  
        dataType : "json",
        contentType: "application/json",
    success: function(data, textStatus, jqXHR) {
        if (data.redirect)
        {
            window.location.href = data.redirect;
        }
    },
    error: function(xhr, status, error) {
        var err =  xhr.responseText;
        $('#message').show();
    }
})
}