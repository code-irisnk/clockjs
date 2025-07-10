function updateUnixTimestamp() {
    const unixSpan = document.getElementById('unix');
    if (unixSpan) {
        unixSpan.textContent = Math.floor(Date.now() / 1000);
    }
}
setInterval(updateUnixTimestamp, 1000);

updateUnixTimestamp();