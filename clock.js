// Set the time to the current time
function setTime() {
    var time = new Date();
    var hours = time.getHours();
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    milliseconds = time.getMilliseconds();
    document.getElementById('clock').innerText = hours + ':' + minutes + ':' + seconds + '.' + milliseconds;
    document.getElementById('ampm').innerText = ampm;
}

// Set the time every second
setInterval(setTime, 1000);

// Set the time immediately
setTime();