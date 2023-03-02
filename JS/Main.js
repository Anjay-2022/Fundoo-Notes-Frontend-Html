$(document).ready(
    function () {
        $.get("http://localhost:5454/api/v1/notes/All", function (data) {
            console.log(data); // arry of objects similar to arr in this filea
            console.log(data.data.length);

            for (let i = 0; i < data.data.length; i++) {
                const abc = `
                <div class="takenote3">
                <div class="takenote3title"><input class="takenote3titlefield" type="text" value="${data.data[i].title}">
                    <div class="iconbackground"><img class="takenote3icon" src='../Assets/tack.png'></div>
                </div>
                <textarea class="takenote3inputfield" type="text" >${data.data[i].description}</textarea>
                <div class="takenote3footer">
                    <div class="iconbackground"><img class="takenote3icon" src='../Assets/bell-ring-alarm.png'></div>
                    <div class="iconbackground"><img class="takenote3icon" src='../Assets/add-contact.png'></div>
                    <div class="iconbackground"><img class="takenote3icon" src='../Assets/art.png'></div>
                    <div class="iconbackground"><img class="takenote3icon" src='../Assets/download-file.png'></div>
                    <div class="iconbackground"><img class="takenote3icon" src='../Assets/picture.png'></div>
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
    document.getElementById("takenote1").style.display="none"
    document.getElementById("takenote2").style.display="flex"
    
}
function takenoteTwoclicked() {
    console.log("note 2 clicked")
    document.getElementById("takenote1").style.display="flex"
    document.getElementById("takenote2").style.display="none"
}