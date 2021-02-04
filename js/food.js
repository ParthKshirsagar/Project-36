class Food{
    constructor(){
        this.image = loadImage("Images/Milk.png");
        this.foodStock = 0;
    }

    display(){
    var x = 80, y = 100;

    imageMode(CENTER);
    image(this.image, 925, 525, 70, 70);
    if(this.foodStock!==0){
        for(var i = 0; i<this.foodStock; i++){
        if(i%10===0){
            x = 80;
            y  = y + 50
        }
        image(this.image, x, y, 50, 50);
        x = x + 30;
        }
    }
    fill(0);
    textSize(20);
    if(lastFed){
        if(lastFed===0){
            text("Last Feed : 12 AM", 350, 20);
        }
        else if(lastFed>=12){
            text("Last Feed : " + lastFed%12 + " PM", 350, 20);
        }
        else{
            text("Last Feed : " + lastFed + " AM", 350, 20);
        }
        }
}

deductFood(){
    if(this.foodStock>0){
        this.foodStock = this.foodStock-1;
        }
    }
}



