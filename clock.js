// Set the time to the current time
function setTime() {
    const time = new Date();
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    let milliseconds = time.getMilliseconds();
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    document.getElementById('clock').innerText = hours + ':' + minutes + ':' + seconds + '.' + milliseconds;
    document.getElementById('ampm').innerText = ampm;
}

// Set the time every second
setInterval(setTime, 1000);

// Set the time immediately
setTime();