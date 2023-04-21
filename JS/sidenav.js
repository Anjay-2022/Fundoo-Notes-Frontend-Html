let state=false
function openNav(){
    document.getElementById("sidenavSmall").style.display = "none";
    document.getElementById("sidenav").style.display = "block";
    document.getElementById("main").style.left="18vw";
    document.getElementById("main").style.width="82vw";
    document.getElementById("main2").style.left="18vw";
    document.getElementById("main2").style.width="82vw";
    document.getElementById("main3").style.left="18vw";
    document.getElementById("main3").style.width="82vw";
    document.getElementById("main4").style.left="18vw";
    document.getElementById("main4").style.width="82vw";
}
function closeNav(){
    document.getElementById("sidenavSmall").style.display = "block";
    document.getElementById("sidenav").style.display="none";
    document.getElementById("main").style.left="5vw";
    document.getElementById("main").style.width="95vw";
    document.getElementById("main3").style.left="5vw";
    document.getElementById("main3").style.width="95vw";
    document.getElementById("main4").style.left="5vw";
    document.getElementById("main4").style.width="95vw";
}