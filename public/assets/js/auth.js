console.log("yo")
$(document).on("click", "#signInForm", function (event) {
    console.log('welcome!')
    event.preventDefault();
    var user = {
        username: $("#username").val().trim(),
        password: $("#pw").val().trim()
    }
    // This is commented out so password doesnt show in frontend console console.log(user)


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

    $.post('/signUp', user).then(function (response) {
        // commented out so password will not show in terminal console.log(response)
    });

});