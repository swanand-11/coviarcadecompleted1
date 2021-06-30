var ground,iground;
var edges;
var Corona,coronaimg;
var doc1img,doc2img,doc
var syr1img,syr2img,syr
var life = 3,score = 0;
var start =0
var play = 1;
var end = 2;
var gamestate = start;
var menu;
var explosound;
function preload(){
   doc1img = loadImage("images/doc1.png");
   doc2img = loadImage("images/doc2.png");
   coronaimg = loadImage("images/corona.png");
   syr1img = loadImage("images/syringe1.png");
   syr2img = loadImage("images/syringe2.png");
   menu = loadImage("images/menu.jpg");
   explosound = loadSound("preview.mp3"); 
   playbg = loadImage("images/1.jpg")
   
}

function setup() {
  createCanvas(1200,400);
  ground = createSprite(600,390,width,20);
  iground = createSprite(600,370,width,20);
  

  edges = createEdgeSprites();
  syr = createSprite(600,300,50,50)
  syr.addImage("syrin",syr2img)
  syr.scale=0.5
  doc = createSprite(600,390,50,50);

  doc.addImage("doctor",doc1img)

  doc.scale = 0.42

  iground.visible = false;

  coronaGroup = new Group()

}

function draw() {
  if(gamestate===start){
    background(menu);
    background.scale=0.5
    doc.visible=false;
    syr.visible=false;
    ground.visible=false;
    textSize(30)
    fill('black')
    text('Press P to play',500,300)
    textSize(60);
    fill('black') 
    text("Covi-Arcade Game",450,50);
    textSize(30);
    text('Help doctor save the world by beating corona',480,100)

    if(keyDown('P')||keyDown('p')){
      gamestate=play;

    }
  }
  if(gamestate===play){
    background(playbg); 
    textSize(30);
      fill('white')
      strokeWeight(10);
      text(" your  score " + score,1000,50)
      text(" your remaining life " + life,100,50)
      doc.visible=true;
      syr.visible=true;
      ground.visible=true;
      syr.depth = doc.depth;
      syr.depth = syr.depth+1; 
      
    if (keyDown(RIGHT_ARROW)) {
      doc.x = doc.x + 8;
      doc.addImage("doctor",doc1img)
      syr.setCollider("rectangle",168,0,110,80)
      syr.x = syr.x + 8;
      syr.addImage("syrin",syr2img)
      doc.setCollider("rectangle",-100,-160,165,200)

    }

    if (keyDown(LEFT_ARROW)) {
      doc.x = doc.x - 8;
      doc.addImage("doctor",doc2img)
      syr.setCollider("rectangle",-168,0,-110,-80)
      syr.x = syr.x - 8;
      syr.addImage("syrin",syr1img)
      doc.setCollider("rectangle",100,-160,165,200)

    }
    doc.bounceOff(edges);
    syr.bounceOff(edges);
    spawncorona();
    doc.debug = false;
    syr.debug = false;

    if(coronaGroup.isTouching(syr)){
      Corona.destroy();
      score = score + 2;
    explosound.play();
      //score = score + Math.round(getFrameRate()/160);
    }
    if(coronaGroup.isTouching(doc)){
      life = life - 1;

      if(life === 0){
        gamestate = end;
      }

      }
    } 
  
 if(gamestate === end){
   background(menu)
   coronaGroup.setVelocityYEach(0);
   doc.velocityX = 0;
   syr.velocityX = 0;
   doc.visible=false;
    syr.visible=false;
    ground.visible=false;
   textSize(30)
   fill('black')
   text(" Your game is over press 'r' to restart ",500,100);
   text("Your final score is "+score,550,50);
   if (keyDown(82)){
      gamestate = play;
      score = 0;
      life = 3;
   }
 }
  drawSprites();

}

function spawncorona(){
  if(frameCount % 60 == 0){
    Corona = createSprite(600,100,10,10);
    Corona.addImage("corona",coronaimg)
    Corona.velocityY = 3;
    Corona.x = Math.round(random(20,1000));
    Corona.scale = 0.15
    Corona.depth = doc.depth;
    doc.depth = doc.depth+1
    //Corona.lifetime = 350;
    coronaGroup.add(Corona);
    coronaGroup.setLifetimeEach(80);
  }
}
