const Order = require("./assignment1Order");

const OrderState = Object.freeze({
    WELCOMING:   Symbol("welcoming"),
    PRODUCT: Symbol("product"),
    WINGS: Symbol("wings"),
    SIZE:   Symbol("size"),
    TOPPINGS:   Symbol("toppings"),
    NUGGETS:  Symbol("nuggets"),
    DIP: Symbol("dip"),
    CAKE: Symbol("cake")
});

module.exports = class ShwarmaOrder extends Order{
    constructor(){
        super();
        this.stateCur = OrderState.WELCOMING;
        this.product;
        //BURGER
        this.sSize = "";
        this.sToppings = "";
        this.sNuggets = "";
        this.sItem = "shawarama";
        this.sizePrice;
        this.toppingsPrice = 0;
        this.NuggetsPrice;
        this.totalPrice;
        //WINGS
        this.stype = "";
        this.sdip = "";
        this.scake = "";
        this.typePrice = 0;
        this.dipPrice = 0;
        this.cakePrice;
    }
    handleInput(sInput){
        let aReturn = [];  
        let LARGE = 11.99;
        let MEDIUM = 9.99;
        let SMALL = 6.99;
        let VEGE = 0.99;
        let MEAT = 2.99;    
        let NUGGETS = 4.99; 
        let BUFFALO = 6.99;
        let TERIYAKI = 5.99;
        let MANGO = 4.99;
        let RANCH = 0.99;
        let MAYO = 1.49;
        let KETCHUP = 0.59;
        let CAKE = 4.99;
        let d = new Date();
        switch(this.stateCur){
            case OrderState.WELCOMING: 
                this.stateCur = OrderState.PRODUCT;
                aReturn.push("Welcome to Grand'Maison.");
                aReturn.push("What do you want to eat? You can choose burger or wings."); 
                break;
            case OrderState.PRODUCT:
                this.product = sInput;        
                switch(sInput.toLowerCase()){
                    case "burger":
                        this.stateCur = OrderState.SIZE;  
                        aReturn.push("What size would you like? Large, Medium or small?");                       
                        break;  
                    case "wings":
                        this.stateCur = OrderState.WINGS;
                        aReturn.push("What types of chicken wings do you want? Buffalo, teriyaki or mango?");
                        break;              
                    }
                break;
            //Burger
            case OrderState.SIZE:
                this.stateCur = OrderState.TOPPINGS
                this.sSize = sInput;
                switch(sInput.toLowerCase()){
                    case "large":
                        this.sizePrice = LARGE;                        
                        break;
                    case "medium":
                        this.sizePrice = MEDIUM;                       
                        break;
                    case "small":
                        this.sizePrice = SMALL;                        
                        break;
                }                                       
                aReturn.push("What toppings would you like? You can choose up to three.");                                
                break;                
            case OrderState.TOPPINGS:
                this.stateCur = OrderState.NUGGETS
                this.sToppings = sInput;
                var [Topping1, Topping2, Topping3] = sInput.split(', ');
                var Toppings = [Topping1, Topping2, Topping3];
                for(var count = 0; count < Toppings.length; count++){
                    switch(Toppings[count]){
                        case "lettuce":
                        case "mushrooms":
                        case "onions":
                            this.toppingsPrice += VEGE;
                            console.log("topping"+this.toppingsPrice);
                            break;
                        case "sausage":
                        case "bacon":
                        case "extra-meat":
                            this.toppingsPrice += MEAT;
                            break;
                        case "undefined":
                            this.toppingsPrice += 0;
                            break;
                    }                                           
                }  
                console.log("topping"+this.toppingsPrice); 
                aReturn.push("Would you like chicken nuggets with that?");
                break;
            case OrderState.NUGGETS:
                this.isDone(true);
                if(sInput.toLowerCase() != "no"){
                    this.nuggetsPrice = NUGGETS;
                    this.sNuggets = sInput;
                }
                else{
                    this.nuggetsPrice = 0;
                }
                this.totalPrice = this.sizePrice + this.toppingsPrice + this.nuggetsPrice;                
                console.log("size"+this.sizePrice);
                console.log("topping"+this.toppingsPrice);
                console.log("nuggets"+this.nuggetsPrice);
                console.log("total"+this.totalPrice);
                aReturn.push("Thank-you for your order of");
                aReturn.push(`${this.product}, ${this.sSize} ${this.sItem} with ${this.sToppings}`);
                if(this.sNuggets){
                    aReturn.push(`and nuggets. Total price is ${this.totalPrice}.`);
                }
                else{
                    aReturn.push(`Total price is ${this.totalPrice}.`);
                }                 
                d.setMinutes(d.getMinutes() + 20);
                aReturn.push(`Please pick it up at ${d.toTimeString()}`);
                break;

            //WINGS
            case OrderState.WINGS:
                this.stateCur = OrderState.DIP;
                this.stype = sInput;
                switch(sInput.toLowerCase()){
                    case "buffalo":
                        this.typePrice = BUFFALO;                        
                        break;
                    case "teriyaki":
                        this.typePrice = TERIYAKI;                       
                        break;
                    case "mango":
                        this.typePrice = MANGO;                        
                        break;
                }                                       
                aReturn.push("What dipping sauce would you like? Ranch, mayo or ketchup?");                                
                break;
            case OrderState.DIP:
                this.stateCur = OrderState.CAKE;
                this.sdip = sInput;
                switch(sInput.toLowerCase()){
                    case "ranch":
                        this.dipPrice = RANCH;                        
                        break;
                    case "mayo":
                        this.dipPrice = MAYO;                       
                        break;
                    case "ketchup":
                        this.dipPrice = KETCHUP;                        
                        break;
                }                                       
                aReturn.push("Would you like a lava cake?");                                
                break; 

            case OrderState.CAKE:
                this.isDone(true);
                if(sInput.toLowerCase() != "no"){
                    this.cakePrice = CAKE; 
                    this.scake = sInput;                  
                }
                else{
                    this.cakePrice = 0;
                }
                this.totalPrice = this.typePrice + this.dipPrice + this.cakePrice;                
                aReturn.push("Thank-you for your order of");
                aReturn.push(`${this.product}, ${this.stype} with ${this.sdip} dipping sauce`);
                if(this.scake){
                    aReturn.push(`and a lava cake. Total price is ${this.totalPrice}.`);
                } 
                else{
                    aReturn.push(`Total price is ${this.totalPrice}.`);
                }
                d.setMinutes(d.getMinutes() + 20);
                aReturn.push(`Please pick it up at ${d.toTimeString()}`);
                break;               
        }
        return aReturn;
    }
}