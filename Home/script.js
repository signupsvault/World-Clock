document.addEventListener('DOMContentLoaded', () => {
    const digitalClockBtn = document.getElementById('digital-clock-btn');
    const analogClockBtn = document.getElementById('analog-clock-btn');
    const digitalClockDiv = document.getElementById('digital-clock');
    const analogClockDiv = document.getElementById('analog-clock');
    const countrySelect = document.getElementById('country-select');
    const hourHand = document.querySelector('.hour-hand');
    const minuteHand = document.querySelector('.minute-hand');
    const secondHand = document.querySelector('.second-hand');
    const body = document.querySelector('body');

    // Populate the dropdown
    populateCountrySelect(countrySelect);

    // Initial call to updateClock, *after* populating dropdown and setting its default value
    countrySelect.value = "Asia/Kathmandu";
    updateClock();

    // Set up interval for updating time
    setInterval(updateClock, 1000);

    function updateClock() {
        const selectedTimeZone = countrySelect.value;
        let date = new Date();
        if (selectedTimeZone) {
            date = new Date(new Date().toLocaleString("en-US", { timeZone: selectedTimeZone }));
        }
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();

        //Update Digital clock
        const formattedTime = window.formatTime(date); // Use global formatTime
        digitalClockDiv.textContent = formattedTime;
        if (body.classList.contains('light-mode')) {
            digitalClockDiv.classList.add('light-mode');
        }
        else {
            digitalClockDiv.classList.remove('light-mode');
        }

        // Update Analog clock
        const hourDeg = (hours % 12) / 12 * 360 + (minutes / 60) * 30 + 90;
        const minDeg = (minutes / 60) * 360 + (seconds / 60) * 6 + 90;
        const secDeg = (seconds / 60) * 360 + 90;

        hourHand.style.transform = `translateX(-50%) rotate(${hourDeg}deg)`;
        minuteHand.style.transform = `translateX(-50%) rotate(${minDeg}deg)`;
        secondHand.style.transform = `translateX(-50%) rotate(${secDeg}deg)`;
        if (body.classList.contains('light-mode')) {
            hourHand.classList.add('light-mode');
            minuteHand.classList.add('light-mode');
            secondHand.classList.add('light-mode');
        }
        else {
            hourHand.classList.remove('light-mode');
            minuteHand.classList.remove('light-mode');
            secondHand.classList.remove('light-mode');
        }
    }

    function toggleClock(clockType) {
        digitalClockBtn.classList.remove('active');
        analogClockBtn.classList.remove('active');
        digitalClockDiv.style.display = 'none';
        analogClockDiv.style.display = 'none';

        if (clockType === 'digital') {
            digitalClockBtn.classList.add('active');
            digitalClockDiv.style.display = 'flex';
        } else {
            analogClockBtn.classList.add('active');
            analogClockDiv.style.display = 'block';
        }
        if (body.classList.contains('light-mode')) {
            if (clockType === 'digital') {
                digitalClockBtn.classList.add('light-mode');
            }
            else {
                analogClockBtn.classList.add('light-mode');
            }
        }
        else {
            if (clockType === 'digital') {
                digitalClockBtn.classList.remove('light-mode');
            }
            else {
                analogClockBtn.classList.remove('light-mode');
            }
        }
    }

    digitalClockBtn.addEventListener('click', () => toggleClock('digital'));
    analogClockBtn.addEventListener('click', () => toggleClock('analog'));
    countrySelect.addEventListener('change', updateClock);
    toggleClock('digital'); //default load digital clock

    const clockFace = document.querySelector('.analog-clock-face');
    const numbers = clockFace.querySelectorAll('.number');
    numbers.forEach(number => {
        const num = parseInt(number.getAttribute('data-number'));
        const angle = (num / 12) * 2 * Math.PI; // Angle in radians
        const radius = 0.4 * clockFace.offsetWidth; // Radius of circle
        const centerX = clockFace.offsetWidth / 2;
        const centerY = clockFace.offsetHeight / 2;

        const x = centerX + radius * Math.sin(angle);
        const y = centerY - radius * Math.cos(angle);

        number.style.left = `${x}px`;
        number.style.top = `${y}px`;
    });

});