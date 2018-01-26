// console.log("yo")
$(document).on("click", "#signIn", function (event) {
    console.log('welcome!')
    event.preventDefault();
    var user = {
        username: $("#username").val().trim(),
        password: $("#pw").val().trim()
    }
    // This is commented out so password doesnt show in frontend console 
    console.log(user)
    if (user.username == "" || user.password === "") {
        $('#signinError').html('Must enter both username and password')
    } else {
        $.post('/signin', user)
            .fail($('#signinError').html('No User Found.'))
            .done(function (response) {
                // console.log(response)
                window.location.href = "/"
            })
    }
});


$(document).on("click", "#signUpForm", function (event) {
    console.log("we were clicked")
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
        } else if(user.email.length < 6 || user.email.length > 128){
            $('#signupError').html('Email must be more than 6 character')
        } else {
            $.post('/signUp', user)
                .fail($('#signupError').html('Validation Error. Please try again.'))
                .done(function (response) {
                    // console.log(response)
                    window.location.href = "/signin"
                })
        }
    }
});