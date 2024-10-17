function setTitle() {
    document.title = new Date().toLocaleTimeString();
}

setInterval(setTitle, 1000);
setTitle();