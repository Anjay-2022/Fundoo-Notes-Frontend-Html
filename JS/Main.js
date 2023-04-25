var refesh = true
var colour = "white"
const baseurl="http://localhost:5454/api/v1"
$(document).ready(
    async function () {
        let token = localStorage.getItem("token")
        await $.ajax({
            type: "GET",
            url: `${baseurl}/notes/all`,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', token);
            },
            success: function (res) {
                for (let i = res.data.length - 1; i >= 0; i--) {
                    if (res.data[i].trash == false && res.data[i].archive == false) {
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
            url: `${baseurl}/notes/all`,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', token);
            },
            success: function (res) {
                let data = res.data.map((element) => {
                    if (element.archive == true && element.trash == false) {
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
            url: `${baseurl}/notes/all`,
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
    document.getElementById("takenote1").style.display = "none"
    document.getElementById("takenote2").style.display = "flex"
}
async function takenoteTwoclosebutton() {
    document.getElementById("takenote1").style.display = "flex"
    document.getElementById("takenote2").style.display = "none"

    let title = $("#takenoteTwotitlefield").val();
    let description = $("#takenoteTwoinputfield").val();
    let obj = {
        title: title,
        description: description,
        colour: colour
    }
    let token = localStorage.getItem("token")

    await $.ajax({
        type: "POST",
        url: `${baseurl}/notes/add`,
        data: obj,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
        success: function (res) {
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

    ID = id
    var title = $('#takenote3MODALtitlefield').val(title)
    var title = $('#takenote3MODALinputfield').val(desc)
    document.getElementById("takenote3MODAL").style.backgroundColor = colour
    document.getElementById("takenote3MODALtitlefield").style.backgroundColor = colour
    document.getElementById("takenote3MODALinputfield").style.backgroundColor = colour
    document.getElementById("closebutton").style.backgroundColor = colour
}
async function takenote3MODALclosebuttonfunc() {
    let title = $("#takenote3MODALtitlefield").val();
    let description = $("#takenote3MODALinputfield").val();
    let obj = {
        title: title,
        description: description,
        colour: colour
    }
    let token = localStorage.getItem("token")

    await $.ajax({
        type: "PUT",
        url: `${baseurl}/notes/${ID}`,
        data: obj,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
        success: function (res) {

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
    let token = localStorage.getItem("token")

    await $.ajax({
        type: "PUT",
        url:`${baseurl}/notes/${id}/trash`,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
        success: function (res) {
            console.log(res)
        },
        error: function (error) {
            console.log(error.responseJSON);
        },
    });
    location.reload()
    return false;
}
async function toggleArchive(id) {
    refesh = false
    let token = localStorage.getItem("token")
    await $.ajax({
        type: "PUT",
        url: `${baseurl}/notes/${id}/archive`,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
        success: function (res) {
            console.log(res)
        },
        error: function (error) {
            console.log(error.responseJSON);
        },
    });
    location.reload()
    return false;
}

async function getArchive() {
    document.getElementById("main").style.display = "none"
    document.getElementById("main3").style.display = "none"
    document.getElementById("main2").style.display = "flex"
    document.getElementById("main4").style.display = "none"
}
async function getTrash() {
    document.getElementById("main").style.display = "none"
    document.getElementById("main2").style.display = "none"
    document.getElementById("main3").style.display = "flex"
    document.getElementById("main4").style.display = "none"

}
async function deletenote(id) {

    let token = localStorage.getItem("token")
    await $.ajax({
        type: "DELETE",
        url: `${baseurl}/notes/${id}`,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
        success: function (res) {
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
    let clickedplace = evt.target;
    const main = document.getElementById("main");
    if (clickedplace == main) {
        document.getElementById("takenote1").style.display = "flex"
        document.getElementById("takenote2").style.display = "none"
        colour = "white"
        document.getElementById("takenote2").style.backgroundColor = colour
        document.getElementById("takenoteTwotitlefield").style.backgroundColor = colour
        document.getElementById("takenoteTwoinputfield").style.backgroundColor = colour
        document.getElementById("takenoteTwoclosebutton").style.backgroundColor = colour
    }
})
function closenote2() {
    document.getElementById("takenote1").style.display = "flex"
    document.getElementById("takenote2").style.display = "none"
    colour = "white"
    colour = "white"
    document.getElementById("takenote2").style.backgroundColor = colour
    document.getElementById("takenoteTwotitlefield").style.backgroundColor = colour
    document.getElementById("takenoteTwoinputfield").style.backgroundColor = colour
    document.getElementById("takenoteTwoclosebutton").style.backgroundColor = colour
}




function getallnotes() {
    document.getElementById("main").style.display = "flex"
    document.getElementById("main2").style.display = "none"
    document.getElementById("main3").style.display = "none"
    document.getElementById("main4").style.display = "none"

}
function setcolour(colourcode) {
    colour = colourcode
    $(".btn").popover('hide');
    document.getElementById("takenote3MODAL").style.backgroundColor = colourcode
    document.getElementById("takenote3MODALtitlefield").style.backgroundColor = colourcode
    document.getElementById("takenote3MODALinputfield").style.backgroundColor = colourcode
    document.getElementById("closebutton").style.backgroundColor = colourcode
    document.getElementById("takenote2").style.backgroundColor = colourcode
    document.getElementById("takenoteTwotitlefield").style.backgroundColor = colourcode
    document.getElementById("takenoteTwoinputfield").style.backgroundColor = colourcode
    document.getElementById("takenoteTwoclosebutton").style.backgroundColor = colourcode
}

function refresh() {
    location.reload()
    return false;
}
let previousKey = ""
async function search() {
    let key = document.getElementById("search").value
    if (key == "") return
    document.getElementById("main").style.display = "none"
    document.getElementById("main2").style.display = "none"
    document.getElementById("main3").style.display = "none"
    document.getElementById("main4").style.display = "flex"

    let token = localStorage.getItem("token")
    if (previousKey !== key) {
        await $.ajax({
            type: "GET",
            url: `${baseurl}/notes/all`,
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