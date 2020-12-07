var tower,towerImage

var door,doorImage,doorGroup

var climber,climberImage,climberGroup

var ghost,ghostImage

var invisibleBlock,invisibleBlockGroup

var gamestate="play"

var spookySound

function preload(){
  
  towerImage=loadImage("tower.png")
  
  doorImage=loadImage("door.png")
  doorGroup=new Group();
  
  climberImage=loadImage("climber.png")
  climberGroup=new Group();
  
  ghostImage=loadImage("ghost-standing.png")
  
  invisibleBlockGroup=new Group();
  
  spookySound=loadSound("spooky.wav")
}


function setup(){
  
  createCanvas(600,600)
  
  spookySound.loop();
  
 tower=createSprite(300,300)
tower.addImage(towerImage)
  tower.velocityY=7
  
  ghost=createSprite(300,300,10,10)
  ghost.addImage("ghostplay",ghostImage)
  ghost.scale=0.3
  
  
}


function draw(){
  
  background(0)
  
  
  
  if(gamestate==="play"){
  
    
    
  if(tower.y>400){
    tower.y=300
  }
  
  if(keyDown("right_arrow")){
    
    ghost.x=ghost.x+5
  }
  
  if(keyDown("left_arrow")){
    
    ghost.x=ghost.x-5
  }
  
  if(keyDown("space")){
    
    ghost.velocityY=- 9
  }
ghost.velocityY=ghost.velocityY+0.8
  
  if(climberGroup.isTouching(ghost)){
    
    ghost.velocityY=0
  }
  
  if(ghost.y>600||invisibleBlockGroup.isTouching(ghost)){
    ghost.destroy();
    gamestate="end"
    //tower.velocityY=0
   // door.velocityY=0
  }
  
  spawnDoors();
  }
  
  if(gamestate==="end"){
    stroke("cyan")
    fill("cyan")
    textSize(30)
    text("GAME OVER",230,300)
  }
    drawSprites()
  
  
}

function spawnDoors(){
  
  if(frameCount%250===0){
    
    door=createSprite(200,-50)
    door.addImage(doorImage)
    door.x=Math.round(random(100,500))
    door.velocityY=5
    door.lifetime=800
    doorGroup.add(door);
    ghost.depth=door.depth+1
    
    climber=createSprite(200,15)
    climber.addImage(climberImage)
    climber.x=door.x
    climber.velocityY=5
    climber.lifetime=800
    climberGroup.add(climber)
    
    invisibleBlock=createSprite(200,25)
  invisibleBlock.width=climber.width
    invisibleBlock.height=1
    invisibleBlock.x=door.x
    invisibleBlock.velocityY=5
    invisibleBlock.debug=true

    //invisibleGroup.visible=false
    invisibleBlockGroup.add(invisibleBlock)
  }
  
  
  
}


