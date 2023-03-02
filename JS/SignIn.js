
$(document).ready(function () {
    $("#nextbutton").click(function () {
        event.preventDefault();

        let email = $("#email").val();
        let password = $("#password").val();

        // console.log("button clicked", email, password)

        let obj = {
            email: email,
            password: password
        }

        // console.log("button clicked", obj)

        $.ajax({
            type: "POST",
            url: "http://localhost:5454/api/v1/users/login",
            data: obj,
            success: function (res) {
                alert("data posted succesfully");
                console.log(res)
                localStorage.setItem("token",res.data)
            },
            error: function (error) {
                console.log(error.responseJSON);
            },
        });
        return false;
    });
})
























































































// function validate() {
//     console.log("before email")
//     var email = document.getElementById("inputidemail").value;
//     var email2 = document.getElementById("inputidemail");
//     var emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
//     var password = document.getElementById("inputidpassword").value;
//     var password2 = document.getElementById("inputidpassword");
//     var  passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&-+=()])([a-zA-Z0-9]*).{8,}$/;
   
//     if (emailRegex.test(email) && passwordRegex.test(password)) {
//        console.log("both correct")
//         alert("done");
//         return true;
//     }
//     else if(!emailRegex.test(email)) {
//         console.log("email worng")
//         email2.style.border = "red solid 3px";
//         return false;
//     }
//     else if (passwordRegex.test(password)) {
//         console.log("password wrong")
//         password2.style.border = "red solid 3px";
//         return false;
//     }
//     else  {
//         console.log("both wrong")
//         email2.style.border = "red solid 3px";
//         password2.style.border = "red solid 3px";
//         return false;
//     }

// }
