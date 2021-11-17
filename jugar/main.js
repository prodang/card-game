var num, cards, card1, card2, cont;
const NUM_CARTAS = 2;

$(function (){
    num = 20;// getNumberCards();
    cards = new Array(20);
    cont = 0;
    initCards();
    initBoard();
    $('img').click(function(){
        let i = getCard($(this).prop('id'));
        if(cards[i].getType() == 0){
            console.log('ENTRO');
            cont++;
            if(card1 == ""){
                card1 = $(this).prop('id');
                //console.log('Entro1: '+card1);
            }else{
                card2 = $(this).prop('id');
                //console.log('Entro2: '+card2);
            }

            if(card1 == card2){
                //console.log(card1);
                $('#'+card1).prop('src','../img/reverso.jpg');
                cont = 0;
                initCards();
            }else{
                if(cards[i].getState() == 1){
                    $(this).attr('src','../img/copas12.jpg');
                }else{
                    $(this).attr('src','../img/bastos1.jpg');
                }
            }
            
            if(cont == 2){
                if(isDiferent()){
                    setTimeout(resetCards, 700);
                }else{
                    let j = getCard(card1);
                    cards[j].change();
                    cards[i].change();
                    initCards();
                }
                cont = 0;
            }
        }
    });
});

window.onload = clock;
var time = 3;

function clock(){
    $('#clock').val(time);
    if(time == 0){
        alert("Finish");
        for(i=0;i<20;i++){
            cards[i].setType(1);
        }
    }else{
        time -= 1;
        setTimeout(clock, 1000);
    }
}


function initCards(){
    card1 = "";
    card2 = "";
}

function getNumberCards(){
    let cards = localStorage.getItem('images');
    if(cards!=null){
        if(cards=''){
            cards = 32;
        }
    }
    return cards;
}

function isDiferent(){
    let i = getCard(card1);
    let j = getCard(card2);
    return cards[i].getState() != cards[j].getState();
}

function getCard(id){
    for(i=0;i<num;i++){
        if(id == cards[i].getId()){
            return i;
        }
    }
}

function resetCards(){
    $('#'+card1).attr('src','../img/reverso.jpg');
    $('#'+card2).attr('src','../img/reverso.jpg');
    initCards();
}

function initBoard(){
    let k = 0;
    if(num === 20){
        for(i=0;i<5;i++){
            if(i%2==0){
                k = 1;
            }else{
                k=2;
            }
            $('#row1').append("<img id='row0_"+i+"' src='../img/reverso.jpg'>");
            $('#row2').append("<img id='row1_"+i+"' src='../img/reverso.jpg'>");
            $('#row3').append("<img id='row2_"+i+"' src='../img/reverso.jpg'>");
            $('#row4').append("<img id='row3_"+i+"' src='../img/reverso.jpg'>");
            cards[i] = new Card("row0_"+i,k);
            cards[i+5] = new Card("row1_"+i,k);
            cards[i+10] = new Card("row2_"+i,k);
            cards[i+15] = new Card("row3_"+i,k);
        }
    }else if(num === 26){
    
    }else if(num === 32){

    }
}

class Board{
    constructor(numCards){
        this.numCards = numCards;
        this.cards = getCards();
    }

    getCards(){
        let cards = Array(this.numCards);
        if(this.numCards === 20){
            //aleatorio del 0 al 9 en bucle 
            cards = [ 1, 2, 1, 2, 1,
                    1, 2, 1, 2, 1,
                    1, 2, 1, 2, 1,
                    1, 2, 1, 2, 1]
        }else{

        }
        return cards;
    }
}

class Card{
    constructor(id, state){
        this.id = id;
        this.state = state;
        this.type = 0;
    }

    getId(){
        return this.id;
    }

    setId(id){
        this.id = id;
    }
    setState(state){
        this.state = state;
    }
    setType(type){
        this.type = type;
    }
    change(){
        this.type = (this.type+1)%2;
    }
    getType(){
        return this.type;
    }
    getState(){
        return this.state;
    }
}