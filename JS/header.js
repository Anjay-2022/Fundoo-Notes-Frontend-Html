function threelineicon() {
    console.log("3lineicon clicked with state",state)

    if(!state){
        document.getElementById("sidenavSmall").style.display = "none";
        document.getElementById("sidenav").style.display = "block";
        document.getElementById("main").style.width="82vw";
        document.getElementById("main").style.left="18vw";
        document.getElementById("SaveNoteContainer").style.width="82vw";
        state=true
    } else {
        document.getElementById("sidenavSmall").style.display = "block";
        document.getElementById("sidenav").style.display="none";
        document.getElementById("main").style.width="95vw";
        document.getElementById("main").style.left="5vw";
        document.getElementById("SaveNoteContainer").style.width="95vw";
        state=false
    }
}