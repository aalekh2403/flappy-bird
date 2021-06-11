var Background
var bg_img1;
var bird
var ground
var ground_image
var cherry1_image;
var cherry2_image;
var berry_image;
var orange_image;
var fruitGroup
var cage_image
var cageGroup
var PLAY=2;
var END=0;
var START=1
var gameState=START
var gameOver_image
var GameOver
var Reset
var reset_img
var ScoreSound
var EndSound
var scoreBoard
var scoreBoard_img
var score=0
var startBoard,startBoard_img

function preload(){

bg_img1=loadImage("background.jpg");
parrot_image=loadAnimation("images/parrot-1.png","images/parrot-2.png","images/parrot-3.png",
"images/parrot-4.png","images/parrot-5.png","images/parrot-6.png","images/parrot-7.png",
"images/parrot-8.png","images/parrot-7.png","images/parrot-6.png","images/parrot-5.png",
"images/parrot-4.png","images/parrot-3.png","images/parrot-2.png","images/parrot-1.png");

cherry1_image=loadImage("cherry1.png");
cherry2_image=loadImage("cherry2.png");
berry_image=loadImage("berry.png");
orange_image=loadImage("orange.png");
cage_image=loadImage("cage1.png");
gameOverimage=loadImage("gameoverimage.png")
reset_img=loadImage("resetButton.png");
ScoreSound=loadSound("pointScore.wav");
EndSound=loadSound("loosing.wav");
scoreBoard_img=loadImage("score.png");
startBoard_img=loadImage("startImage.png")

}

function setup(){
var canvas =createCanvas(1000,600)
 Background=createSprite(500,300,1500,600)
 Background.addImage(bg_img1);
 Background.scale=0.3;



 bird=createSprite(100,300,20,20);
 bird.scale=0.4;
 bird.addAnimation("flying",parrot_image)

 


 ground=createSprite(500,590,2500,20);
 ground.visible=false;

 GameOver=createSprite(500,250)
 GameOver.addImage(gameOverimage)
 GameOver.visible=false;
 GameOver.scale=0.6

 Reset=createSprite(500,380)
 Reset.addImage(reset_img)
 Reset.scale=0.5
 Reset.visible=true;

 scoreBoard=createSprite(870,510)
 scoreBoard.addImage(scoreBoard_img);
 scoreBoard.scale=0.8



fruitGroup = new Group();
cageGroup=new Group();

startBoard=createSprite(150,109);
startBoard.addImage(startBoard_img);

 
}

function draw(){
background(0)

if(gameState===START)
{
  Background.velocityX=0;
  fruitGroup.setVelocityXEach(0)
cageGroup.setVelocityXEach(0)



if(keyDown("SPACE"))
{
  gameState=PLAY;
}

}


else if(gameState===PLAY){
//score = score + Math.round(getFrameRate()/60);
startBoard.visible=false;

Background.velocityX= -(6 + score/100);
if(Background.x<300){
    Background.x=670;

}
//bird.velocityY=2;
if(keyDown("space") && bird.y>=200){
bird.velocityY=bird.velocityY-1;
}
bird.velocityY=bird.velocityY+0.8;

bird.collide(ground);

if(fruitGroup.isTouching(bird)){
  fruitGroup[0].destroy();
  ScoreSound.play();
  score=score+50
}


if(cageGroup.isTouching(bird)){
  gameState=END;
  EndSound.play();
}

spawnCages();
spawnFruits();
}

else if(gameState===END){
Background.velocityX=0;
bird.velocityY=0;
fruitGroup.setVelocityXEach(0)
cageGroup.setVelocityXEach(0)
cageGroup.setLifetimeEach(-1)

GameOver.visible=true;
Reset.visible=true;

if(mousePressedOver(Reset)) {
        reset();
      }

}


drawSprites();


strokeWeight(6)
stroke("brown")
fill("white")
textSize(25)
text("Score: "+ score, 810,535);

}
function spawnFruits(){
if(frameCount % 80===0){
 var fruits = createSprite(1000,Math.round(random(50,450)),30,30);
 fruits.velocityX=-(6 + 3*score/100);

 var rand=Math.round(random(1,4))
 switch(rand){
     case 1 :fruits.addImage(cherry1_image); 
             break;
     case 2 :fruits.addImage(berry_image); 
             break;
     case 3 :fruits.addImage(orange_image); 
             break;
     case 4 :fruits.addImage(cherry2_image); 
             break;
             default : break 


             
 }
 fruits.scale=0.2;
 fruitGroup.add(fruits)
}
}

function spawnCages(){
   if(frameCount % 200===0){
       var cage = createSprite(1000,50);
       cage.y=Math.ceil(random(50,450))
       cage.x=1000
       cage.setCollider("rectangle",0,0,cage.width,cage.height)
       cage.velocityX=-(4 +2*score/100);
       cage.addImage(cage_image)
       cage.scale=1.0;
       cage.debug=false;
       cage.lifetime=350
     
    
       cageGroup.add(cage)
      
       
               }
         }     


         
function reset(){
        gameState = PLAY;
        GameOver.visible = false;
        Reset.visible = false;
        
        cageGroup.destroyEach();
        fruitGroup.destroyEach();
        
        if(localStorage["HighestScore"]<score){
          localStorage["HighestScore"] = score;
        }
        console.log(localStorage["HighestScore"]);
        
        score = 0;
        
      }