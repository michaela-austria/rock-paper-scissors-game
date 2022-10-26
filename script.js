const data = {
    "rps":[
        {
            id: 0,
            name: "rock",
            img: "img/rock.png"
        },
        {
            id: 1,
            name: "paper",
            img: "img/paper.png"
        },
        {
            id: 2,
            name: "scissors",
            img: "img/scissors.png"
        }
    ]
};


const btnChoices = document.querySelector('.choices');
const btnRock = document.querySelector('.btn--rock');
const btnPaper = document.querySelector('.btn--paper');
const btnScissors = document.querySelector('.btn--scissors');

const userImage = document.getElementById('userImage');
const computerImage = document.getElementById('computerImage');
const computerCounter = document.querySelector('.answer__counter');

const scoreUser = document.getElementById('score--0');
const scoreComputer = document.getElementById('score--1');

const message = document.querySelector('.statement-container__message');
const btnReset = document.getElementById('btn--new');


const changeImage = function($user,$getData){
    $user.src = "";
    $user.src = $getData.img;
    $user.alt = $getData.name;
    $user.classList.remove('blur') ?? $user.classList.remove('hide');
    message.textContent = "";
    btnChoices.classList.add('hide');
}

const displayMessage = function($message, $color = "inherit"){
    message.classList.remove('hide');
    message.textContent = $message;
    message.style.color = $color;

    btnChoices.classList.remove('hide');
}

const checkResults = function(){
    const userChoice = userImage.alt;
    const computerChoice = computerImage.alt;
    
    if (userChoice == "scissors" && computerChoice == "paper" ||
        userChoice == "paper" && computerChoice == "rock" ||
        userChoice == "rock" && computerChoice == "scissors" 
    ){
        displayMessage("You won!", "green")
    };

    // if(userChoice == "scissors" && computerChoice == "paper") displayMessage("You won!", "green");
    // if(userChoice == "paper" && computerChoice == "rock") displayMessage("You won!", "green");
    // if(userChoice == "rock" && computerChoice == "scissors") displayMessage("You won!", "green");
  
    if (userChoice == "paper" && computerChoice == "scissors" ||
        userChoice == "rock" && computerChoice == "paper" ||
        userChoice == "scissors" && computerChoice == "rock"
    ){
        displayMessage("Computer won!", "red");
    };
    // if(userChoice == "paper" && computerChoice == "scissors") displayMessage("Computer won!", "red");
    // if(userChoice == "rock" && computerChoice == "paper") displayMessage("Computer won!", "red");
    // if(userChoice == "scissors" && computerChoice == "rock") displayMessage("Computer won!", "red");


    if (userChoice == "scissors" && computerChoice == "scissors" ||
        userChoice == "rock" && computerChoice == "rock" ||
        userChoice == "paper" && computerChoice == "paper") {
        displayMessage("It's a tie. Try again!")
    };
    
}


const computerAnswer = function(){
    let timer = 5;
    computerCounter.classList.toggle('hide');
    
    const updateNumber = function(){
        if(timer === 0){
            clearInterval(testTimer);
            const randomNumber = Math.trunc(Math.random() * data.rps.length);
            const findData = data.rps.find(data => data.id === randomNumber);
            changeImage(computerImage, findData);
            computerCounter.classList.toggle('hide');

            checkResults();

            computerCounter.textContent = 5;

        } else{
            timer--;
            computerCounter.textContent = timer;
        }
    }
    const testTimer = setInterval(updateNumber,1000);
}



btnChoices.addEventListener('click', function(btn){
    btn.preventDefault();

    computerImage.classList.add('blur');

    const btnClicked = btn.target.id;
    const getData = data.rps.find(data => data.name == btnClicked);

    if(!getData.img) return;

    changeImage(userImage, getData);
    computerAnswer();
    // checkResults();

});