const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
    },
    values: {
        gameVelocity: 400,
        hitPosition: 0,
        result: 0,
        currentTime: 15,
    },
    action: {
        timerId: null,
        countDownTimerId: null,
    }
};

function countDown(){
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0) {
        clearInterval(state.action.countDownTimerId);
        clearInterval(state.action.timerId);

        if (state.values.result > 10) {
            alert("Parabéns! O seu resultado foi: " + state.values.result); }
            else {
            playSound("gameover"); 
            alert("Game Over! O seu resultado foi: " + state.values.result);
        }
        }
    }

function randomSquare(){
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", ()=> {
            if (square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit");
            }
        })
    })
}

function playSound(audioName){
    let audio = new Audio(`./src/audios/${audioName}.mp3`);
    audio.volume = 0.5;
    audio.play();
}

// Inicialização correta
function initialize(){    
    state.action.timerId = setInterval(randomSquare, state.values.gameVelocity);
    state.action.countDownTimerId = setInterval(countDown, 1000);
    addListenerHitBox();
}

initialize();
