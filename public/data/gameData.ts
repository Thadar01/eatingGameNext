type dataType={
    topLeft?:string,
    topRight?:string,
    botLeft?:string,
    botRight?:string,
    topLeftName?:string,
    topRightName?:string,
    botLeftName?:string,
    botRightName?:string,
    ques:string,
    sound:string,
    soundName:string
    main:string,
    mainName:string
    thing1?:string;
    thing1Name?:string;
    thing2?:string;
    thing2Name?:string;
    thing3?:string;
    thing3Name?:string;
}

 const easyData:dataType[]=[
    {
        topRight:'/assets/fruits/apple.png',
        main:'/assets/fruits/apple.png',
        topRightName:'apple',
        ques:'apple',
        sound:'/assets/fruits/Apple.mp3',
        soundName:'Apple',
        mainName:'apple',
        botRight:'/assets/fruits/mango.png',
        botRightName:'mango',
        thing1:'/assets/fruits/strawberry.png',
        thing1Name:'lilStrawberry',
        thing2:'/assets/fruits/banana.png',
        thing2Name:'lilBanana',
         thing3:'/assets/fruits/banana.png',
        thing3Name:'lilBanana'
    },
    {
        topLeft:'/assets/fruits/orange.png',
        topLeftName:'orange',

        main:'/assets/fruits/kiwi.png',
        mainName:'kiwi',

        ques:'kiwi',
        sound:'/assets/fruits/Kiwi.mp3',
        soundName:'Kiwi',
        botLeft:'/assets/fruits/kiwi.png',
        botLeftName:'kiwi',
        thing1:'/assets/fruits/strawberry.png',
        thing1Name:'lilStrawberry',
        thing2:'/assets/fruits/banana.png',
        thing2Name:'lilBanana',
         thing3:'/assets/fruits/banana.png',
        thing3Name:'lilBanana'
    },
    {
        topLeft:'/assets/fruits/watermelon.png',
        main:'/assets/fruits/peach.png',
        topLeftName:'watermelon',
        ques:'peach',
        sound:'/assets/fruits/Peach.mp3',
        soundName:'Peach',
        mainName:'peach',
        botRight:'/assets/fruits/peach.png',
        botRightName:'peach',
        thing1:'/assets/fruits/strawberry.png',
        thing1Name:'lilStrawberry',
        thing2:'/assets/fruits/banana.png',
        thing2Name:'lilBanana',
         thing3:'/assets/fruits/banana.png',
        thing3Name:'lilBanana'
    },
  

]

export default easyData