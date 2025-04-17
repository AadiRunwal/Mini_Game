let h2 = document.querySelector("h2");              //HighScore Element.
let highScore = 0;
let p = document.querySelector("p");

let level = 0;
let h3 = document.querySelector("h3");
let boxID = ["one","two","three","four"];           //array of Box Id's.

let gameSequence = [];
let userSequence = [];

//----------------------------- start.
document.addEventListener("keypress",()=>{
    if(level==0){
        console.log("Game Started!");
        levelUp();
        p.innerText = "";
    }

    //----------------------------button press by user.
    let boxes = document.querySelectorAll(".box");
    for(box of boxes){
        box.addEventListener("click",btnPress);
    }
});

//---------------------------- Level Up.
function levelUp(){
    level++;
    h3.innerText = `Level ${level}`;
    userSequence = [];
    gameFlash();
}

//---------------------------- AutoFlash when Leveled Up.
function gameFlash(){
    let rand = Math.floor(Math.random()*4);
    let randBox = boxID[rand];
    flashBox = document.querySelector(`#${randBox}`);       //actual box to flash.
    flashBox.classList.add("autoFlash");
    setTimeout(()=>{
        flashBox.classList.remove("autoFlash");
    },250);

    gameSequence.push(randBox);         //updating gameSequence Value everytime Box flashes.
    // -----------------
    console.log(gameSequence)
}

//-------------------------- User Button Press.
function btnPress(){
    userFlash(this);
    userSequence.push(this.id);
    checkAns();
}

//Flash when user clicks a button.
function userFlash(box){
    box.classList.add("userFlash");
    setTimeout(()=>{
        box.classList.remove("userFlash");
    },250);
}

//check answer.
function checkAns(){
    let idx = userSequence.length-1;
    if(userSequence[idx]===gameSequence[idx]){
        if(userSequence.length==gameSequence.length){
            setTimeout(()=>{
                levelUp();
            },800);
        }
    }
    else{
        console.log("game over");
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(()=>{
            document.querySelector("body").style.backgroundColor = "white";
        },200);
        if(level>highScore){
            highScore=level;
        }
        h2.innerText = `HighScore: ${highScore}`;
        p.innerHTML = "<b>New HighScore!</b>";

        h3.innerHTML = `GAME OVER! Your <b>Score: ${level}</b> <br> Press any KEY to Start The Game Again!`;
        reset();
    }
}
// Reset.
function reset(){
    level = 0;
    gameSequence = [];
    userSequence = [];
}



