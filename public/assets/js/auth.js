<<<<<<< HEAD
console.log('yo')
$("#signIn").on("click", function (e) {
    e.stopPropagation();
=======
$("#signInForm").submit(function (event) {

    event.preventDefault();
>>>>>>> 1aa9294dcceda5dfca78307cbcf310096355c7fd
    var user = {
        username: $("#username").val().trim(),
        password: $("#pw").val().trim()
    }
    console.log(user)


});


$("#signUpForm").submit(function (event) {

<<<<<<< HEAD
$("#signUp").on("click", function (e) {
    e.stopPropagation();
=======
    event.preventDefault()
>>>>>>> 1aa9294dcceda5dfca78307cbcf310096355c7fd

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