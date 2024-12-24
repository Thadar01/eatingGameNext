'use client'
import Phaser from 'phaser'
import React, { useEffect, useRef } from 'react'
import EatingGameScene from './Scene/EatingGameScene'

const GameComponet = () => {
  const gameRef=useRef<Phaser.Game|null>(null)


  useEffect(()=>{
    if(gameRef.current){
      return;
    }

    const config:Phaser.Types.Core.GameConfig={
      type:Phaser.AUTO,
      width:950,
      height:700,
      scene:[EatingGameScene],
      physics:{
        default:'arcade',
        arcade:{
          gravity:{x:0,y:0},
          debug:true,
        }
      },
      parent:'phaser-container',
      backgroundColor:'#6b5a59'
      
    }

    gameRef.current=new Phaser.Game(config);

    return()=>{
      if(gameRef.current){
        gameRef.current.destroy(true);
        gameRef.current=null
      }
    }
  })
  return (
    <div>
      <div id="phaser-container"></div>
    </div>
  )
}

export default GameComponet