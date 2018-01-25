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
        $.post('/signin', user).then(function (response) {
            console.log(response)
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

        $.post('/signUp', user).then(function (response) {
            // commented out so password will not show in terminal console.log(response)
            window.location.href = "/signin"
        })
    }
});