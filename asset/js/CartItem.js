class CartItem extends Product{ 
    constructor(id,name,price,screen,backCamera,frontCamera,img,desc,type){
        super(id,name,price,screen,backCamera,frontCamera,img,desc,type);
        this.quantity = 1; 
    }
}