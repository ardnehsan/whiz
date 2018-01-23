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

    $.post('/signUp', {
        data: user,
        success: function(){
            console.log("Success")
        }, 
        error: function(error) {
            console.log(error)
        }
    }).then(function (response) {
            console.log(response)
    });

});