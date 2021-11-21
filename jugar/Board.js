class Board{
    constructor(num, time){
        this.num = num;
        this.time = time;
        this.cards = new Array(num);
        this.punt = 0;
    }

    getTime(){
        return this.time;
    }

    getNum(){
        return this.num;
    }

    getCards(){
        return this.cards;
    }

    getPunt(){
        return this.punt;
    }

    blockAll(){
        for(let i=0;i<this.num;i++){
            this.cards[i].setType(1);
        }
    }

    build(){
        let typeCards, limit, lim;
    
        if(this.num === 20){
            limit = 5;
        }else{
            limit = 8;
        } 
    
        typeCards = this.getTypeCards();
    
        for(let i=0;i<4;i++){
            lim = this.getLimit(limit, i);
            for(let j=0;j<lim;j++){
                $('#row'+i).append("<img id='row"+i+"_"+j+"' src='../img/reverso.jpg'>");
                this.cards[j+(limit*i)] = new Card("row"+i+"_"+j,typeCards[j+(limit*i)]);
            }
        }
    }

    getTypeCards(){
        let typeCards, types, ind, cont, asignados, i;

        typeCards = new Array(this.num);
        types = [1,2];
        ind = 0;
        cont = 1;
        asignados = 0;
        
        do{
            i = this.random(0,(this.num-1));
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
        }while(asignados<this.num);

        return typeCards;
    }

    random(min, max) {
        return Math.floor((Math.random() * (max - min + 1)) + min);
    }

    getLimit(limit, i){
        let l;
        l = limit
        if(l == 5){
            $('#row'+i).css('width','75%');
        }else{
            if((this.num==26)&&(i==3)){
                l = 2;
                $('#row'+i).css('width','21%');
            }else{
                $('#row'+i).css('width','90%');
            }
        }
        return l;
    }

    add(){
        this.punt += 15;
    }

    subtract(){
        this.punt -= 5;
    }

    calculateTotal(){
        if(this.num == 26){
            this.punt += 25;
        }else if(this.num == 32){
            this.punt += 50;
        }

        if(this.time == 60){
            this.punt += 100;
        }else if(this.time == 90){
            this.punt += 75;
        }else if(this.time == 120){
            this.punt += 50;
        }else if(this.time == 150){
            this.punt += 25;
        }
    }

    isDiferent(card1, card2){
        let i, j;
        i = this.getInd(card1);
        j = this.getInd(card2);
        return this.cards[i].getState() != this.cards[j].getState();
    }

    getInd(id){
        for(let i=0;i<this.num;i++){
            if(id == this.cards[i].getId()){
                return i;
            }
        }
    }

    blockCard(card){
        let i;
        i = this.getInd(card);
        this.cards[i].change();
    }
}
