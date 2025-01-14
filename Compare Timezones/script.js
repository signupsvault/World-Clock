document.addEventListener('DOMContentLoaded', () => {
    const country1Select = document.getElementById('country1-select');
    const country2Select = document.getElementById('country2-select');
    const country1Name = document.querySelector('#time-card-1 .country-name');
    const country2Name = document.querySelector('#time-card-2 .country-name');
    const time1 = document.querySelector('#time-card-1 .time');
    const time2 = document.querySelector('#time-card-2 .time');
    const timeDiffCard = document.querySelector('.time-diff-card');
    const body = document.querySelector('body');

    let intervalId;

    // Populate the dropdowns
    window.populateCountrySelect(country1Select);
    window.populateCountrySelect(country2Select);

    // Set default time zones
    country1Select.value = "Asia/Kathmandu";
    country2Select.value = "Europe/Helsinki";


    // Initial Table Update
    updateClock();


    //Update the table on change
    country1Select.addEventListener('change', () => {
        clearInterval(intervalId); // clear previous clock
         updateClock();
    });
    country2Select.addEventListener('change', () => {
        clearInterval(intervalId); // clear previous clock
        updateClock();
    });
    function updateClock() {
        window.updateComparisonTable();
         intervalId = setInterval(window.updateComparisonTable, 1000); // Update every second
     }


});
     window.updateComparisonTable=function () {
         const country1Select = document.getElementById('country1-select');
         const country2Select = document.getElementById('country2-select');
        const country1Name = document.querySelector('#time-card-1 .country-name');
        const country2Name = document.querySelector('#time-card-2 .country-name');
          const time1 = document.querySelector('#time-card-1 .time');
        const time2 = document.querySelector('#time-card-2 .time');
          const timeDiffCard = document.querySelector('.time-diff-card');
         const body = document.querySelector('body');

        const country1TimeZone = country1Select.value;
        const country2TimeZone = country2Select.value;

         if (!country1TimeZone || !country2TimeZone) return;


        const now = new Date();

        const country1Time = new Date(now.toLocaleString("en-US", { timeZone: country1TimeZone }));
        const country2Time = new Date(now.toLocaleString("en-US", { timeZone: country2TimeZone }));

        const country1NameText = window.timeZones.find(c => c.timeZone === country1TimeZone).name;
        const country2NameText = window.timeZones.find(c => c.timeZone === country2TimeZone).name;


         const formattedTime1 = window.formatTime(country1Time);
         const formattedTime2 = window.formatTime(country2Time);


        const timeDiffMs = country1Time.getTime() - country2Time.getTime();
        const timeDiffAbs = Math.abs(timeDiffMs);
        const diffHours = Math.floor(timeDiffAbs / (1000 * 60 * 60));
        const diffMinutes = Math.floor((timeDiffAbs % (1000 * 60 * 60)) / (1000 * 60));
         const diffSeconds = Math.floor((timeDiffAbs % (1000 * 60)) / 1000);
          let timeDiffStr;
           let directionIndicator = '';
           if (timeDiffMs > 0) {
            timeDiffStr = `${String(diffHours).padStart(2, '0')}:${String(diffMinutes).padStart(2, '0')}:${String(diffSeconds).padStart(2, '0')}`;
              directionIndicator = '<span class="direction-indicator ahead">ahead</span>';
         } else if (timeDiffMs < 0) {
             timeDiffStr = `${String(diffHours).padStart(2, '0')}:${String(diffMinutes).padStart(2, '0')}:${String(diffSeconds).padStart(2, '0')}`;
            directionIndicator = '<span class="direction-indicator behind">behind</span>';
         } else {
            timeDiffStr = "Same Time";
             directionIndicator = '';
         }


        country1Name.textContent = country1NameText;
        country2Name.textContent = country2NameText;
         time1.textContent = formattedTime1;
        time2.textContent = formattedTime2;


         timeDiffCard.innerHTML = `
             <h3>Time Difference</h3>
              <div class="time-diff-container">
                 <p class="country-name">${country1NameText}</p>
                  <p class="time-diff">${timeDiffStr} <span class="direction-indicator">${directionIndicator}</span> </p>
                    <p class="country-name">${country2NameText}</p>
             </div>
         `;
         if (body.classList.contains('light-mode')) {
              country1Name.classList.add('light-mode');
          country2Name.classList.add('light-mode');
            time1.classList.add('light-mode');
             time2.classList.add('light-mode');
             timeDiffCard.querySelector('h3').classList.add('light-mode');
             timeDiffCard.querySelector('.country-name:nth-child(1)').classList.add('light-mode');
            timeDiffCard.querySelector('.country-name:nth-child(3)').classList.add('light-mode');
            timeDiffCard.querySelector('.time-diff').classList.add('light-mode');
             timeDiffCard.querySelector('.direction-indicator')?.classList.add('light-mode');
         }
          else {
             country1Name.classList.remove('light-mode');
          country2Name.classList.remove('light-mode');
            time1.classList.remove('light-mode');
            time2.classList.remove('light-mode');
               timeDiffCard.querySelector('h3').classList.remove('light-mode');
              timeDiffCard.querySelector('.country-name:nth-child(1)').classList.remove('light-mode');
             timeDiffCard.querySelector('.country-name:nth-child(3)').classList.remove('light-mode');
            timeDiffCard.querySelector('.time-diff').classList.remove('light-mode');
           timeDiffCard.querySelector('.direction-indicator')?.classList.remove('light-mode');
        }

    }