$(document).on("click", "#signIn", function (event) {
    event.preventDefault();
    var user = {
        username: $("#username").val().trim(),
        password: $("#pw").val().trim()
    }
    if (user.username == "" || user.password === "") {
        $('#signinError').html('Must enter both username and password')
    } else {
        $.post('/signin', user)
            .fail(function (response) {
                $('#signinError').html(response.responseText)
            })
            .done(function (response) {
                window.location.href = "/"
                console.log(response)
            })
    }
});


$(document).on("click", "#signUpForm", function (event) {
    event.preventDefault()

    var user = {
        name: $("#signUpName").val().trim(),
        username: $("#signUpUsername").val().trim(),
        password: $("#signUpPassword").val().trim(),
        email: $("#signUpEmail").val().trim()
    }
    if (user.name === "" || user.username === "" || user.password === "" || user.email === "") {
        $('#signupError').html('Must fill out all fields')
    } else {
        if (user.username.length < 6 || user.username.length > 128) {
            $('#signupError').html('Username must be more than 6 character')
        } else if (user.email.length < 6 || user.email.length > 128) {
            $('#signupError').html('Email must be more than 6 character')
        } else {
            $.post('/signUp', user)
                .fail(function (response) {
                    $('#signupError').html('Validation Error. Please try again.')
                })
                .done(function (response) {
                    window.location.href = "/signin"
                })
        }
    }
});