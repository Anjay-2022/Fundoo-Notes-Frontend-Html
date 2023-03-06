$(document).ready(
    function () {  
        $.get("http://localhost:5454/api/v1/notes/All", function (data) {
            console.log(data); // arry of objects similar to arr in this filea
            console.log(data.data.length);
            //console.log(data.data[5]._id)
            let id=0;
            for (let i = 1; i < data.data.length; i++) {
                id = data.data[i]._id
                console.log(id)
                const abc = `
                <div class="takenote3" value="click" onclick='() => modal(${id})'  >
                <div class="takenote3title" ><input class="takenote3titlefield" type="text" value="${data.data[i].title}">
                    <div class="iconbackground"><img class="takenote3icon" src='../Assets/tack.png'></div>
                </div>
                <textarea class="takenote3inputfield" type="text" >${data.data[i].description} ${data.data[i]._id}</textarea>
                <div class="takenote3footer">
                    <div class="iconbackground"><img class="takenote3icon" src='../Assets/bell-ring-alarm.png'></div>
                    <div class="iconbackground"><img class="takenote3icon" src='../Assets/add-contact.png'></div>
                    <div class="iconbackground"><img class="takenote3icon" src='../Assets/art.png'></div>
                    <div class="iconbackground"><img class="takenote3icon" src='../Assets/download-file.png'></div>
                    <div class="iconbackground"><img class="takenote3icon" onclick='takenote3icondelete(${data.data[i]._id})'  src='../Assets/delete.png'></div>
                    <div class="iconbackground"><img class="takenote3icon" src='../Assets/dots.png'></div>
                </div>
            </div>             
           `;
                $(".SaveNoteContainer").append(abc);
            }
        });

    }
);


function takenoteOneclicked() {
    console.log("note 1 clicked")
    document.getElementById("takenote1").style.display = "none"
    document.getElementById("takenote2").style.display = "flex"

}

function takenoteTwoclosebutton() {
    console.log("note 2 clicked")
    document.getElementById("takenote1").style.display = "flex"
    document.getElementById("takenote2").style.display = "none"

    //apicall
    let title = $("#takenoteTwotitlefield").val();
    let description = $("#takenoteTwoinputfield").val();

    console.log("button clicked", title, description)

    let obj = {
        title: title,
        description: description
    }

    console.log("button clicked", obj)
    console.log(localStorage.getItem("token"))
    let token = localStorage.getItem("token")
    console.log("--this is token", token)

    $.ajax({
        type: "POST",
        url: "http://localhost:5454/api/v1/notes/add",
        data: obj,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },

        success: function (res) {
            alert("Note created succesfully");
            console.log(res)
        },
        error: function (error) {
            console.log(error.responseJSON);
        },
    });
        //page refersh
       location.reload()
       return false;    
}

function takenote3icondelete(id){
     console.log("-----DELETE Z---------",id)
}
function myfunction(text){
    console.log(" BULB  hello",text)
}
function modal(a){
    console.log("take note 3 container is calling",a)

    // for(let i=0;i<arr.length;i++){
    //     console.log(arr[i])
    // }
}
