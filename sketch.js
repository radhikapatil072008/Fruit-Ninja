var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score = 0
var fruit1,fruit1_Image,fruitGroup
var fruit2,fruit2_Image
var fruit3,fruit3_Image
var fruit4,fruit4_Image
var sword,swordImage
var monster,monsterImage,enemyGroup
var gameOver,gameOverImg
var knifeSwooshSound,gameOverSound
var stop

function preload(){
 //create fruit and knife Images 
  fruit1_Image = loadImage("fruit1.png") 
  fruit2_Image = loadImage("fruit2.png")
  fruit3_Image = loadImage("fruit3.png")
  fruit4_Image = loadImage("fruit4.png")
  swordImage = loadImage("sword.png")
  monsterImage = loadImage("alien1.png","alien2.png")
  gameOverImg = loadImage("gameover.png")
  
  knifeSwooshSound = loadSound("knifeSwooshSound.mp3")
  gameOverSound = loadSound("gameover.mp3")
}

function setup(){
  createCanvas(windowWidth,windowHeight)
  

 sword = createSprite(500,300) 
  sword.addImage(swordImage)
  sword.scale = 0.70
  
fruitGroup = new Group();
  enemyGroup = new Group();
}

//fruitGroup = createGroup();

function draw(){
  background("pink")
 
  //scoring
  textSize(25) 
  text("Score: "+ score, 400,30);
    console.log("Game State", gameState)
    
  if(gameState === PLAY){
   //to move the knife with mouse's X and Y
    sword.x = World.mouseX
  sword.y = World.mouseY 
    
   fruits();
  enemy(); 
    
       
    if(enemyGroup.isTouching(sword)){
    gameOverSound.play();
      gameState = END
     }
    
    if(fruitGroup.isTouching(sword)){
     knifeSwooshSound.play();
      fruitGroup.destroyEach();
      score=score+2
    }
  }
  if(gameState === END){
    sword.addImage(gameOverImg)
    sword.x = 250
    sword.y = 250
    
    if(keyDown("space")){
    gameState = PLAY
    sword.addImage(swordImage)
    sword.x = width/2
    sword.y = height/2

      }
    
    stop();
    }
  
  
  sword.debug=false
  
drawSprites();
}

function fruits(){
  if(World.frameCount % 80 === 0){
    fruit = createSprite(400,200,20,20) 
    fruit.scale = 0.2
    //fruit.debug = true
    position=Math.round(random(1,4))
    if(position == 1){
      fruit.addImage(fruit1_Image)
    }else if(position == 2){
      fruit.addImage(fruit2_Image)
    }else if (position == 3){
      fruit.addImage(fruit3_Image)
    }else {
      fruit.addImage(fruit4_Image)
    }
    //position=Math.round(random(1,4))
    if(position == 1){
      fruit.x = 400
      fruit.velocityX = -(7+(score/4))
    }
    else 
      {
      if(position == 2){
      fruit.x = 350
    }
    fruit.y= Math.round(random(50,340))
    
    fruit.velocityX=-(7+(score/4))
    fruit.setlifetime=100
    fruitGroup.add(fruit);
    
  }
}
}
function enemy(){
  if(World.frameCount % 200 === 0){
   monster = createSprite(400,200,20,20)
    monster.addImage(monsterImage)
   monster.y=Math.round(random(100,300)) 
    monster.velocityX = -(8+(score/10));
    monster.setlifetime = 50
  /*monster.debug = true
  monster.setCollider("circle",0,0,20)*/
    enemyGroup.add (monster);
 }
}

function stop(){
  enemyGroup.setVelocityEach(0,0)
  fruitGroup.setVelocityEach(0,0)
  monster.x = -50
  monster.y = -50
  fruit.x = -90
  fruit.y = -90
  }



