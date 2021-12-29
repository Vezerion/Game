"use strict";

const header = document.querySelector('.header');
const input = document.querySelector('.game__time');
const startBtn = document.querySelector('.start');
const gameDisplay =  document.querySelector('.game__display');
const result =  document.querySelector('.result');
const bestScore = document.querySelector('.best');
let timeLeft;
let timeDisplay;
let timeOut;
let counter = 0;
let best = 0;
let time;

function getTimeRemaining() {
    --time;
    return time + 1;
}

function setTimer() {
    updateTimer();

    function updateTimer() {
        const t = getTimeRemaining();
        header.innerHTML = `Время игры: <span>${t}</span>`;

        if(t < 0) {
            getTime();
        }
    }
}

function getTime() {
    time = parseInt(input.value);
    header.innerHTML = `Время игры: <span>${time}</span>`;
    timeLeft = input.value * 1000;
    getTimeRemaining();
}
input.addEventListener('input', () =>{
    getTime();
});

gameDisplay.addEventListener('click', (e) =>{
    if(e.target && e.target.matches('.start')) {
        startGame();
        setTimer();
    }
});

function startGame() {
    gameDisplay.style.backgroundColor = '#fff';
    gameDisplay.innerHTML = "";
    createBlocks();
    timeDisplay = setInterval(setTimer, 1000);
    timeOut = setTimeout(endGame, timeLeft);
}

function createBlocks() {
    const block = document.createElement('div');
    const t = Math.floor(Math.random() * 100) + 50;
    const top = Math.floor(Math.random() * 200);
    const left = Math.floor(Math.random() * 200);
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const r2 = Math.floor(Math.random() * 256);
    const g2 = Math.floor(Math.random() * 256);
    const b2 = Math.floor(Math.random() * 256);
    block.style.width = t + 'px';
    block.style.height = t + 'px';
    block.style.top = top + 'px';
    block.style.left = left + 'px';
    block.style.background = `linear-gradient(#${r.toString(16)}${g.toString(16)}${b.toString(16)}, #${r2.toString(16)}${g2.toString(16)}${b2.toString(16)})`;
    block.classList.add('game__block');
    gameDisplay.append(block);
    block.addEventListener('click', () =>{
        block.remove();
        createBlocks();
        counter++;
    });
}

function endGame() {
    gameDisplay.innerHTML = '<button class="start">Начать</button>';
    gameDisplay.style.backgroundColor = 'rgb(207, 200, 200)';
    if(counter >= best) {
        best = counter;
    }
    result.innerHTML = `Ваш результат: ${counter}`;
    bestScore.innerHTML = `Ваш лучший результат: ${best}`;
    counter = 0;
    clearTimeout(timeOut);
    clearInterval(timeDisplay);
}