var refesh = true
var colour = "white"
$(document).ready(
    async function () {
        let token = localStorage.getItem("token")
        await $.ajax({
            type: "GET",
            url: "http://localhost:5454/api/v1/notes/all",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', token);
            },
            success: function (res) {
                for (let i = res.data.length - 1; i >= 0; i--) {

                    if ( res.data[i].trash==false &&  res.data[i].archive==false) {
                        //console.log(res.data[i].colour)
                        const abc = `
                            <div class="takenote3" id="takenote3" style="background-color:${res.data[i].colour}" onclick='copynote3Tomodal("${res.data[i].title}","${res.data[i].description}","${res.data[i]._id}")'>
                            <div class="takenote3title" data-toggle="modal" data-target="#myModal"><div class="takenote3titlefield" id="takenote3titlefield" type="text" value="" >${res.data[i].title}</div>
                                <div class="iconbackground"><img class="takenote3icon" src='../Assets/tack.png'></div>
                            </div>
                            <div class="takenote3inputfield" id="takenote3inputfield"type="text" data-toggle="modal" data-target="#myModal" onclick='copynote3Tomodal("${res.data[i].title}","${res.data[i].description}","${res.data[i]._id}","${res.data[i].colour}")'>${res.data[i].description}</div>
                            <div class="takenote3footer">
                                <div class="iconbackground"><img class="takenote3icon" src='../Assets/bell-ring-alarm.png'></div>
                                <div class="iconbackground"><img class="takenote3icon" src='../Assets/add-contact.png'></div>
                                <div class="iconbackground"><img class="takenote3icon" src='../Assets/art.png'></div>
                                <div class="iconbackground"><img class="takenote3icon" onclick='toggleArchive("${res.data[i]._id}")'  src='../Assets/download-file.png'></div>
                                <div class="iconbackground"><img class="takenote3icon" onclick='toggleTrash("${res.data[i]._id}")'  src='../Assets/delete.png'></div>
                                <div class="iconbackground"><img class="takenote3icon" src='../Assets/dots.png'></div>
                            </div>
                        </div>             
                       `;
                        $(".SaveNoteContainerclass").append(abc);
                    }
                }
            },
            error: function (error) {
                console.log(error.responseJSON);
            },
        });

        $(".btn").popover({
            html: true,
            content: function () {
                var content = $(this).attr("content");
                return $(content).children(".popover-body").clone(true).removeClass('hidden')
            },
            title: "Select colour for background",
            placement: "bottom",
        });

        let color = ["#b4eeb4", "#eedd82", "#82eedd", "#00FF00", "#8293ee", "#FFFF00", "#eea782", "#dd82ee"]
        for (let i = 0; i < color.length; i++) {
            // console.log(color[i]);
            let code = `<div class="colourtile" style="display: flex;flex-direction: row;height: 20px;width: 20px;background-color: ${color[i]}; border-radius: 100%;" onclick='setcolour("${color[i]}")'></div>`
            $(".popover-body").append(code);
        }
        
        $(".logOut").popover({
            html: true,
            title: localStorage.getItem("email"),
            content: function () {
                var content = $(this).attr("content");
                return $(content).children(".signout-body").clone(true).removeClass('hidden')
            },
            placement: "bottom",
        });

        await $.ajax({
            type: "GET",
            url: "http://localhost:5454/api/v1/notes/all",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', token);
            },
            success: function (res) {
                let data = res.data.map((element) => {
                    if (element.archive == true &&  element.trash == false ) {
                        const abc = `
                        <div class="takenote3" id="takenote3" style="background-color:${element.colour}" >
                        <div class="takenote3title" data-toggle="modal" data-target="#myModal"><div class="takenote3titlefield" type="text" value="${element.title}" onclick='copynote3Tomodal("${element.title}","${element.description}","${element._id}")'>${element.title}</div>
                            <div class="iconbackground"><img class="takenote3icon" src='../Assets/tack.png'></div>
                        </div>
                        <div class="takenote3inputfield" type="text" data-toggle="modal" data-target="#myModal" onclick='copynote3Tomodal("${element.title}","${element.description}","${element._id}")'>${element.description}</div>
                        <div class="takenote3footer">
                            <div class="iconbackground"><img class="takenote3icon" src='../Assets/bell-ring-alarm.png'></div>
                            <div class="iconbackground"><img class="takenote3icon" src='../Assets/add-contact.png'></div>
                            <div class="iconbackground"><img class="takenote3icon" src='../Assets/art.png'></div>
                            <div class="iconbackground"><img class="takenote3icon" onclick='toggleArchive("${element._id}")'  src='../Assets/download-file.png'></div>
                            <div class="iconbackground"><img class="takenote3icon" src='../Assets/dots.png'></div>
                        </div>
                    </div>             
                    `; $(".Archive").append(abc);
                    }
                })
            },
            error: function (error) {
                console.log(error.responseJSON);
            },
        })


        await $.ajax({
            type: "GET",
            url: "http://localhost:5454/api/v1/notes/all",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', token);
            },
            success: function (res) {
                let data = res.data.map((element) => {
                    if (element.trash == true && element.archive == false) {
                        const abc = `
                        <div class="takenote3" id="takenote3" style="background-color:${element.colour}" >
                        <div class="takenote3title" data-toggle="modal" data-target="#myModal"><div class="takenote3titlefield" type="text" value="${element.title}" onclick='copynote3Tomodal("${element.title}","${element.description}","${element._id}")'>${element.title}</div>
                            <div class="iconbackground"><img class="takenote3icon" src='../Assets/tack.png'></div>
                        </div>
                        <div class="takenote3inputfield" type="text" data-toggle="modal" data-target="#myModal" onclick='copynote3Tomodal("${element.title}","${element.description}","${element._id}")'>${element.description}</div>
                        <div class="takenote3footer">

                            <button class="restoreButton" style="background-color:${element.colour}"
                            onclick='toggleTrash("${element._id}")'>Restore</button>
                            <button class="restoreButton" style="background-color:${element.colour}" onclick='deletenote("${element._id}")'>Delete</button>

                        </div>
                    </div>             
                    `; $(".Trash").append(abc);
                    }
                })
            },
            error: function (error) {
                console.log(error.responseJSON);
            },
        })
});


function takenoteOneclicked() {
    // console.log("note 1 clicked")
    document.getElementById("takenote1").style.display = "none"
    document.getElementById("takenote2").style.display = "flex"
}
async function takenoteTwoclosebutton() {
    // console.log("note 2 clicked")
    document.getElementById("takenote1").style.display = "flex"
    document.getElementById("takenote2").style.display = "none"

    //apicall
    let title = $("#takenoteTwotitlefield").val();
    let description = $("#takenoteTwoinputfield").val();

    // console.log("button clicked", title, description)

    let obj = {
        title: title,
        description: description,
        colour: colour
    }
    // console.log(obj);
    let token = localStorage.getItem("token")

    await $.ajax({
        type: "POST",
        url: "http://localhost:5454/api/v1/notes/add",
        data: obj,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
        success: function (res) {
            // alert("Note created succesfully");
            console.log(res)
        },
        error: function (error) {
            console.log(error.responseJSON);
        },
    });
  
    location.reload()
    return false;
}
let ID = ''
function copynote3Tomodal(title, desc, id, colour) {
    //  console.log(title, desc, id,colour);
    ID = id
    var title = $('#takenote3MODALtitlefield').val(title)
    var title = $('#takenote3MODALinputfield').val(desc)
    document.getElementById("takenote3MODAL").style.backgroundColor = colour
    document.getElementById("takenote3MODALtitlefield").style.backgroundColor = colour
    document.getElementById("takenote3MODALinputfield").style.backgroundColor = colour
    document.getElementById("closebutton").style.backgroundColor = colour
}
async function takenote3MODALclosebuttonfunc() {
    // UPdate  notes api call
    // console.log("close button clicked")

    let title = $("#takenote3MODALtitlefield").val();
    let description = $("#takenote3MODALinputfield").val();

    // console.log("button clicked", title, description)

    let obj = {
        title: title,
        description: description,
        colour: colour
    }
    // console.log(obj, ID, colour)
    let token = localStorage.getItem("token")

    await $.ajax({
        type: "PUT",
        url: `http://localhost:5454/api/v1/notes/${ID}`,
        data: obj,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
        success: function (res) {
            // alert("Note updated succesfully");
            console.log(res)
        },
        error: function (error) {
            console.log(error.responseJSON);
        },
    });
    location.reload()
    return false;

}

async function toggleTrash(id) {
    // console.log("id---", id)
    let token = localStorage.getItem("token")

    await $.ajax({
        type: "PUT",
        url: `http://localhost:5454/api/v1/notes/${id}/trash`,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
        success: function (res) {
            // alert("Note marked trash succesfully");
            console.log(res)
        },
        error: function (error) {
            console.log(error.responseJSON);
        },
    });
    // page refesh
    location.reload()
    return false;
}
async function toggleArchive(id) {
    refesh = false
    // console.log("archive call");
    let token = localStorage.getItem("token")
    await $.ajax({
        type: "PUT",
        url: `http://localhost:5454/api/v1/notes/${id}/archive`,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
        success: function (res) {
            // alert("Note mark archive succesfully");
            console.log(res)
        },
        error: function (error) {
            console.log(error.responseJSON);
        },
    });
    //page refesh
    location.reload()
    return false;
}

async function getArchive() {
    // console.log("Archive call");
    document.getElementById("main").style.display = "none"
    document.getElementById("main3").style.display = "none"
    document.getElementById("main2").style.display = "flex"
    document.getElementById("main4").style.display = "none"
}
async function getTrash() {

    // console.log("Trash call");
    document.getElementById("main").style.display = "none"
    document.getElementById("main2").style.display = "none"
    document.getElementById("main3").style.display = "flex"
    document.getElementById("main4").style.display = "none"

}
async function deletenote(id) {
    
    let token = localStorage.getItem("token")
    await $.ajax({
        type: "DELETE",
        url: `http://localhost:5454/api/v1/notes/${id}`,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
        success: function (res) {
            // alert("Note deleted succesfully");
            console.log(res)
        },
        error: function (error) {
            console.log(error.responseJSON);
        },
    });
    location.reload()
    return false;

}

document.addEventListener("click", (evt) => {
    // console.log("hello")
    let clickedplace = evt.target; // clicked element 
    // console.log(clickedplace)
    const main = document.getElementById("main");
    // console.log(takenote2)
    if (clickedplace == main) {
        document.getElementById("takenote1").style.display = "flex"
        document.getElementById("takenote2").style.display = "none"
    }
})





function getallnotes() {
    document.getElementById("main").style.display = "flex"
    document.getElementById("main2").style.display = "none"
    document.getElementById("main3").style.display = "none"
    document.getElementById("main4").style.display = "none"

}
function setcolour(colourcode) {
    colour = colourcode
    // console.log(colour)
    $(".btn").popover('hide');
    document.getElementById("takenote3MODAL").style.backgroundColor = colourcode
    document.getElementById("takenote3MODALtitlefield").style.backgroundColor = colourcode
    document.getElementById("takenote3MODALinputfield").style.backgroundColor = colourcode
    document.getElementById("closebutton").style.backgroundColor = colourcode
}

function refresh() {
    location.reload()
    return false;
}
let previousKey = ""
async function search() {
    let key = document.getElementById("search").value
    if(key=="") return
    document.getElementById("main").style.display = "none"
    document.getElementById("main2").style.display = "none"
    document.getElementById("main3").style.display = "none"
    document.getElementById("main4").style.display = "flex"

    let token = localStorage.getItem("token")
    // console.log(previousKey, key)
    if (previousKey !== key ) {
        await $.ajax({
            type: "GET",
            url: "http://localhost:5454/api/v1/notes/all",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', token);
            },
            success: function (res) {
                let data = res.data.map((element) => {
                    if (element.title.search(key) != -1 || element.description.search(key) != -1) {
                        const abc = `
                            <div class="takenote3" id="takenote3" style="background-color:${element.colour}" >
                            <div class="takenote3title" data-toggle="modal" data-target="#myModal"><div class="takenote3titlefield" id="takenote3titlefield" type="text" value="" onclick='copynote3Tomodal("${element.title}","${element.description}","${element._id}")'>${element.title}</div>
                                <div class="iconbackground"><img class="takenote3icon" src='../Assets/tack.png'></div>
                            </div>
                            <div class="takenote3inputfield" id="takenote3inputfield"type="text" data-toggle="modal" data-target="#myModal" onclick='copynote3Tomodal("${element.title}","${element.description}","${element._id}","${element.colour}")'>${element.description}</div>
                            <div class="takenote3footer">
                                <div class="iconbackground"><img class="takenote3icon" src='../Assets/bell-ring-alarm.png'></div>
                                <div class="iconbackground"><img class="takenote3icon" src='../Assets/add-contact.png'></div>
                                <div class="iconbackground"><img class="takenote3icon" src='../Assets/art.png'></div>
                                <div class="iconbackground"><img class="takenote3icon" onclick='toggleArchive("${element._id}")'  src='../Assets/download-file.png'></div>
                                <div class="iconbackground"><img class="takenote3icon" onclick='toggleTrash("${element._id}")'  src='../Assets/delete.png'></div>
                                <div class="iconbackground"><img class="takenote3icon" src='../Assets/dots.png'></div>
                            </div>
                        </div>             
                       `;
                        $(".searchresult").append(abc);
                    }
                })
            },
            error: function (error) {
                console.log(error.responseJSON);
            },

        });
        previousKey = key
    }
}

function logoutfunc() {
    localStorage.clear()
}