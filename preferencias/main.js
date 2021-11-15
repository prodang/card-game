$(function (){
    $("#accept").click(action);
});

function action(){
    let images = $("select#images").val();
    let time = $("select#time").val();
    localStorage.setItem('images',images);
    localStorage.setItem('time',time);
    loadGame();
}

function loadGame(){
    window.location = "../jugar/index.html";
}