$(document).ready(
    function () {
    $("#nextbutton").click(
        function (event) {
        event.preventDefault();

        let firstname = $("#firstname").val();
        let lastname = $("#lastname").val();
        let email = $("#username").val();
        let password = $("#password").val();


        let obj = {
            firstname : firstname,
            lastname : lastname,    
            email: email,
            password: password
        }



        $.ajax({
            type: "POST",
            url: "http://localhost:5454/api/v1/users/",
            data: obj,
            success: function (res) {
                window.location.href = "http://127.0.0.1:5501/Html/SignIn.html";
            },
            error: function (error) {
                console.log(error.responseJSON);
            },
        });
        return false;
    });
})