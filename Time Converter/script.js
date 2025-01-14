class TimeConverter {
    constructor() {
        this.elements = {
            fromCountrySelect: document.getElementById('from-country-select'),
            toCountrySelect: document.getElementById('to-country-select'),
            fromHourSelect: document.getElementById('from-hour-select'),
            fromMinuteSelect: document.getElementById('from-minute-select'),
            fromAmPmSelect: document.getElementById('from-ampm-select'),
            fromDateInput: document.getElementById('from-date-input'),
            convertedTimeDisplay: document.getElementById('converted-time'),
            timeDifferenceDisplay: document.getElementById('time-difference'),
            timeCalculationDisplay: document.getElementById('time-calculation'),
            ampmLabel: document.getElementById('ampm-label'),
            format12hrBtn: document.getElementById('format-12hr-btn'),
            format24hrBtn: document.getElementById('format-24hr-btn'),
        };

        this.is24HourFormat = true;
        this.selectedHour24 = new Date().getHours();
        this.previousAmPm = null;

        this.initialize();
    }

    initialize() {
        this.populateCountrySelects();
        this.populateMinuteSelect();
        this.populateAmPmSelect();
        this.setInitialDate();
        this.setInitialTime();
        this.setInitialButtonState();
        this.toggleTimeFormat(); // Toggle format after init
        this.convertTime();
        this.setupEventListeners();
        this.setInitialAmPmVisibility();
    }
 setInitialButtonState() {
        if (this.is24HourFormat) {
            this.elements.format24hrBtn.classList.add('active');
           this.elements.format12hrBtn.classList.remove('active');

        } else {
           this.elements.format12hrBtn.classList.add('active');
           this.elements.format24hrBtn.classList.remove('active');
        }
    }
    populateCountrySelects() {
        window.populateCountrySelect(this.elements.fromCountrySelect);
        window.populateCountrySelect(this.elements.toCountrySelect);

        // set default value
        this.elements.fromCountrySelect.value = 'Asia/Kathmandu';
        this.elements.toCountrySelect.value = 'Europe/Helsinki';
    }
    populateMinuteSelect() {
        const minuteOptions = [];
        for (let i = 0; i < 60; i++) {
            minuteOptions.push({ value: String(i).padStart(2, '0'), text: String(i).padStart(2, '0') });
        }
        this.populateDropdown(this.elements.fromMinuteSelect, minuteOptions);
    }

    populateAmPmSelect() {
        this.populateDropdown(this.elements.fromAmPmSelect, [{ value: 'AM', text: 'AM' }, { value: 'PM', text: 'PM' }]);
    }

    setInitialDate() {
        const today = new Date();
        this.elements.fromDateInput.value = today.toISOString().split('T')[0];
    }

    populateDropdown(select, options) {
         options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.value;
            optionElement.text = option.text;
            select.appendChild(optionElement);
        });
    }

    updateHourOptions() {
        this.elements.fromHourSelect.innerHTML = '';
        const hourOptions = [];
         if (!this.is24HourFormat) {
             for (let i = 1; i <= 12; i++) {
                hourOptions.push({ value: String(i).padStart(2, '0'), text: String(i).padStart(2, '0') });
            }
         } else {
            for (let i = 0; i < 24; i++) {
                hourOptions.push({ value: String(i).padStart(2, '0'), text: String(i).padStart(2, '0') });
            }
        }
        this.populateDropdown(this.elements.fromHourSelect, hourOptions);
    }
    calculateTimeDifference(fromTimeZone, toTimeZone) {
      try {
            const now = new Date();
            const country1Time = new Date(now.toLocaleString("en-US", { timeZone: fromTimeZone }));
            const country2Time = new Date(now.toLocaleString("en-US", { timeZone: toTimeZone }));

            const timeDiffMs = country2Time.getTime() - country1Time.getTime();
            const timeDiffAbs = Math.abs(timeDiffMs);
            const diffHours = Math.floor(timeDiffAbs / (1000 * 60 * 60));
            const diffMinutes = Math.floor((timeDiffAbs % (1000 * 60 * 60)) / (1000 * 60));
            const diffSeconds = Math.floor((timeDiffAbs % (1000 * 60)) / 1000);
            let timeDiffStr;
            let directionIndicator = '';
            if (timeDiffMs > 0) {
                timeDiffStr = `+${String(diffHours).padStart(2, '0')}:${String(diffMinutes).padStart(2, '0')}:${String(diffSeconds).padStart(2, '0')}`;
                directionIndicator = 'ahead';
            } else if (timeDiffMs < 0) {
                timeDiffStr = `-${String(diffHours).padStart(2, '0')}:${String(diffMinutes).padStart(2, '0')}:${String(diffSeconds).padStart(2, '0')}`;
                directionIndicator = 'behind';
            } else {
                timeDiffStr = "Same Time";
                directionIndicator = '';
            }

            return `${timeDiffStr}  ${directionIndicator}`;

        } catch (error) {
            console.error("Error calculating time difference:", error);
            return "Error";
        }
    }

     convertTime() {
        const fromTimeZone = this.elements.fromCountrySelect.value;
        const toTimeZone = this.elements.toCountrySelect.value;
        const fromHour = parseInt(this.elements.fromHourSelect.value, 10);
        const fromMinute = parseInt(this.elements.fromMinuteSelect.value, 10);
        const fromDate = this.elements.fromDateInput.value;
        const fromAmPm = this.elements.fromAmPmSelect.value;

        let fromHour24 = fromHour;
          if (!this.is24HourFormat) {
           if (fromAmPm === 'PM' && fromHour !== 12) fromHour24 += 12;
           if (fromAmPm === 'AM' && fromHour === 12) fromHour24 = 0;
         }

         if (!fromTimeZone || !toTimeZone || isNaN(fromHour) || isNaN(fromMinute)) {
            this.elements.convertedTimeDisplay.textContent = '--:--:--';
            this.elements.timeDifferenceDisplay.textContent = '--';
             this.elements.timeCalculationDisplay.textContent = '--';
            return;
        }

        try {
             const fromDateObj = new Date(`${fromDate}T${String(fromHour24).padStart(2, '0')}:${String(fromMinute).padStart(2, '0')}:00`);
            const fromTime = fromDateObj.getTime();

            const timeDiff = this.calculateTimeDifference(fromTimeZone, toTimeZone);
           const timeDiffParts = timeDiff.match(/([+-]?\d{2}):(\d{2}):(\d{2})/);
           let timeDiffMs = 0;
             if(timeDiffParts){
                 const sign = timeDiffParts[1][0] === '-' ? -1 : 1;
                  const diffHours = parseInt(timeDiffParts[1].substring(1));
                  const diffMinutes = parseInt(timeDiffParts[2]);
                 const diffSeconds = parseInt(timeDiffParts[3]);

                timeDiffMs = sign * ((diffHours * 60 * 60) + (diffMinutes * 60) + diffSeconds) * 1000;
             }
            const convertedDate = new Date(fromTime + timeDiffMs);

             this.elements.timeDifferenceDisplay.textContent = timeDiff;
            this.elements.timeCalculationDisplay.textContent = `Time difference: ${timeDiff}. Converted time: Input time + time difference = ${window.formatTime(convertedDate)}`;
            this.elements.convertedTimeDisplay.textContent = window.formatTime(convertedDate);
        }
         catch (error) {
            console.error("Error during time conversion:", error);
             this.elements.convertedTimeDisplay.textContent = 'Error';
            this.elements.timeDifferenceDisplay.textContent = 'Error';
            this.elements.timeCalculationDisplay.textContent = 'Error';
        }
    }



    setInitialTime() {
        const now = new Date();
         this.selectedHour24 = now.getHours();
         let displayHour = this.selectedHour24;
        let defaultAmPm = this.selectedHour24 >= 12 ? 'PM' : 'AM';

          if (!this.is24HourFormat) {
            displayHour = this.selectedHour24 % 12;
            displayHour = displayHour ? displayHour : 12;
        }

         this.elements.fromHourSelect.value = String(displayHour).padStart(2, '0');
         this.elements.fromMinuteSelect.value = String(now.getMinutes()).padStart(2, '0');
         this.elements.fromAmPmSelect.value = defaultAmPm;
    }

    convertTo12Hour(hour24) {
        let hour12 = hour24 % 12;
        hour12 = hour12 ? hour12 : 12;
        const ampm = hour24 < 12 || hour24 === 24 ? 'AM' : 'PM';
        return { hour12, ampm };
    }

    convertTo24Hour(hour12, ampm) {
        let hour24 = parseInt(hour12, 10);
        if (ampm === 'PM' && hour24 !== 12) hour24 += 12;
        if (ampm === 'AM' && hour24 === 12) hour24 = 0;
        return hour24;
    }


    toggleTimeFormat() {
       const selectedHour = this.elements.fromHourSelect.value;
        const selectedAmPm = this.elements.fromAmPmSelect.value;

        this.updateHourOptions();

         if (!this.is24HourFormat) {
            // Convert to 12-hour format
           const { hour12, ampm } = this.convertTo12Hour(this.selectedHour24);
           this.elements.fromHourSelect.value = String(hour12).padStart(2, '0');
             this.previousAmPm = ampm;

             this.elements.ampmLabel.style.display = 'inline';
              this.elements.fromAmPmSelect.style.display = 'inline';
        }
        else {
           // Convert to 24-hour format
           this.selectedHour24 = this.convertTo24Hour(selectedHour, selectedAmPm);
            this.previousAmPm = selectedAmPm;

            this.elements.ampmLabel.style.display = 'none';
              this.elements.fromAmPmSelect.style.display = 'none';
        }
        this.setInitialTime();
        this.convertTime();
    }


    setInitialAmPmVisibility() {
       if(!this.is24HourFormat){
            this.elements.ampmLabel.style.display = 'inline';
           this.elements.fromAmPmSelect.style.display = 'inline';
        }
       else {
           this.elements.ampmLabel.style.display = 'none';
           this.elements.fromAmPmSelect.style.display = 'none';
        }
   }
    setupEventListeners() {
       this.elements.format12hrBtn.addEventListener('click', () => {
            this.is24HourFormat = false;
             this.elements.format12hrBtn.classList.add('active');
             this.elements.format24hrBtn.classList.remove('active');
            this.toggleTimeFormat();
        });
        this.elements.format24hrBtn.addEventListener('click', () => {
            this.is24HourFormat = true;
             this.elements.format24hrBtn.classList.add('active');
             this.elements.format12hrBtn.classList.remove('active');
            this.toggleTimeFormat();
        });

        this.elements.fromCountrySelect.addEventListener('change', () => this.convertTime());
        this.elements.toCountrySelect.addEventListener('change', () => this.convertTime());
        this.elements.fromHourSelect.addEventListener('change', () => {
             if (!this.is24HourFormat) {
                 this.selectedHour24 = parseInt(this.elements.fromHourSelect.value);
             }
            this.convertTime();
        });
        this.elements.fromMinuteSelect.addEventListener('change', () => this.convertTime());
        this.elements.fromAmPmSelect.addEventListener('change', () => {
             if (!this.is24HourFormat) {
               this.previousAmPm = this.elements.fromAmPmSelect.value;
           }
           this.convertTime();
        });
        this.elements.fromDateInput.addEventListener('change', () => this.convertTime());
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new TimeConverter();
});