export default class Card{
    
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