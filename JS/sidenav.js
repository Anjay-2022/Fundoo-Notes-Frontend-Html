let state=false
function openNav(){
    document.getElementById("sidenavSmall").style.display = "none";
    document.getElementById("sidenav").style.display = "block";
    document.getElementById("main").style.width="82vw";
    document.getElementById("main").style.left="18vw";
    document.getElementById("SaveNoteContainer").style.width="82vw";
}
function closeNav(){
    document.getElementById("sidenavSmall").style.display = "block";
    document.getElementById("sidenav").style.display="none";
    document.getElementById("main").style.width="95vw";
    document.getElementById("main").style.left="5vw";
    document.getElementById("SaveNoteContainer").style.width="95vw";
}