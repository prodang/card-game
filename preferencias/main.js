$(function (){
    $("#accept").click(action);
});

function action(){
    let images, time;
    images = $("select#images").val();
    time = $("select#time").val();
    localStorage.setItem('images',images);
    localStorage.setItem('time',time);
    loadGame();
}

function loadGame(){
    window.location = "../jugar/index.html";
}