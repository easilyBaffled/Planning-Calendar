import './style.css';
// import { install } from 'esinstall';
import { JsonCalendar } from 'json-calendar';
console.tap = (v, ...rest) => (console.log(v, ...rest), v)
const d = new Date();
function daysInMonth(month, year) {
  return new Date(parseInt(year), parseInt(month) + 1, 0).getDate();
}

const year = 1900 - d.getYear();
const monthIndex = d.getMonth();
const dayInWeek = d.getDay();

const [currentMonth, ...months] = Array(3)
  .fill(0)
  .map((__, m) =>
    Array(daysInMonth(monthIndex + m, year))
      .fill(0)
      .map((__, i) => ({ month: monthIndex + m + 1, date: i + 1}))
  );

const calendarArray = currentMonth
  .slice(d.getDate() - 1 - dayInWeek)
  .concat(...months).slice(0, 56);

const importantDates = {
    10: {
        28: 'Debbie in Dallas',
        29: 'Debbie in Dallas',
        30: 'Debbie in Dallas',
        31: 'Halloween'
    },
    11: {
        1: ['DR: Debbie 👀🩺','DR: OBGYN'],
        3: 'Daylight Saving Time Ends',
        5: 'Election Day',
        9: 'Hold: Kobrin 🎂',
        10: 'Hold: Kobrin 🎂',
        11: 'Veterans Day',
        12: 'DR: PT',
        19: 'DR: dentist',
        26: 'DR: OBGYN',
        28: 'Thanksgiving'
    }
}

console.log(calendarArray)
document.querySelector('#app').innerHTML = `
<div class="calendar-wrapper">
  <ol class="calendar">
    
    <li class="day-name">Sun</li>
    <li class="day-name">Mon</li>
    <li class="day-name">Tue</li>
    <li class="day-name">Wed</li>
    <li class="day-name">Thu</li>
    <li class="day-name">Fri</li>
    <li class="day-name">Sat</li>
    
    ${calendarArray
      .map(
        ({ month, date }) =>
          `<li class="date-cell ${date === 1 ? 'first-date' : ''}" >
            <div class="date-text">${date}</div>
            ${
              console.tap([].concat(importantDates?.[month]?.[date] ?? [])).map(
                (event) => `<div class="event ${event} ${ event.includes(':') ? event.split(':')[0] : '' }">${event}</div>`
              ).join(' ')
            }
           </li>`
      )
      .join('')}
  </ol>
</div>
`;
