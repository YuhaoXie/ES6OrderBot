const Order = require("./assignment1Order");

const OrderState = Object.freeze({
    WELCOMING:   Symbol("welcoming"),
    SIZE:   Symbol("size"),
    TOPPINGS:   Symbol("toppings"),
    DRINKS:  Symbol("drinks")
});

module.exports = class ShwarmaOrder extends Order{
    constructor(){
        super();
        this.stateCur = OrderState.WELCOMING;
        this.sSize = "";
        this.sToppings = "";
        this.sDrinks = "";
        this.sItem = "shawarama";
    }
    handleInput(sInput){
        let aReturn = [];
        let totalPrice = 0;
        let sizePrice;   
        let toppingsPrice;     
        let LARGE = 11.99;
        let MEDIUM = 9.99;
        let SMALL = 6.99;
        let VEGE = 0.99;
        let MEAT = 2.99;    
        let DRINKPRICE = 2.99;    
        switch(this.stateCur){
            case OrderState.WELCOMING:
                this.stateCur = OrderState.SIZE;
                aReturn.push("Welcome to Richard's Shawarma.");
                aReturn.push("What size would you like?");                   
                break;
            case OrderState.SIZE:
                this.stateCur = OrderState.TOPPINGS
                this.sSize = sInput;
                switch(sInput.toLowerCase()){
                    case "large":
                        sizePrice = LARGE;                        
                        break;
                    case "medium":
                        sizePrice = MEDIUM;                       
                        break;
                    case "small":
                        sizePrice = SMALL;                        
                        break;
                }    
                totalPrice += sizePrice;                                       
                aReturn.push("What toppings would you like? You can choose up to three.");                                
                break;                
            case OrderState.TOPPINGS:
                this.stateCur = OrderState.DRINKS
                this.sToppings = sInput;
                var [Topping1, Topping2, Topping3] = sInput.split(', ');
                var Toppings = [Topping1, Topping2, Topping3];
                console.log("totalPrice" + totalPrice);
                for(var count = 0; count < Toppings.length; count++){
                    switch(Toppings[count]){
                        case "pepperoni":
                        case "mushrooms":
                        case "onions":
                            toppingsPrice = VEGE;
                            break;
                        case "sausage":
                        case "beef":
                        case "ham":
                            toppingsPrice = MEAT;
                            break;
                        case "undefined":
                            toppingsPrice = 0;
                            break;
                    }    
                    totalPrice += toppingsPrice;                    
                    console.log("totalPrice"+totalPrice);
                }   
                aReturn.push("Would you like drinks with that?");
                break;
            case OrderState.DRINKS:
                this.isDone(true);
                if(sInput.toLowerCase() != "no"){
                    totalPrice += DRINKPRICE;
                    this.sDrinks = sInput;
                }
                aReturn.push("Thank-you for your order of");
                aReturn.push(`${this.sSize} ${this.sItem} with ${this.sToppings}, total price is ${this.totalPrice}.`);
                if(this.sDrinks){
                    aReturn.push(this.sDrinks);
                }
                let d = new Date(); 
                d.setMinutes(d.getMinutes() + 20);
                aReturn.push(`Please pick it up at ${d.toTimeString()}`);
                break;
        }
        return aReturn;
    }
}