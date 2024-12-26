import Phaser from "phaser";
import easyData from "@/public/data/gameData";

export default class EatingMedScene extends Phaser.Scene {
    player:Phaser.Physics.Arcade.Image|null=null
    blocks: Phaser.Physics.Arcade.StaticGroup | null = null;
    cursors:Phaser.Types.Input.Keyboard.CursorKeys|null=null
    topLeftImage:Phaser.Physics.Arcade.Image|null=null
    topRightImage:Phaser.Physics.Arcade.Image|null=null
    botLeftImage:Phaser.Physics.Arcade.Image|null=null
    botRIghtImage:Phaser.Physics.Arcade.Image|null=null
    centertext:Phaser.GameObjects.Text|null=null
    gameNo:number=0
    score:number=0
    scoreText:Phaser.GameObjects.Text|null=null
    life:number=3
    lifeText:Phaser.GameObjects.Text|null=null
    timerText: Phaser.GameObjects.Text | null = null;
    remainingTime: number = 60; // 1 minute in seconds
    timerEvent: Phaser.Time.TimerEvent | null = null;
    playSoundTimer: Phaser.Time.TimerEvent | null = null;




  constructor() {
    super("eatingmed-scene");
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
        const voice=easyData[i].sound
        const voiceName=easyData[i].soundName

       this.load.audio(voiceName,voice)

       const tleftname=easyData[i].topLeftName
       const trightname=easyData[i].topRightName
       const bleftname=easyData[i].botLeftName
       const brightname=easyData[i].botRightName

      


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

    // this.playSound()
    // setInterval(()=>this.playSound(),7000)
   
      this.playSound();
      this.startSoundLoop()
   
   

    

    this.centertext=this.add.text(410,330,mainName,{
      fontSize:'25px',
      
      color:'#000000',
      backgroundColor:'#FFFFFF',
      fixedHeight:60,
      fixedWidth:130,
      align:'center',
      padding:{
        top:15
      }
    })

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


    //text

    this.scoreText=this.add.text(40,30,`Score: ${this.score}`,{
      fontSize:'20px'
    })

    
    this.lifeText=this.add.text(820,30,`Life: ${this.life}`,{
      fontSize:'20px'
    })


    //timer
    this.timerText = this.add.text(440, 30, `Time: 1:00`,{
      fontSize:'20px'
    });
    this.startTimer()
 
  
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
      //also join with result Page
      if(this.gameNo<easyData.length-1)
      {
        this.gameNo++

        this.hideImage()

        setTimeout(()=>{this.replaceImage()
           this.playSound()},500)
    
        this.player?.setPosition(470,210)

        this.score=this.score+100
        this.scoreText?.setText(`Score: ${this.score}`)
      }else{
        console.log('this is the result page')
        window.location.href = `/Result?score=${this.score}`;

        this.stopSoundLoop()
        this.hideImage()

      }

        
    }else{
        name?.destroy()
        this.life--
        if(this.life<0){
          console.log('this is the result page')
          window.location.href = `/Result?score=${this.score}`;

          this.stopSoundLoop()
        }else{
          
          this.lifeText?.setText(`Life: ${this,this.life}`)
          //need to join with result page when there is no life
        }
      
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

    this.centertext?.setText(mainName)
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

    startTimer() {
      if (this.timerEvent) {
        this.timerEvent.remove(); // Remove previous timer event
      }
    
      this.remainingTime = 60; // Reset timer to 1 minute for each new word
    
      this.timerEvent = this.time.addEvent({
        delay: 1000,
        callback: () => {
          this.remainingTime--;
          const minutes = Math.floor(this.remainingTime / 60);
          const seconds = this.remainingTime % 60;
          if (this.timerText) {
            this.timerText.setText(`Time: ${minutes}:${seconds.toString().padStart(2, '0')}`);
          }
    
          if (this.remainingTime <= 0) {
            this.timerEvent?.remove(); // Stop the timer when time is up
            this.handleGameEnd(); // Call endGame when time runs out
          }
        },
        loop: true,
      });
    }
    handleGameEnd() {
      console.log("Game over! Time's up!");
      window.location.href = `/Result?score=${this.score}`;

      this.stopSoundLoop()
      // Transition to the result screen or restart the game
    } 
    
    startSoundLoop() {
      if (this.playSoundTimer) {
          this.playSoundTimer.remove(); // Remove existing timer if any
      }
  
      this.playSoundTimer = this.time.addEvent({
          delay: 6000, // 4 seconds
          callback: this.playSound,
          callbackScope: this,
          loop: true,
      });
  }
  
  stopSoundLoop() {
      if (this.playSoundTimer) {
          this.playSoundTimer.remove();
          this.playSoundTimer = null;
      }
  }
  
  playSound() {
      const soundName = easyData[this.gameNo]?.soundName;
      if (soundName) {
          this.sound.stopAll(); // Stop any currently playing sound
          this.sound.play(soundName);
      }
  }

}
