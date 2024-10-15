let clockCount = 0; 
const maxClocks = 3;
const clocks = [];

function populateTimezones() {
    const timezoneSelect = document.getElementById('timezone-select');
    const timezones = Intl.supportedValuesOf('timeZone');
    timezones.forEach(timezone => {
        const option = document.createElement('option');
        option.value = timezone;
        option.textContent = timezone;
        timezoneSelect.appendChild(option);
    });
}

function addClock() {
    const timezoneSelect = document.getElementById('timezone-select');
    const timezone = timezoneSelect.value;

    const existingClock = clocks.find(clock => clock.timezone === timezone);
    if (existingClock) {
        const confirmRemove = confirm("Timezone already exists. Do you want to remove it?");
        if (confirmRemove) {
            removeClock(existingClock.id);
        }
        return;
    }

    if (clockCount >= maxClocks) {
        alert("You can only add up to 3 extra clocks!");
        return;
    }

    const clockId = `clock-${clockCount + 1}`;
    const clockElement = document.createElement('div');
    clockElement.className = 'extra-clock';
    clockElement.id = clockId;
    clockElement.innerHTML = `
        <div class="card bg-secondary text-white">
            <span>Timezone: ${timezone}</span><br>
            <span id="${clockId}-time"></span><br>
            <button class="btn btn-secondary" onclick="removeClock('${clockId}')">Remove</button>
        </div>
    `;
    document.getElementById('extra-clocks').appendChild(clockElement);

    clocks.push({ id: clockId, timezone });
    clockCount++;

    setInterval(() => {
        const now = new Date().toLocaleString("en-US", { timeZone: timezone });
        document.getElementById(`${clockId}-time`).innerText = now;
    }, 1000);
}

function removeClock(clockId) {
    const clockIndex = clocks.findIndex(clock => clock.id === clockId);
    if (clockIndex > -1) {
        clocks.splice(clockIndex, 1);
        document.getElementById(clockId).remove();
        clockCount--;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    populateTimezones();
});
