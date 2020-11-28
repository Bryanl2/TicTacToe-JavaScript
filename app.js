// HTML Elements 

const statusDiv=document.querySelector('.status');
const resetDiv=document.querySelector('.reset');
const cellDivs=document.querySelectorAll('.game-cell');


//Game constants

const xSymbol='x';
const oSymbol='o';

//Game Variables

let gameIsLive=true;
let xIsNext=false;
let winner=null;


//Functions
const letterToSymbol=(letter)=>letter==='x'? xSymbol : oSymbol;

const handleMin=(letter)=>{
    gameIsLive=false;
    winner=letter;

    if(winner==='x'){

        statusDiv.innerHTML=`${letterToSymbol(winner)} has won`;

    }else{

        statusDiv.innerHTML=`<span> ${letterToSymbol(winner)} has won
        </span>`;
    }
};

const checkGameStatus=()=>{
    const topLeft=cellDivs[0].classList[2];
    const topMiddle=cellDivs[1].classList[2];
    const topRight=cellDivs[2].classList[2];
    const middleLeft=cellDivs[3].classList[2];
    const middleMiddle=cellDivs[4].classList[2];
    const middleRight=cellDivs[5].classList[2];
    const bottomLeft=cellDivs[6].classList[2];
    const bottomMiddle=cellDivs[7].classList[2];
    const bottomRight=cellDivs[8].classList[2];

    //Check Wiener

    if(topLeft && topLeft ===topMiddle && topLeft ===topRight){
        handleMin(topLeft);

    }else if(middleLeft && middleLeft===middleMiddle && middleLeft===middleRight){
        handleMin(middleLeft);
    }else if(bottomLeft && bottomLeft===bottomMiddle && bottomLeft===bottomRight){
        handleMin(bottomLeft);
    }else if(topLeft && topLeft===middleLeft && topLeft===bottomLeft){
        handleMin(topLeft);
    }else if(topMiddle && topMiddle ===middleMiddle && topMiddle === bottomMiddle){
        handleMin(topMiddle);
    }else if(topRight && topRight=== middleRight && topRight===bottomRight){
        handleMin(topRight);
    }else if(topLeft && topLeft=== middleMiddle && topLeft===bottomRight){
        handleMin(topLeft);
    }else if(topRight && topRight=== middleMiddle && topRight===bottomLeft){
        handleMin(topRight);
    }else if(topLeft && topMiddle && topRight && middleLeft && middleMiddle && middleRight && bottomLeft && bottomMiddle && bottomRight){
        gameIsLive=false;
        statusDiv.innerHTML='Game is tied !';
    }else{
       
      

        if(xIsNext){
            
            statusDiv.innerHTML=`${oSymbol} is next`;
        }else{
            statusDiv.innerHTML=`<span>${xSymbol} is next</span>`;
        }
    }
};


//event Handlers
const handleReset=(e)=>{
    xIsNext=true;
    statusDiv.innerHTML=`${xSymbol} is next`;

    for(const cellDiv of cellDivs){
        cellDiv.classList.remove('x');
        cellDiv.classList.remove('o');
    }

}

const handleCellClick=(e)=>{
    const classList=e.target.classList;
    
    
       

    if(classList[2]==='x' || classList[2]==='0'){
        return;
    }

    if(xIsNext){

        classList.add('x');
        checkGameStatus();
        xIsNext=!xIsNext;

    }else{
        classList.add('o');
        checkGameStatus();
        xIsNext=!xIsNext;
    }
}


//Event Listeners

resetDiv.addEventListener('click',handleReset);

for(const cellDiv of cellDivs){
    cellDiv.addEventListener('click',handleCellClick);
}
