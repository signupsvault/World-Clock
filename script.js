document.addEventListener('DOMContentLoaded', () => {
  // --- Global Mode Switch Logic (REMOVED) ---
  // --- Default Dark Mode Set ---
  const body = document.querySelector('body');
  body.classList.add('dark-mode'); // Ensure body has dark-mode class

  //--- Global formatTime function ---
  let is24HourFormat = false;
  window.formatTime = function (date) {
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();
      if (is24HourFormat) {
          return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      }
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} ${ampm}`;
  };

  const format12hrBtn = document.getElementById('format-12hr-btn');
  const format24hrBtn = document.getElementById('format-24hr-btn');

  if (format12hrBtn && format24hrBtn) {
      format12hrBtn.addEventListener('click', () => {
          is24HourFormat = false;
          format12hrBtn.classList.add('active');
          format24hrBtn.classList.remove('active');
         if(window.updateComparisonTable){
             window.updateComparisonTable();
         }
          if(window.convertTime){
            window.convertTime();
         }
      });
      format24hrBtn.addEventListener('click', () => {
          is24HourFormat = true;
          format24hrBtn.classList.add('active');
          format12hrBtn.classList.remove('active');
          if(window.updateComparisonTable){
           window.updateComparisonTable();
          }
          if(window.convertTime){
             window.convertTime();
          }
      });
  }

  //--- Global Time Zone Data ---
  window.timeZones = [
      { name: 'Afghanistan', timeZone: 'Asia/Kabul' },
      { name: 'Albania', timeZone: 'Europe/Tirane' },
      { name: 'Algeria', timeZone: 'Africa/Algiers' },
      { name: 'American Samoa', timeZone: 'Pacific/Pago_Pago' },
      { name: 'Andorra', timeZone: 'Europe/Andorra' },
      { name: 'Angola', timeZone: 'Africa/Luanda' },
      { name: 'Anguilla', timeZone: 'America/Anguilla' },
      { name: 'Antigua and Barbuda', timeZone: 'America/Antigua' },
      { name: 'Argentina', timeZone: 'America/Argentina/Buenos_Aires' },
      { name: 'Armenia', timeZone: 'Asia/Yerevan' },
      { name: 'Aruba', timeZone: 'America/Aruba' },
      { name: 'Australia', timeZone: 'Australia/Sydney' },
      { name: 'Austria', timeZone: 'Europe/Vienna' },
      { name: 'Azerbaijan', timeZone: 'Asia/Baku' },
      { name: 'Bahamas', timeZone: 'America/Nassau' },
      { name: 'Bahrain', timeZone: 'Asia/Bahrain' },
      { name: 'Bangladesh', timeZone: 'Asia/Dhaka' },
      { name: 'Barbados', timeZone: 'America/Barbados' },
      { name: 'Belarus', timeZone: 'Europe/Minsk' },
      { name: 'Belgium', timeZone: 'Europe/Brussels' },
      { name: 'Belize', timeZone: 'America/Belize' },
      { name: 'Benin', timeZone: 'Africa/Porto-Novo' },
      { name: 'Bermuda', timeZone: 'Atlantic/Bermuda' },
      { name: 'Bhutan', timeZone: 'Asia/Thimphu' },
      { name: 'Bolivia', timeZone: 'America/La_Paz' },
      { name: 'Bosnia and Herzegovina', timeZone: 'Europe/Sarajevo' },
      { name: 'Botswana', timeZone: 'Africa/Gaborone' },
      { name: 'Brazil', timeZone: 'America/Sao_Paulo' },
      { name: 'British Indian Ocean Territory', timeZone: 'Indian/Chagos' },
      { name: 'British Virgin Islands', timeZone: 'America/Tortola' },
      { name: 'Brunei', timeZone: 'Asia/Brunei' },
      { name: 'Bulgaria', timeZone: 'Europe/Sofia' },
      { name: 'Burkina Faso', timeZone: 'Africa/Ouagadougou' },
      { name: 'Burundi', timeZone: 'Africa/Bujumbura' },
      { name: 'Cabo Verde', timeZone: 'Atlantic/Cape_Verde' },
      { name: 'Cambodia', timeZone: 'Asia/Phnom_Penh' },
      { name: 'Cameroon', timeZone: 'Africa/Douala' },
      { name: 'Canada', timeZone: 'America/Toronto' },
      { name: 'Cayman Islands', timeZone: 'America/Cayman' },
      { name: 'Central African Republic', timeZone: 'Africa/Bangui' },
      { name: 'Chad', timeZone: 'Africa/Ndjamena' },
      { name: 'Chile', timeZone: 'America/Santiago' },
      { name: 'China', timeZone: 'Asia/Shanghai' },
      { name: 'Colombia', timeZone: 'America/Bogota' },
      { name: 'Comoros', timeZone: 'Indian/Comoro' },
      { name: 'Congo (Brazzaville)', timeZone: 'Africa/Brazzaville' },
      { name: 'Congo (Kinshasa)', timeZone: 'Africa/Kinshasa' },
      { name: 'Cook Islands', timeZone: 'Pacific/Rarotonga' },
      { name: 'Costa Rica', timeZone: 'America/Costa_Rica' },
      { name: 'Côte d\'Ivoire', timeZone: 'Africa/Abidjan' },
      { name: 'Croatia', timeZone: 'Europe/Zagreb' },
      { name: 'Cuba', timeZone: 'America/Havana' },
      { name: 'Curaçao', timeZone: 'America/Curacao' },
      { name: 'Cyprus', timeZone: 'Asia/Nicosia' },
      { name: 'Czechia', timeZone: 'Europe/Prague' },
      { name: 'Denmark', timeZone: 'Europe/Copenhagen' },
      { name: 'Djibouti', timeZone: 'Africa/Djibouti' },
      { name: 'Dominica', timeZone: 'America/Dominica' },
      { name: 'Dominican Republic', timeZone: 'America/Santo_Domingo' },
      { name: 'Ecuador', timeZone: 'America/Guayaquil' },
      { name: 'Egypt', timeZone: 'Africa/Cairo' },
      { name: 'El Salvador', timeZone: 'America/El_Salvador' },
      { name: 'Equatorial Guinea', timeZone: 'Africa/Malabo' },
      { name: 'Eritrea', timeZone: 'Africa/Asmara' },
      { name: 'Estonia', timeZone: 'Europe/Tallinn' },
      { name: 'Eswatini', timeZone: 'Africa/Mbabane' },
      { name: 'Ethiopia', timeZone: 'Africa/Addis_Ababa' },
      { name: 'Falkland Islands', timeZone: 'Atlantic/Stanley' },
      { name: 'Faroe Islands', timeZone: 'Atlantic/Faroe' },
      { name: 'Fiji', timeZone: 'Pacific/Fiji' },
      { name: 'Finland', timeZone: 'Europe/Helsinki' },
      { name: 'France', timeZone: 'Europe/Paris' },
      { name: 'French Guiana', timeZone: 'America/Cayenne' },
      { name: 'French Polynesia', timeZone: 'Pacific/Tahiti' },
      { name: 'Gabon', timeZone: 'Africa/Libreville' },
      { name: 'Gambia', timeZone: 'Africa/Banjul' },
      { name: 'Georgia', timeZone: 'Asia/Tbilisi' },
      { name: 'Germany', timeZone: 'Europe/Berlin' },
      { name: 'Ghana', timeZone: 'Africa/Accra' },
      { name: 'Gibraltar', timeZone: 'Europe/Gibraltar' },
      { name: 'Greece', timeZone: 'Europe/Athens' },
      { name: 'Greenland', timeZone: 'America/Godthab' },
      { name: 'Grenada', timeZone: 'America/Grenada' },
      { name: 'Guadeloupe', timeZone: 'America/Guadeloupe' },
      { name: 'Guam', timeZone: 'Pacific/Guam' },
      { name: 'Guatemala', timeZone: 'America/Guatemala' },
      { name: 'Guernsey', timeZone: 'Europe/Guernsey' },
      { name: 'Guinea', timeZone: 'Africa/Conakry' },
      { name: 'Guinea-Bissau', timeZone: 'Africa/Bissau' },
      { name: 'Guyana', timeZone: 'America/Guyana' },
      { name: 'Haiti', timeZone: 'America/Port_au-Prince' },
      { name: 'Honduras', timeZone: 'America/Tegucigalpa' },
      { name: 'Hong Kong', timeZone: 'Asia/Hong_Kong' },
      { name: 'Hungary', timeZone: 'Europe/Budapest' },
      { name: 'Iceland', timeZone: 'Atlantic/Reykjavik' },
      { name: 'India', timeZone: 'Asia/Kolkata' },
      { name: 'Indonesia', timeZone: 'Asia/Jakarta' },
      { name: 'Iran', timeZone: 'Asia/Tehran' },
      { name: 'Iraq', timeZone: 'Asia/Baghdad' },
      { name: 'Ireland', timeZone: 'Europe/Dublin' },
      { name: 'Isle of Man', timeZone: 'Europe/Isle_of_Man' },
      { name: 'Israel', timeZone: 'Asia/Jerusalem' },
      { name: 'Italy', timeZone: 'Europe/Rome' },
      { name: 'Jamaica', timeZone: 'America/Jamaica' },
      { name: 'Japan', timeZone: 'Asia/Tokyo' },
      { name: 'Jersey', timeZone: 'Europe/Jersey' },
      { name: 'Jordan', timeZone: 'Asia/Amman' },
      { name: 'Kazakhstan', timeZone: 'Asia/Almaty' },
      { name: 'Kenya', timeZone: 'Africa/Nairobi' },
      { name: 'Kiribati', timeZone: 'Pacific/Tarawa' },
      { name: 'Kuwait', timeZone: 'Asia/Kuwait' },
      { name: 'Kyrgyzstan', timeZone: 'Asia/Bishkek' },
      { name: 'Laos', timeZone: 'Asia/Vientiane' },
      { name: 'Latvia', timeZone: 'Europe/Riga' },
      { name: 'Lebanon', timeZone: 'Asia/Beirut' },
      { name: 'Lesotho', timeZone: 'Africa/Maseru' },
      { name: 'Liberia', timeZone: 'Africa/Monrovia' },
      { name: 'Libya', timeZone: 'Africa/Tripoli' },
      { name: 'Liechtenstein', timeZone: 'Europe/Vaduz' },
      { name: 'Lithuania', timeZone: 'Europe/Vilnius' },
      { name: 'Luxembourg', timeZone: 'Europe/Luxembourg' },
      { name: 'Macau', timeZone: 'Asia/Macau' },
      { name: 'Madagascar', timeZone: 'Indian/Antananarivo' },
      { name: 'Malawi', timeZone: 'Africa/Blantyre' },
      { name: 'Malaysia', timeZone: 'Asia/Kuala_Lumpur' },
      { name: 'Maldives', timeZone: 'Indian/Maldives' },
      { name: 'Mali', timeZone: 'Africa/Bamako' },
      { name: 'Malta', timeZone: 'Europe/Malta' },
      { name: 'Marshall Islands', timeZone: 'Pacific/Majuro' },
      { name: 'Martinique', timeZone: 'America/Martinique' },
      { name: 'Mauritania', timeZone: 'Africa/Nouakchott' },
      { name: 'Mauritius', timeZone: 'Indian/Mauritius' },
      { name: 'Mayotte', timeZone: 'Indian/Mayotte' },
      { name: 'Mexico', timeZone: 'America/Mexico_City' },
      { name: 'Micronesia', timeZone: 'Pacific/Chuuk' },
      { name: 'Moldova', timeZone: 'Europe/Chisinau' },
      { name: 'Monaco', timeZone: 'Europe/Monaco' },
      { name: 'Mongolia', timeZone: 'Asia/Ulaanbaatar' },
      { name: 'Montenegro', timeZone: 'Europe/Podgorica' },
      { name: 'Montserrat', timeZone: 'America/Montserrat' },
      { name: 'Morocco', timeZone: 'Africa/Casablanca' },
      { name: 'Mozambique', timeZone: 'Africa/Maputo' },
      { name: 'Myanmar', timeZone: 'Asia/Yangon' },
      { name: 'Namibia', timeZone: 'Africa/Windhoek' },
      { name: 'Nauru', timeZone: 'Pacific/Nauru' },
      { name: 'Nepal', timeZone: 'Asia/Kathmandu' },
      { name: 'Netherlands', timeZone: 'Europe/Amsterdam' },
      { name: 'New Caledonia', timeZone: 'Pacific/Noumea' },
      { name: 'New Zealand', timeZone: 'Pacific/Auckland' },
      { name: 'Nicaragua', timeZone: 'America/Managua' },
      { name: 'Niger', timeZone: 'Africa/Niamey' },
      { name: 'Nigeria', timeZone: 'Africa/Lagos' },
      { name: 'Niue', timeZone: 'Pacific/Niue' },
      { name: 'North Macedonia', timeZone: 'Europe/Skopje' },
      { name: 'Northern Mariana Islands', timeZone: 'Pacific/Saipan' },
      { name: 'Norway', timeZone: 'Europe/Oslo' },
      { name: 'Oman', timeZone: 'Asia/Muscat' },
      { name: 'Pakistan', timeZone: 'Asia/Karachi' },
      { name: 'Palau', timeZone: 'Pacific/Palau' },
      { name: 'Palestine', timeZone: 'Asia/Gaza' },
      { name: 'Panama', timeZone: 'America/Panama' },
      { name: 'Papua New Guinea', timeZone: 'Pacific/Port_Moresby' },
      { name: 'Paraguay', timeZone: 'America/Asuncion' },
      { name: 'Peru', timeZone: 'America/Lima' },
      { name: 'Philippines', timeZone: 'Asia/Manila' },
      { name: 'Pitcairn', timeZone: 'Pacific/Pitcairn' },
      { name: 'Poland', timeZone: 'Europe/Warsaw' },
      { name: 'Portugal', timeZone: 'Europe/Lisbon' },
       { name: 'Puerto Rico', timeZone: 'America/Puerto_Rico' },
      { name: 'Qatar', timeZone: 'Asia/Qatar' },
      { name: 'Romania', timeZone: 'Europe/Bucharest' },
      { name: 'Russia', timeZone: 'Europe/Moscow' },
      { name: 'Rwanda', timeZone: 'Africa/Kigali' },
       { name: 'Réunion', timeZone: 'Indian/Reunion' },
      { name: 'Saba', timeZone: 'America/Kralendijk' },
      { name: 'Saint Barthélemy', timeZone: 'America/St_Barthelemy' },
       { name: 'Saint Kitts and Nevis', timeZone: 'America/St_Kitts' },
      { name: 'Saint Lucia', timeZone: 'America/St_Lucia' },
      { name: 'Saint Martin', timeZone: 'America/Marigot' },
      { name: 'Saint Pierre and Miquelon', timeZone: 'America/Miquelon' },
      { name: 'Saint Vincent and the Grenadines', timeZone: 'America/St_Vincent' },
      { name: 'Samoa', timeZone: 'Pacific/Apia' },
      { name: 'San Marino', timeZone: 'Europe/San_Marino' },
      { name: 'Sao Tome and Principe', timeZone: 'Africa/Sao_Tome' },
      { name: 'Saudi Arabia', timeZone: 'Asia/Riyadh' },
      { name: 'Senegal', timeZone: 'Africa/Dakar' },
      { name: 'Serbia', timeZone: 'Europe/Belgrade' },
      { name: 'Seychelles', timeZone: 'Indian/Mahe' },
      { name: 'Sierra Leone', timeZone: 'Africa/Freetown' },
      { name: 'Singapore', timeZone: 'Asia/Singapore' },
      { name: 'Sint Maarten', timeZone: 'America/Lower_Princes' },
      { name: 'Slovakia', timeZone: 'Europe/Bratislava' },
      { name: 'Slovenia', timeZone: 'Europe/Ljubljana' },
      { name: 'Solomon Islands', timeZone: 'Pacific/Guadalcanal' },
      { name: 'Somalia', timeZone: 'Africa/Mogadishu' },
      { name: 'South Africa', timeZone: 'Africa/Johannesburg' },
      { name: 'South Korea', timeZone: 'Asia/Seoul' },
      { name: 'South Sudan', timeZone: 'Africa/Juba' },
      { name: 'Spain', timeZone: 'Europe/Madrid' },
      { name: 'Sri Lanka', timeZone: 'Asia/Colombo' },
      { name: 'Sudan', timeZone: 'Africa/Khartoum' },
      { name: 'Suriname', timeZone: 'America/Paramaribo' },
      { name: 'Sweden', timeZone: 'Europe/Stockholm' },
      { name: 'Switzerland', timeZone: 'Europe/Zurich' },
      { name: 'Syria', timeZone: 'Asia/Damascus' },
      { name: 'Taiwan', timeZone: 'Asia/Taipei' },
      { name: 'Tajikistan', timeZone: 'Asia/Dushanbe' },
      { name: 'Tanzania', timeZone: 'Africa/Dar_es_Salaam' },
       { name: 'Thailand', timeZone: 'Asia/Bangkok' },
      { name: 'Timor-Leste', timeZone: 'Asia/Dili' },
      { name: 'Togo', timeZone: 'Africa/Lome' },
      { name: 'Tokelau', timeZone: 'Pacific/Fakaofo' },
      { name: 'Tonga', timeZone: 'Pacific/Tongatapu' },
       { name: 'Trinidad and Tobago', timeZone: 'America/Port_of_Spain' },
      { name: 'Tunisia', timeZone: 'Africa/Tunis' },
      { name: 'Turkey', timeZone: 'Europe/Istanbul' },
      { name: 'Turkmenistan', timeZone: 'Asia/Ashgabat' },
      { name: 'Turks and Caicos Islands', timeZone: 'America/Grand_Turk' },
      { name: 'Tuvalu', timeZone: 'Pacific/Funafuti' },
      { name: 'Uganda', timeZone: 'Africa/Kampala' },
      { name: 'Ukraine', timeZone: 'Europe/Kiev' },
      { name: 'United Arab Emirates', timeZone: 'Asia/Dubai' },
       { name: 'United Kingdom', timeZone: 'Europe/London' },
      { name: 'United States', timeZone: 'America/New_York' },
      { name: 'Uruguay', timeZone: 'America/Montevideo' },
     { name: 'United States Virgin Islands', timeZone: 'America/St_Thomas' },
      { name: 'Uzbekistan', timeZone: 'Asia/Tashkent' },
      { name: 'Vanuatu', timeZone: 'Pacific/Efate' },
       { name: 'Vatican City', timeZone: 'Europe/Vatican' },
      { name: 'Venezuela', timeZone: 'America/Caracas' },
      { name: 'Vietnam', timeZone: 'Asia/Ho_Chi_Minh' },
      { name: 'Wallis and Futuna', timeZone: 'Pacific/Wallis' },
      { name: 'Yemen', timeZone: 'Asia/Aden' },
      { name: 'Zambia', timeZone: 'Africa/Lusaka' },
      { name: 'Zimbabwe', timeZone: 'Africa/Harare' }
  ];

  // --- Global Function to Populate Dropdowns ---
  window.populateCountrySelect = function (selectElement) {
      window.timeZones.forEach(country => {
          const option = document.createElement('option');
          option.value = country.timeZone;
          option.text = country.name;
          selectElement.appendChild(option);
      });
  };

 // Function to update time for elements with a data-timezone attribute
let cachedUtcTime = null;

async function fetchUtcTime() {
    try {
      const response = await fetch('https://timeapi.io/api/Time/current/coordinate');
      if (!response.ok) {
         throw new Error(`HTTP error! status: ${response.status}`);
       }
      const data = await response.json();
      cachedUtcTime = new Date(data.utcDateTime);
    } catch (error) {
       console.error('Failed to fetch UTC time:', error);
    }
}

window.updateTime = async function () {
  if (!cachedUtcTime) {
      await fetchUtcTime(); // Initial fetch of time
    }

    const timeElements = document.querySelectorAll('[data-timezone]');
   timeElements.forEach(element => {
      const timeZone = element.getAttribute('data-timezone');
      if(!cachedUtcTime){
            return; //Exit if cachedUtcTime has not been set yet.
       }
      const now = new Date(cachedUtcTime.getTime());
          const formatter = new Intl.DateTimeFormat('en-US', {
               timeZone: timeZone,
               hour12: is24HourFormat ? false : true,
               hour: '2-digit',
               minute: '2-digit',
               second: '2-digit'
             });
      element.textContent = formatter.format(now) + (is24HourFormat ? "" : (formatter.format(now).includes('PM') ? ' PM' : " AM"));
   });
 };
  setInterval(() => {
     fetchUtcTime(); // fetch utc time on a regular basis
     window.updateTime(); // Also update the UI
}, 1000);


   //--- Navigation Highlight  ---
const path = window.location.pathname;
const navLinks = document.querySelectorAll('nav ul li a');

navLinks.forEach(link => {
    const linkPath = new URL(link.href, window.location.origin).pathname;
    if (linkPath === path) {
        link.classList.add('active');
    } else {
        link.classList.remove('active');
    }
});

 // --- Global Transition setup for header and footer ---
  const header = document.querySelector('header');
   const footer = document.querySelector('footer');

    //Initial Hide
    header.classList.remove('visible');
    footer.classList.remove('visible');

});