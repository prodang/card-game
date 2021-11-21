var board, card1, card2,  win, time;

$(function (){
    let num, entry;

    num = getNumStorage();
    time = getTimeStorage();
    board = new Board(num,time);
    if(time != 0){
        clock();
    }
    entry = 0;
    win = 0;
    initCards();
    board.build();

    $('#puntuation').val(board.getPunt());
    $('#total').val(board.getPunt());
    $('img').click(function(){

        let i = board.getInd($(this).prop('id'));
        if(board.getCards()[i].getType() == 0){

            entry++;
            relationCard($(this).prop('id'));

            if(card1 == card2){
                $('#'+card1).prop('src','../img/reverso.jpg');
                entry = 0;
                initCards();
            }else{
                $(this).attr('src',board.getCards()[i].getState());
            }
            
            if(entry == 2){
                if(board.isDiferent(card1,card2)){
                    board.subtract();

                    setTimeout(resetCards, 700);
                }else{
                    win += 2;

                    board.add();

                    blockCards();

                    initCards();
                }
                $('#puntuation').val(board.getPunt());
                entry = 0;

                if(win == num){
                    board.calculateTotal();
                    $('#total').val(board.getPunt());
                }
            }
        }                                             
    });
});

function relationCard(id){
    if(card1 == ""){
        card1 = id;
    }else{
        card2 = id;
    }
}

function blockCards(){
    board.blockCard(card1);
    board.blockCard(card2);
}

function clock(){
    $('#clock').val(time);
    if(time == 0){
        board.blockAll();
        if(win != board.getNum()){
            $('#total').val(board.getPunt());
        }
    }else{
        if(win != board.getNum()){
            time--;
            setTimeout(clock, 1000);
        }
    }
}

function initCards(){
    card1 = "";
    card2 = "";
}

function getNumStorage(){
    let dateCards;
    dateCards = localStorage.getItem('images');
    if((dateCards!=null)&&(dateCards!='')){
        return parseInt(dateCards);
    }else{
        return 32;
    }
}

function getTimeStorage(){
    let dateTime;
    dateTime = localStorage.getItem('time');
    if((dateTime!=null)&&(dateTime!=0)){
        return parseInt(dateTime);
    }else{
        $('#clock').val(0);
        return 0;
    }
}

function resetCards(){
    $('#'+card1).attr('src','../img/reverso.jpg');
    $('#'+card2).attr('src','../img/reverso.jpg');
    initCards();
}