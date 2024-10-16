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