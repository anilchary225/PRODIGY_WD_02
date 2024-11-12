// Variables to track time
let startTime = 0;
let elapsedTime = 0;
let timerInterval;

// Variables to handle time units
let hours = 0;
let minutes = 0;
let seconds = 0;

// Select elements
const timeDisplay = document.getElementById('time-display');
const lapsList = document.getElementById('laps-list');

// Buttons
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const lapBtn = document.getElementById('lap-btn');

// Function to start the stopwatch
function startStopwatch() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateTime, 1000);
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    resetBtn.disabled = false;
    lapBtn.disabled = false;
}

// Function to pause the stopwatch
function pauseStopwatch() {
    clearInterval(timerInterval);
    elapsedTime = Date.now() - startTime;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
}

// Function to reset the stopwatch
function resetStopwatch() {
    clearInterval(timerInterval);
    startTime = 0;
    elapsedTime = 0;
    hours = 0;
    minutes = 0;
    seconds = 0;
    timeDisplay.textContent = "00:00:00";
    lapsList.innerHTML = '';
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    resetBtn.disabled = true;
    lapBtn.disabled = true;
}

// Function to update the time display
function updateTime() {
    elapsedTime = Date.now() - startTime;

    hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
    seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);

    timeDisplay.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

// Function to add leading zeros to time values
function pad(unit) {
    return unit < 10 ? '0' + unit : unit;
}

// Function to record lap time
function recordLap() {
    const lapTime = timeDisplay.textContent;
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapsList.children.length + 1}: ${lapTime}`;
    lapsList.appendChild(lapItem);
}

// Event Listeners for buttons
startBtn.addEventListener('click', startStopwatch);
pauseBtn.addEventListener('click', pauseStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);
