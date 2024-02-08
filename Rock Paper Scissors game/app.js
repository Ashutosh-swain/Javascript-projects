// In this project or in every project we will use modular approach / modular way of programing to build projects 
// which means we are dividing our big task into small tasks and building them in each in different functions so that we can use them later 
//it will ultimetly reduce complexity and help in building a industry level solution


// creating 2 variables to store user and computer scores
let userScore = 0;
let compScore = 0;

//accessing all the choices so that user will select choice from the choices and we will get to know what user selected
const choices=document.querySelectorAll(".choice");

// accessing msg to show user who won
const msg=document.querySelector("#msg");

// accessing userscore and computerscore ids and showing it on the screen
const userscore=document.querySelector("#user-score");
const computerscore=document.querySelector("#computer-score");

const body=document.querySelector("body");

// creating a function which will generate random selection of the computer
const genCompChoice = ()=>{
    // storing all choices in an array so that computer can choice one from all options
    let options=["rock","paper","scissors"];

    // using random function to generate a a random number which we will use as a index to array to generate a random choice
    // remember always if u want to generate random numbers from range o to n so always multiply randome function with n+1
    // ex: generate no btw 0 to 3 so, random()*4 = random*(3+1) = generate no btw 0 to 3
    // as random function range lies between 0 to 1
    const randIdx = Math.floor(Math.random() * 3);
    return options[randIdx]; // returning random choice of computer to the playGame function for further operations
}

// creating draw game function
const drawGame = ()=>{
    //console.log("Game was Draw !!");
}

// this function will show what is the score
const showScore = (userWin)=>{
    if(userWin){
        userScore++;
        userscore.innerText=userScore;
        computerscore.innerText=compScore;
    }else{
        compScore++ ;
        userscore.innerText=userScore;
        computerscore.innerText=compScore;
    }
}
        
// creating a function to show who won user or computer
const showWinner = (userWin,userChoice,compChoice)=>{
    if(userWin){
        //console.log("You Win !!");
        msg.innerText =`You Win !! Your ${userChoice} beats Computers ${compChoice} `;
        body.style.backgroundColor="green";
    }else{
        //console.log("Computer Win !!");
        msg.innerText ="Computer Win !!";
        msg.innerText =`Computer Win !! Computers ${compChoice} beats Your ${userChoice} `;
        body.style.backgroundColor="red";
    }
// showing the score 
    showScore(userWin);
}

// creating playgame function which will keep a track of user and computer choice
const playGame=(userChoice)=>{
    //console.log("user choice = ",userChoice);
    // generating computer choice
    const compChoice=genCompChoice();
    //console.log("computer choice = ",compChoice);

    // using if else consitions to check  who is winning or losing or draw
    if(userChoice === compChoice){
        // calling Draw game function
        drawGame();
        msg.innerText ="Game was Draw !! Play Again";
        body.style.backgroundColor="white";
    }else{
        let userWin = true; // intially setting user won 
        if(userChoice === "rock"){
            // computerChoice left is: scissors,paper
            userWin = compChoice === "paper" ? false : true ;
        }else if(userChoice === "paper"){
            // computerChoice left is : rock,scissors
            userWin = compChoice === " scissors" ? false : true ;
        }else{
            // computerChoice left is : rock,paper
            userWin = compChoice === "rock" ? false : true;
        }

        // this function will tell who won
        showWinner(userWin,userChoice,compChoice);

    }


}

// adding an eventlistener to each choice class
// in this we are using getAttribute() to get whats written inside the html id or class
choices.forEach((choice)=>{
    //console.log(choice.innerHTML,choice.outerHTML);
    const userChoice = choice.getAttribute("id");
    choice.addEventListener("click",()=>{
        //console.log("event occured!!",userChoice);
        playGame(userChoice); // passing userchoice in playgame function
    })
})