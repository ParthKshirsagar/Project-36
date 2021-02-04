var dog,sadDog,happyDog, database;
var foodS, foodStock;
var feedDog, addFood;
var lastFed;
var food;
var bg;

function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
  bg=loadImage("Images/background.jpg");
}

function setup() {
  createCanvas(windowWidth,windowHeight);

  database = firebase.database();
  
  dog=createSprite(1000,525,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feedDog = createButton("Feed The Dog");
  feedDog.position(width/2-150, 0);
  feedDog.mousePressed(FeedDog);

  addFood = createButton("Add Food");
  addFood.position(width/2-45, 0);
  addFood.mousePressed(AddFood);

  food = new Food();

  getFedTime();
}

function draw() {
  background(bg);

  food.display();
  readFoodStock();
  drawSprites();
}

function readFoodStock(){
  var readFoodS = database.ref('foodStock');
  readFoodS.on("value", function(data){
    food.foodStock = data.val();
  })
}

function FeedDog(){
  if(food.foodStock>0){
  dog.addImage(happyDog);

  food.deductFood();
  database.ref('/').update({
    'foodStock':food.foodStock
  })
  updateFedTime();
  dog.x = 965;
  dog.y = 500;
}
}

function AddFood(){
  if(food.foodStock>=0){
  food.foodStock++;
  database.ref('/').update({
    'foodStock':food.foodStock
  })
}
}

function updateFedTime(){
  database.ref('/').update({
    'feedTime': hour()
  })
}

function getFedTime(){
  var lastF = database.ref('feedTime');
  lastF.on("value", function(data){
    lastFed = data.val();
  })
}