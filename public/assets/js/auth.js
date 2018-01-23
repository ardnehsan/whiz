$("#signInForm").submit(function (event) {

    event.preventDefault();
    var user = {
        username: $("#username").val().trim(),
        password: $("#pw").val().trim()
    }
    console.log(user)


});


$("#signUpForm").submit(function (event) {

    event.preventDefault()

    var user = {
        name: $("#signUpName").val().trim(),
        username: $("#signUpUsername").val().trim(),
        password: $("#signUpPassword").val().trim(),
        email: $("#signUpEmail").val().trim()
    }

    $.post('/api/signUp', user).then(function (response) {
        console.log(response)
    })

});