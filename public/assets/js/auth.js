console.log('yo')
$("#signIn").on("click", function (e) {
    event.preventDefault()
    var user = {
        username: $("#username").val().trim(),
        password: $("#pw").val().trim()
    }
    console.log(user)

    $.post('/api/login', user).then(function (response) {
        console.log(response)
    })

})

$("#signUp").on("click", function (e) {
    event.preventDefault()

    var user = {
        name: $("#signUpName").val().trim(),
        username: $("#signUpUsername").val().trim(),
        password: $("#signUpPassword").val().trim(),
        email: $("#signUpEmail").val().trim()
    }
    console.log(user)

    $.post('/api/signUp', user).then(function (response) {
        console.log(response)
    })

})