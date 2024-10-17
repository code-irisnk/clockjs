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
