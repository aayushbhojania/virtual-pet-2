//Create variables here
var dog,happydog,database;
var foodS,foodstock;
var feed,addFood;
var fedTime,lastFed;
var foodObj;
var foodStock,lastFed;
function preload()

{
  //load images here
  dogImage = loadImage("images/Dog.png")
  hdogImage = loadImage("images/happydog.png")
 
}

function setup() {
  createCanvas(750,750);
  database = firebase.database();
  foodObj = new Food();
  dog = createSprite(400,250,50,50);
  dog.scale = 0.15
  dog.addImage(dogImage);
 
  foodstock = database.ref('Food');
  foodstock.on("value",readStock);
  
  feed = createButton("feed the dog");
  feed.position(450,95);
  feed.mousePressed(feedDog);

  addFood = createButton("add food");
  addFood.position(600,95);
  addFood.mousePressed(addFoods);

  function feedDog(){
    dog.addImage(hdogImage);

    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
    database.ref('/').update({
      Food : foodObj.getFoodStock(),
      fedTime:hour()
    })
  }

  function addFoods(){
    foodS++;
    database.ref('/').update({
      Food : foodS
    })
  }
  
}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS)
}

function writeStock(x){
  if(x<=0){
     x=0; 
    }
    else{
       x=x-1; 
      }
       database.ref('/').update({
          Food:x 
        })
}


  function draw() {  
   background(46,139,87);
    
   // if(keyWentDown(UP_ARROW)){
    // writeStock(foodS);
     //dog.addImage(hdogImage);
   //}
  foodObj.display();
  drawSprites();
  //add styles here
     //fill ("black");
    // text("Note : Press UP_ARROW Key to feed Drago milk",200,50);

    
     }



