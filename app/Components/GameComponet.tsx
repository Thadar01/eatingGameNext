'use client'
import Phaser from 'phaser'
import React, { useEffect, useRef } from 'react'
import EatingGameScene from './Scene/EatingGameScene'
import EatingMedScene from './Scene/EatingMedScene'
import EatingHardScene from './Scene/EatingHardScene'

interface gameType{
  name:string|null
}
const GameComponet:React.FC<gameType> = ({name}) => {
  const gameRef=useRef<Phaser.Game|null>(null)


  useEffect(()=>{
    if(gameRef.current){
      return;


    }

    const scenes = [];
    if (name === 'easy') {
      scenes.push(EatingGameScene);
    }else if(name==='med'){
      scenes.push(EatingMedScene)
    }else if(name=='hard'){
      scenes.push(EatingHardScene)
    }

    const config:Phaser.Types.Core.GameConfig={
      type:Phaser.AUTO,
      width:950,
      height:700,
      scene:scenes,
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