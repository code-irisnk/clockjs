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
        $("#wasted").text(`You've wasted ${formatTime(counter)} of your life with this page open.`);
        callback();
    }, 1000);
};

callback();