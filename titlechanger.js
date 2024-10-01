// Set the title to the current time
function setTitle() {
    document.title = new Date().toLocaleTimeString();
}

// Set the title every second
setInterval(setTitle, 1000);

// Set the title immediately
setTitle();