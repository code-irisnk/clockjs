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
