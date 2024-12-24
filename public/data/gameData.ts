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
    main:string,
    mainName:string
}

 const easyData:dataType[]=[
    {
        topRight:'/assets/fruits/apple.png',
        main:'/assets/fruits/apple.png',
        topRightName:'apple',
        ques:'apple',
        sound:'/assets/fruits/Apple.mp3',
        mainName:'apple',
        botRight:'/assets/fruits/mango.png',
        botRightName:'mango'
    },
    {
        topLeft:'/assets/fruits/orange.png',
        topLeftName:'orange',

        main:'/assets/fruits/kiwi.png',
        mainName:'kiwi',

        ques:'kiwi',
        sound:'/assets/fruits/Kiwi.mp3',
        botLeft:'/assets/fruits/kiwi.png',
        botLeftName:'kiwi'
    },
    {
        topLeft:'/assets/fruits/watermelon.png',
        main:'/assets/fruits/peach.png',
        topLeftName:'watermelon',
        ques:'peach',
        sound:'/assets/fruits/Peach.mp3',
        mainName:'peach',
        botRight:'/assets/fruits/peach.png',
        botRightName:'mango'
    },
]

export default easyData