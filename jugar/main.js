//import Card  from "./Card.js";

var num, cards, card1, card2, entry, time, punt, win;

$(function (){
    buildDates();
    cards = new Array(num);
    entry = 0;
    win = 0;
    punt = 0;
    initCards();
    initBoard();
    $('#puntuation').val(punt);
    $('#total').val(punt);
    $('img').click(function(){
        let i = getCard($(this).prop('id'));
        if(cards[i].getType() == 0){
            entry++;
            if(card1 == ""){
                card1 = $(this).prop('id');
            }else{
                card2 = $(this).prop('id');
            }

            if(card1 == card2){
                $('#'+card1).prop('src','../img/reverso.jpg');
                entry = 0;
                initCards();
            }else{
                $(this).attr('src',cards[i].getState());
            }
            
            if(entry == 2){
                if(isDiferent()){
                    punt -= 5;
                    $('#puntuation').val(punt);

                    setTimeout(resetCards, 700);
                }else{
                    win += 2;

                    punt += 15;
                    $('#puntuation').val(punt);

                    let j = getCard(card1);
                    cards[j].change();
                    cards[i].change();

                    if(win == num){
                        if(num == 26){
                            punt += 25;
                        }else if(num == 32){
                            punt += 50;
                        }

                        if(time == 60){
                            punt += 100;
                        }else if(time == 90){
                            punt += 75;
                        }else if(time == 120){
                            punt += 50;
                        }else if(time == 150){
                            punt += 25;
                        }
                        $('#total').val(punt);
                    }
                    initCards();
                }
                entry = 0;
            }
        }                                             
    });
});

function clock(){
    $('#clock').val(time);
    if(time == 0){
        alert("Finish");
        for(i=0;i<num;i++){
            cards[i].setType(1);
        }
    }else{
        if(win != num){
            time -= 1;
            setTimeout(clock, 1000);
        }
    }
}


function initCards(){
    card1 = "";
    card2 = "";
}

function buildDates(){
    let dateCards, dateTime;

    dateCards = localStorage.getItem('images');
    if((dateCards!=null)&&(dateCards!='')){
        num = parseInt(dateCards);
    }else{
        num = 32;
    }

    dateTime = localStorage.getItem('time');
    if((dateTime!=null)&&(dateTime!=0)){
        time = parseInt(dateTime);
        clock();
    }else{
        $('#clock').val(0);
    }
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
    let typeCards, limit;

    if(num === 20){
        limit = 5;
    }else{
        limit = 8;
    } 

    typeCards = getTypeCards(num);

    for(i=0;i<4;i++){
        lim = getLimit(num, limit, i);
        for(j=0;j<lim;j++){
            $('#row'+i).append("<img id='row"+i+"_"+j+"' src='../img/reverso.jpg'>");
            cards[j+(limit*i)] = new Card("row"+i+"_"+j,typeCards[j+(limit*i)]);
        }
    }
}

function getLimit(num, limit, i){
    l = limit
    if(l == 5){
        $('#row'+i).css('width','75%');
    }else{
        if((num==26)&&(i==3)){
            l = 2;
            $('#row'+i).css('width','21%');
        }else{
            $('#row'+i).css('width','90%');
        }
    }
    return l;
}

function getTypeCards(num){
    let typeCards = new Array(num);
    let types = [1,2];
    let ind = 0;
    let cont = 1;
    let asignados = 0;
    
    do{
        let i = random(0,(num-1));
        if(typeCards[i] == undefined){
            if(types[ind] == 1){
                typeCards[i] = '../img/copas12.jpg';
            }else{
                typeCards[i] = '../img/bastos1.jpg';
            }
            if(cont == 2){
                cont = 1;
                ind = (ind + 1) % 2; 
            }else{
                cont++;
            }
            asignados++;
        }
    }while(asignados<num);
    return typeCards;
}

function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
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
    
    constructor(id,state){
        this.id = id;
        this.state = state;
        this.type = 0;
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

    getId(){
        return this.id;
    }
    
    getType(){
        return this.type;
    }

    getState(){
        return this.state;
    }

    change(){
        this.type = (this.type+1)%2;
    }
}