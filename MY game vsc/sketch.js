var runner,runner_running;
var ground;
var obstacleGroup;
var obstacle1,obstacle2,obstacle3,obstacle4;
var PLAY=1;
var END=0;
var gameState=PLAY;

function preload() {
  runner_running=loadAnimation("runner1.png" , "runner2.png" , "runner3.png");
  obstacle1 = loadImage("car1r.png");
  obstacle2 = loadImage("car2.jpg");
  obstacle3 = loadImage("car3.jpg");
  obstacle4 = loadImage("car4.jpg");
  
  

}
function setup(){
  createCanvas(800,400)
  runner=createSprite(160,300,100,50);  
  runner.debug= true;
  
  runner.addAnimation("running" , runner_running )
  runner.scale = 0.5;
  
  ground= createSprite(0,385,800,10);
  ground.x=ground.width/2;

 obstacleGroup= new Group()
  
}

function draw(){
  
  background("black")
  if(gameState===PLAY){
if(keyDown("space")&&runner.y > 200){
  runner.velocityY = -10;
}
  runner.velocityY += 0.9;
  
  runner.collide(ground);
  ground.velocityX = -6
  
  if(ground.x < 0){
     ground.x=ground.width/2;
    
     }
  if(obstacleGroup.isTouching(runner)){
 gameState=END;
  }
  
  spawnObstacles()
}
else if(gameState===END){
  runner.velocityY=0;
  ground.velocityX=0;
 obstacleGroup.setVelocityXEach(0);
obstacleGroup.setLifetimeEach(-1);
}
  drawSprites()
  
}

function spawnObstacles(){
if(frameCount%60===0){
var obstacle=createSprite(790,320,10,40);
  obstacle.debug= true;
  obstacle.velocityX= -6;
  var ran=Math.round(random(1,4));
  switch(ran){
  case 1: obstacle.addImage(obstacle1);
  break;
  case 2: obstacle.addImage(obstacle2);
  break;
  case 3: obstacle.addImage(obstacle3);    
  break;
  case 4: obstacle.addImage(obstacle4);
  break;
  default:break;
    }
  obstacle.depth=runner.depth;
runner.depth=1;
  obstacle.scale= 0.6;
  obstacle.lifetime = 130;
  obstacleGroup.add(obstacle)
}


}