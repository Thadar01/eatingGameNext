import Phaser from "phaser";
import easyData from "@/public/data/gameData";

export default class EatingGameScene extends Phaser.Scene {
    player:Phaser.Physics.Arcade.Image|null=null
    blocks: Phaser.Physics.Arcade.StaticGroup | null = null;
    cursors:Phaser.Types.Input.Keyboard.CursorKeys|null=null
    topLeftImage:Phaser.Physics.Arcade.Image|null=null
    topRightImage:Phaser.Physics.Arcade.Image|null=null
    botLeftImage:Phaser.Physics.Arcade.Image|null=null
    botRIghtImage:Phaser.Physics.Arcade.Image|null=null
    centerImage:Phaser.GameObjects.Image|null=null

    gameNo:number=0




  constructor() {
    super("eatinggame-scene");
  }

  preload() {
    this.load.image("block", "/assets/block.png");
    this.load.image("bg", "/assets/bg.jpg");
    this.load.image('rightPlayer','/assets/rightmon.png')
    this.load.image('leftPlayer','/assets/leftmon.png')
    this.load.image('apple','/assets/fruits/apple.png')

    for(let i=0;i<easyData.length;i++){
       const tleft=easyData[i].topLeft
       const tright=easyData[i].topRight
       const bleft=easyData[i].botLeft
       const bright=easyData[i].botRight

       const tleftname=easyData[i].topLeftName
       const trightname=easyData[i].topRightName
       const bleftname=easyData[i].botLeftName
       const brightname=easyData[i].botRightName

       const mainImage=easyData[i].main
       const mainImageName=easyData[i].mainName
       this.load.image(mainImageName,mainImage)

       if(tleft && tleftname){
        this.load.image(tleftname,tleft)
       }

       if(tright && trightname){
        this.load.image(trightname,tright)
       }
       if(bleft && bleftname){
        this.load.image(bleftname,bleft)
       }
       if(bright && brightname){
        this.load.image(brightname,bright)
       }

    }


  }

  create() {
    this.add.image(475, 350, "bg").setScale(2.9, 2.9);

    this.player=this.physics.add.image(470,210,'rightPlayer').setScale(0.012,0.012)

    const tleftname=easyData[this.gameNo].topLeftName
    const trightname=easyData[this.gameNo].topRightName
    const bleftname=easyData[this.gameNo].botLeftName
    const brightname=easyData[this.gameNo].botRightName
    const mainName=easyData[this.gameNo].mainName

    this.centerImage=this.add.image(475,360,mainName).setScale(0.2,0.2)

    if(tleftname){
        this.topLeftImage=this.physics.add.image(90,110,tleftname).setScale(0.25,0.23).setImmovable(true)
        this.physics.add.collider(this.player,this.topLeftImage,() => this.collision(this.topLeftImage),undefined,this)


    }

    if(trightname){
        this.topRightImage=this.physics.add.image(850,110,trightname).setScale(0.25,0.23).setImmovable(true)
        this.physics.add.collider(this.player,this.topRightImage,() => this.collision(this.topRightImage),undefined,this)


    }

    if(bleftname){
        this.botLeftImage=this.physics.add.image(90,580,bleftname).setScale(0.25,0.23).setImmovable(true)
        this.physics.add.collider(this.player,this.botLeftImage,() => this.collision(this.botLeftImage),undefined,this)


    }

    if(brightname){
        this.botRIghtImage=this.physics.add.image(850,580,brightname).setScale(0.25,0.23).setImmovable(true)
        this.physics.add.collider(this.player,this.botRIghtImage,() => this.collision(this.botRIghtImage),undefined,this)


    }



    this.blocks = this.physics.add.staticGroup();
    // Reusable function to create blocks in a row or column
    const createBlocks = (
      startX: number,
      startY: number,
      count: number,
      incrementX: number,
      incrementY: number
    ) => {
      for (let i = 0; i < count; i++) {
        const block = this.blocks!.create(startX, startY, "block").setScale(0.1, 0.1);
        block.refreshBody()
        startX += incrementX;
        startY += incrementY;
      }
    };

    // Blocks arrangement
    createBlocks(165, 130, 9, 32, 0); // Top row
    createBlocks(525, 130, 9, 32, 0); // Bottom row
    createBlocks(106, 210, 11, 32, 0); // Left inner row
    createBlocks(520, 210, 11, 32, 0); // Right inner row
    createBlocks(110, 300,5, 0, 32); // Left vertical
    createBlocks(200, 300,5, 0, 32); // Second left vertical
    createBlocks(290, 300,5, 0, 32); // Third left vertical
    createBlocks(660, 300,5, 0, 32); // First right vertical
    createBlocks(744, 300,5, 0, 32); // Second right vertical
    createBlocks(835, 300,5, 0, 32); // Third right vertical
    createBlocks(160, 575, 20, 32, 0); // Bottom row
    createBlocks(224, 500, 16, 32, 0); // Middle row
    createBlocks(56, 500, 3, 32, 0);  // Left small row
    createBlocks(830, 500, 3, 32, 0); // Right small row

    // Create a rectangle of blocks in the center
    const centerX = 475; // Center of the scene
    const centerY = 360; // Center of the scene
    const rectWidth = 6; // Number of blocks horizontally
    const rectHeight = 4; // Number of blocks vertically

    // Top side of the rectangle
    createBlocks(
      centerX - (rectWidth / 2) * 32,
      centerY - (rectHeight / 2) * 32,
      rectWidth,
      32,
      0
    );

    // Bottom side of the rectangle
    createBlocks(
      centerX - (rectWidth / 2) * 32,
      centerY + (rectHeight / 2) * 32,
      rectWidth,
      32,
      0
    );

    // Left side of the rectangle
    createBlocks(
      centerX - (rectWidth / 2) * 32,
      centerY - (rectHeight / 2) * 32,
      rectHeight,
      0,
      32
    );

    // Right side of the rectangle
    createBlocks(
      centerX + (rectWidth / 2) * 32,
      centerY - (rectHeight / 2) * 32,
      rectHeight,
      0,
      32
    );

    // Add the missing block at the bottom-right corner
    const bottomRightX = centerX + (rectWidth / 2) * 32;
    const bottomRightY = centerY + (rectHeight / 2) * 32;
    const block = this.blocks!.create(bottomRightX, bottomRightY, "block").setScale(0.1, 0.1);
    block.refreshBody()
    if(this.input.keyboard){
        this.cursors=this.input.keyboard.createCursorKeys()

    }

    this.physics.add.collider(this.player, this.blocks);
  
  }

  update(){
    if(this.cursors && this.player){
        if(this.cursors.left.isDown && this.player.x >=65){
            this.player?.setTexture('leftPlayer')
            this.player?.setVelocityX(-200)
        }else if(this.cursors.right.isDown && this.player.x <=880){
            this.player?.setTexture('rightPlayer')
            this.player?.setVelocityX(200)

        }else if(this.cursors.up.isDown && this.player.y >=80){
            console.log(this.player.x)
            this.player?.setVelocityY(-200)
        }else if (this.cursors.down.isDown && this.player.y <=610){
            this.player?.setVelocityY(200)
        }else{
            this.player?.setVelocity(0)
        }
    }
  }



  collision(name:Phaser.Physics.Arcade.Image|null):void{
    console.log(name?.texture.key)

    if(name?.texture.key===easyData[this.gameNo].ques)
    {   
        this.gameNo++

        this.hideImage()
        setTimeout(()=>this.replaceImage(),500)
    
        this.player?.setPosition(470,210)
    }else{
        name?.destroy()
    }
   

  }
  
hideImage(){
this.topLeftImage?.destroy()
this.topRightImage?.destroy()

this.botLeftImage?.destroy()
this.botRIghtImage?.destroy()

}

  replaceImage(){
    const tleftname=easyData[this.gameNo].topLeftName
    const trightname=easyData[this.gameNo].topRightName
    const bleftname=easyData[this.gameNo].botLeftName
    const brightname=easyData[this.gameNo].botRightName
    const mainName=easyData[this.gameNo].mainName

    this.centerImage?.setTexture(mainName)
    if(this.player){
    if(tleftname){
        this.topLeftImage=this.physics.add.image(90,110,tleftname).setScale(0.25,0.23).setImmovable(true)
        this.physics.add.collider(this.player,this.topLeftImage,() => this.collision(this.topLeftImage),undefined,this)


    }

    if(trightname){
        this.topRightImage=this.physics.add.image(850,110,trightname).setScale(0.25,0.23).setImmovable(true)
        this.physics.add.collider(this.player,this.topRightImage,() => this.collision(this.topRightImage),undefined,this)


    }

    if(bleftname){
        this.botLeftImage=this.physics.add.image(90,580,bleftname).setScale(0.25,0.23).setImmovable(true)
        this.physics.add.collider(this.player,this.botLeftImage,() => this.collision(this.botLeftImage),undefined,this)


    }

    if(brightname){
        this.botRIghtImage=this.physics.add.image(850,580,brightname).setScale(0.25,0.23).setImmovable(true)
        this.physics.add.collider(this.player,this.botRIghtImage,() => this.collision(this.botRIghtImage),undefined,this)


    }}}

        
}
