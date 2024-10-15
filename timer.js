let timerInterval;

function startTimer() {
    const userTime = parseInt(document.getElementById('timerPicker').value);

    if (isNaN(userTime) || userTime <= 0) {
        alert("Please enter a valid number of seconds!");
        return;
    }

    let timeLeft = userTime;

    clearInterval(timerInterval);

    document.getElementById('timer').innerText = `${timeLeft} seconds`;

    timerInterval = setInterval(function () {
        timeLeft--;

        if (timeLeft >= 0) {
            document.getElementById('timer').innerText = `${timeLeft} seconds`;
        } else {
            clearInterval(timerInterval);
            document.getElementById('timer').innerText = "Time's up!";
        }
    }, 1000);
}
