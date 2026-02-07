let score = JSON.parse(localStorage.getItem('score')) || {
    yourScore: 0,
    compScore: 0,
    tieScore: 0
};

// Display initial score
updateScoreElement();

function updateScoreElement() {
    document.querySelector('.js-result').innerHTML = `
        Your Score: ${score.yourScore}, 
        Computer Score: ${score.compScore}, 
        Tie: ${score.tieScore}
    `;
}
document.querySelector('.js-rockB').addEventListener('click', ()=>{
    playGame('rock');
})
document.querySelector('.js-paperB').addEventListener('click', ()=>{
    playGame('paper');
})
document.querySelector('.js-sisB').addEventListener('click', ()=>{
    playGame('scissors');
})
document.querySelector('.resetB').addEventListener('click', ()=>{
    resetScore();
})
document.querySelector('.auto-play').addEventListener('click', ()=>{
    autoPlay();
})

document.body.addEventListener('keydown', (event)=>{
    if(event.key==='r')
        playGame('rock');
    else if(event.key==='p')
        playGame('paper');
    else if(event.key==='s')
        playGame('scissors');
    else if(event.key==='a')
        autoPlay();
    else if(event.key==='Backspace'){
        document.querySelector('.js3-result')
        .innerHTML=`Are you sure you want to reset the score? 
        <button class='but2'>Yes</button> 
        <button class='but12'>No</button>`;
        setTimeout(()=>{
            document.querySelector('.but2').addEventListener('click',()=>{
                resetScore();
                hideMessage();
            })
            document.querySelector('.but12').addEventListener('click',()=>{
                hideMessage();
            })
        },0);

    }
})
const hideMessage=()=>{
    document.querySelector('.js3-result').innerHTML='';
}
function playGame(playerMove) {
    const computerMove = pickComputerMove();
    let result = '';

    if (playerMove === computerMove) {
        result = "It's a tie!";
        score.tieScore++;
    } else if (
        (playerMove === 'rock' && computerMove === 'scissors') ||
        (playerMove === 'paper' && computerMove === 'rock') ||
        (playerMove === 'scissors' && computerMove === 'paper')
    ) {
        result = "You win!";
        score.yourScore++;
    } else {
        result = "Computer wins!";
        score.compScore++;
    }
    document.querySelector('.js1-result').innerHTML=result;
    document.querySelector('.js2-result').innerHTML=`You Chose:  <img class="emoji" src="./images/${playerMove}.jiff" alt="">, 
    Computer Chose:  <img class="emoji" src="../iconsch/${computerMove}-emoji.png" alt="">`;
    // Save updated score to localStorage
    localStorage.setItem('score', JSON.stringify(score));

    // Update UI
    updateScoreElement();
  

}

function pickComputerMove() {
    const randNo = Math.random();

    if (randNo < 0.33) {
        return 'rock';
    } else if (randNo < 0.66) {
        return 'paper';
    } else {
        return 'scissors';
    }
}

function resetScore() {
    score = { yourScore: 0, compScore: 0, tieScore: 0 };
    localStorage.removeItem('score');
    updateScoreElement();
}
let intID;
let isAutoPlaying=false;
function autoPlay(){
    if(!isAutoPlaying){
        intID=setInterval(function (){
            const playerMove = pickComputerMove();
            playGame(playerMove);
        },1000)
        isAutoPlaying=true;
    }
    else{
        clearInterval(intID);
        isAutoPlaying=false;
    }
}