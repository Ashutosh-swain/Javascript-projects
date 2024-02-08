// we want to access all buttons
let boxes=document.querySelectorAll(".box"); // this will return a nodelist(array)
let resetbtn=document.querySelector("#reset-btn");
let newgamebtn=document.querySelector("#new-btn");
let msgcontainer=document.querySelector(".msg-container");
let msg =document.querySelector("#msg");

// creating a variable to track whose turn it is
let turnO=true; // playerX , playerO this will decide on button next character will be x or o

let count = 0; //To Track Draw // counting the no of moves if moves is equal to 9 the invoke the showDraw() function

// storing the winning pattern in 2d array
const winPatterns=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

// createing a function for reset game button
const resetgame=()=>{
    turnO=true; // reseting the turn and new start turn is from o
    enableboxes();
    msgcontainer.classList.add("hide");
}

// this function is invoked when there is no winner and the match is draw

const showDraw=()=>{
    msg.innerText="Its a Draw , Start Again!!";
    msgcontainer.classList.remove("hide");
    disableboxes();

}

// adding eventlisterner to all buttons

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        //console.log("box was clicked");
        // setting the text of the button(box)
        if(turnO){ // if turnO is true it will set text as O if false X
            // playerO turn  
            box.innerHTML="0";
            box.style.color="brown"; // changing colors of the text dynamically
                turnO=false;
        }else{
            //playerX turn
            box.innerHTML="X";
            box.style.color="blue";  // changing colors of the text dynamically
            turnO=true;
        }
        // after setting the text of a button we will disable it
        box.disabled=true;
        count++;

        let isWinner=checkWinner(); // we are creating a function which will check if someone is wining or not

        if(count === 9 && !isWinner){
            showDraw();
        }
    });
});

// creating a function to disable all buttons so that game stops and no further operation can be done after winner found
const disableboxes=()=>{
    for(let box of boxes){
        box.disabled=true;
        box.innerText="";
    }
}

// creating a function to enable all button when user presses new game button
const enableboxes=()=>{
    for(let box of boxes){
        box.disabled=false;
    }
}


const showWinner=(winner)=>{ // inside () is just a parameter
    msg.innerText =`Congratulations, Winner is ${winner}`;
    msgcontainer.classList.remove("hide"); // removing the class from msg-container div so that it is visible as hide is no more a class so its style doesn't work 
    disableboxes();
}

const checkWinner=()=>{
    for(let pattern of winPatterns){ // here we are checking which pattern is matching
        // // done this for understanding
        // console.log(pattern[0],pattern[1],pattern[2]); // pattern[0],... is basically providing index position which we will use to check the content of box at that position
        // console.log(boxes[pattern[0]],boxes[pattern[1]],boxes[pattern[2]]); // see button on that index
        // // printing the text on the button
        // console.log(boxes[pattern[0]].innerText,
        //             boxes[pattern[1]].innerText,
        //             boxes[pattern[2]].innerText);

        // storing the values of boxes at that position
        let pos1Val=boxes[pattern[0]].innerText;
        let pos2Val=boxes[pattern[1]].innerText;
        let pos3Val=boxes[pattern[2]].innerText;
            
        // checking whether out of 3 position value is someone empty that means no value 
        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){ // if all 3 are not empty then only we will check if it is equal to the winning pattern or not
            // condition for winning and on rest condition we do not need to check as if 3 values are same then only winner
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                //console.log("winner" , pos1Val);
                showWinner(pos1Val); // creating a function to show the message
            }

        }
    }
   
};

newgamebtn.addEventListener("click",resetgame);
resetbtn.addEventListener("click",resetgame);




// homework1: add property such that all Os and all Xs have same color (done)
// homework2: write a function for the condition of draw (done)
