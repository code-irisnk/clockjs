// Title Changer functionality
function setTitle() {
    document.title = new Date().toLocaleTimeString();
}

setInterval(setTitle, 1000);
setTitle();

// Clock functionality
function setTime() {
    const time = new Date();
    let hours = time.getHours();
    let minutes = time.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    document.getElementById('clock').innerText = hours + ':' + minutes;
    document.getElementById('ampm').innerText = ampm;
}

document.addEventListener('DOMContentLoaded', () => {
    setTime();
    document.getElementById('clock_tz').innerText = Intl.DateTimeFormat().resolvedOptions().timeZone.split('/')[1];
    setInterval(setTime, 1000);
});

// Unix timestamp functionality
function updateUnixTimestamp() {
    const unixSpan = document.getElementById('unix');
    if (unixSpan) {
        unixSpan.textContent = Math.floor(Date.now() / 1000);
    }
}
setInterval(updateUnixTimestamp, 1000);

updateUnixTimestamp();

// Wasted seconds functionality
let counter = 0;

function formatTime(seconds) {
    const years = Math.floor(seconds / (365 * 24 * 60 * 60));
    seconds %= 365 * 24 * 60 * 60;
    const months = Math.floor(seconds / (30 * 24 * 60 * 60));
    seconds %= 30 * 24 * 60 * 60;
    const weeks = Math.floor(seconds / (7 * 24 * 60 * 60));
    seconds %= 7 * 24 * 60 * 60;
    const days = Math.floor(seconds / (24 * 60 * 60));
    seconds %= 24 * 60 * 60;
    const hours = Math.floor(seconds / (60 * 60));
    seconds %= 60 * 60;
    const minutes = Math.floor(seconds / 60);
    seconds %= 60;

    let result = "";
    if (years > 0) result += `${years} ${years === 1 ? "year" : "years"} `;
    if (months > 0) result += `${months} ${months === 1 ? "month" : "months"} `;
    if (weeks > 0) result += `${weeks} ${weeks === 1 ? "week" : "weeks"} `;
    if (days > 0) result += `${days} ${days === 1 ? "day" : "days"} `;
    if (hours > 0) result += `${hours} ${hours === 1 ? "hour" : "hours"} `;
    if (minutes > 0) result += `${minutes} ${minutes === 1 ? "minute" : "minutes"} `;
    result += `${seconds} ${seconds === 1 ? "second" : "seconds"}`;

    return result.trim();
}

const callback = function () {
    setTimeout(() => {
        counter++;
        document.getElementById("wasted").textContent = `You've wasted ${formatTime(counter)} of your life with this page open.`;
        callback();
    }, 1000);
};

callback();

// Timer functionality
let timerInterval;

function formatTimer(timeLeft) {
    if (timeLeft >= 0) {
        if (timeLeft >= 3600) {
            document.getElementById('timer').innerText = new Date(timeLeft * 1000).toISOString().slice(11, 19);
        } else {
            document.getElementById('timer').innerText = new Date(timeLeft * 1000).toISOString().slice(14, 19);
        }
    } else {
        clearInterval(timerInterval);
        document.getElementById('timer').innerText = "Time's up!";
        alert("Time's up!");
        document.getElementById('timerPicker').value = "";
        document.getElementById('timer').innerText = "";
    }
}

function startTimer() {
    const userTime = parseInt(document.getElementById('timerPicker').value);

    if (isNaN(userTime) || userTime <= 0) {
        alert("Please enter a valid number of seconds!");
        return;
    }

    if (timerInterval) {
        if (confirm("Timer already running. Are you sure you want to start a new timer?")) {
            clearInterval(timerInterval);
        } else {
            return;
        }
    }

    let timeLeft = userTime;

    clearInterval(timerInterval);

    formatTimer(timeLeft);

    timerInterval = setInterval(function () {
        timeLeft--;
        formatTimer(timeLeft);
    }, 1000);
}

// Countdown functionality
let countdownInterval;

function startCountdown() {
    const userDate = document.getElementById('countdownPicker').value;
    const targetDate = new Date(userDate).getTime();

    if (!targetDate) {
        alert("Please pick a valid date and time!");
        return;
    }

    clearInterval(countdownInterval);

    countdownInterval = setInterval(function () {
        const now = new Date().getTime();
        const distance = targetDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('countdown').innerText = `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds left`;

        if (distance < 0) {
            clearInterval(countdownInterval);
            document.getElementById('countdown').innerText = "Countdown ended";
        }
    }, 1000);
}

// Multi-clock functionality
let clockCount = 0;
const maxClocks = 3;
const clocks = [];

function populateTimezones() {
    const timezoneSelect = document.getElementById('timezone-select');
    const timezones = Intl.supportedValuesOf('timeZone');
    timezones.forEach(timezone => {
        const option = document.createElement('option');
        option.value = timezone;
        option.textContent = timezone;
        timezoneSelect.appendChild(option);
    });
}

function addClock() {
    const timezoneSelect = document.getElementById('timezone-select');
    const timezone = timezoneSelect.value;

    const existingClock = clocks.find(clock => clock.timezone === timezone);
    if (existingClock) {
        const confirmRemove = confirm("Timezone already exists. Do you want to remove it?");
        if (confirmRemove) {
            removeClock(existingClock.id);
        }
        return;
    }

    if (clockCount >= maxClocks) {
        alert("You can only add up to 3 extra clocks!");
        return;
    }

    const clockId = `clock-${clockCount + 1}`;
    const clockElement = document.createElement('div');
    clockElement.className = 'extra-clock';
    clockElement.id = clockId;
    
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card text-white';

    const timezoneSpan = document.createElement('span');
    timezoneSpan.textContent = 'Timezone: ' + timezone;
    cardDiv.appendChild(timezoneSpan);
    cardDiv.appendChild(document.createElement('br'));

    const timeSpan = document.createElement('span');
    timeSpan.id = `${clockId}-time`;
    cardDiv.appendChild(timeSpan);
    cardDiv.appendChild(document.createElement('br'));

    const removeBtn = document.createElement('button');
    removeBtn.className = 'btn btn-secondary';
    removeBtn.textContent = 'Remove';
    removeBtn.onclick = function() { removeClock(clockId); };
    cardDiv.appendChild(removeBtn);

    clockElement.appendChild(cardDiv);
    document.getElementById('extra-clocks').appendChild(clockElement);

    clocks.push({id: clockId, timezone});
    clockCount++;

    setInterval(() => {
        document.getElementById(`${clockId}-time`).innerText = new Date().toLocaleString("en-US", {timeZone: timezone});
    }, 1000);
}

function removeClock(clockId) {
    const clockIndex = clocks.findIndex(clock => clock.id === clockId);
    if (clockIndex > -1) {
        clocks.splice(clockIndex, 1);
        document.getElementById(clockId).remove();
        clockCount--;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    populateTimezones();
});