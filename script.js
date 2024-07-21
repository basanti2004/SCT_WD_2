let startTime;
let updatedTime;
let difference;
let timerInterval;
let running = false;
let laps = [];

const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsContainer = document.getElementById('laps');

function startTimer() {
    startTime = new Date().getTime() - difference;
    timerInterval = setInterval(updateDisplay, 10);
    startStopButton.textContent = 'Pause';
    running = true;
}

function stopTimer() {
    clearInterval(timerInterval);
    startStopButton.textContent = 'Start';
    running = false;
}

function resetTimer() {
    clearInterval(timerInterval);
    display.textContent = '00:00:00.00';
    startStopButton.textContent = 'Start';
    difference = 0;
    running = false;
    laps = [];
    lapsContainer.innerHTML = '';
}

function lapTimer() {
    if (running) {
        const lapTime = formatTime(difference);
        laps.push(lapTime);
        const lapElement = document.createElement('div');
        lapElement.classList.add('lap');
        lapElement.textContent = `Lap ${laps.length}: ${lapTime}`;
        lapsContainer.appendChild(lapElement);
    }
}

function updateDisplay() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    display.textContent = formatTime(difference);
}

function formatTime(milliseconds) {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
    const centiseconds = Math.floor((milliseconds % 1000) / 10);

    return (
        (hours ? (hours > 9 ? hours : "0" + hours) : "00") +
        ":" +
        (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") +
        ":" +
        (seconds > 9 ? seconds : "0" + seconds) +
        "." +
        (centiseconds > 9 ? centiseconds : "0" + centiseconds)
    );
}

startStopButton.addEventListener('click', () => {
    if (!running) {
        startTimer();
    } else {
        stopTimer();
    }
});

resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', lapTimer);
