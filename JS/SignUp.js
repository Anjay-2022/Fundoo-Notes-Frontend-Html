$(document).ready(
    function () {
    $("#nextbutton").click(
        function () {
        event.preventDefault();

        let firstname = $("#firstname").val();
        let lastname = $("#lastname").val();
        let email = $("#username").val();
        let password = $("#password").val();

        // console.log("button clicked",firstname,lastname, email, password)

        let obj = {
            firstname : firstname,
            lastname : lastname,    
            email: email,
            password: password
        }

        // console.log("button clicked", obj)

        $.ajax({
            type: "POST",
            url: "http://localhost:5454/api/v1/users/registerUser",
            data: obj,
            success: function (res) {
                alert("data posted succesfully");
                console.log(res)
            },
            error: function (error) {
                console.log(error.responseJSON);
            },
        });
        return false;
    });
})