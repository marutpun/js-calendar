// Constants
const BUDDHIST_ERA_OFFSET = 543;
const TOTAL_DAYS = 37;
const WEEKEND_BG = 'hsl(223.81 0% 91%)';
const DUMMY_BG = 'hsl(223.81 0% 20%)';
const DAY_OF_WEEK = ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'];
const MONTHS = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];

// Cache DOM elements
const cache = {
  mainTable: document.querySelector('table'),
  bar: document.querySelector('.bar'),
  barLabel: document.querySelector('.progress .label'),
  h1: document.querySelector('h1'),
};

// Helper functions
const createElementWithText = (tag, text) => {
  const element = document.createElement(tag);
  element.textContent = text;
  return element;
};

const createDummyCell = () => {
  const dummyCell = document.createElement('td');
  dummyCell.style.backgroundColor = DUMMY_BG;
  return dummyCell;
};

const getDateInfo = (date = new Date()) => ({
  currentDate: date.getDate(),
  currentMonth: date.getMonth(),
  currentYear: date.getFullYear(),
});

// Main functions
const setYearHeading = (year) => {
  cache.h1.appendChild(document.createTextNode(`\xa0${year + BUDDHIST_ERA_OFFSET}`));
};

const tableHeaderInit = () => {
  const tableHeader = document.createElement('thead');
  const tableHeaderRow = document.createElement('tr');
  tableHeaderRow.appendChild(createElementWithText('th', '#'));

  DAY_OF_WEEK.forEach((day) => {
    tableHeaderRow.appendChild(createElementWithText('th', day));
  });

  tableHeader.appendChild(tableHeaderRow);
  cache.mainTable.appendChild(tableHeader);
};

const tableBodyInit = (year) => {
  const tableBody = document.createElement('tbody');
  const fragment = document.createDocumentFragment();

  MONTHS.forEach((month, i) => {
    const startingDay = new Date(year, i, 1).getDay();
    const numberOfDaysInMonth = new Date(year, i + 1, 0).getDate();

    const tableBodyRow = document.createElement('tr');
    tableBodyRow.appendChild(createElementWithText('td', month));

    // Dummy days
    for (let k = 0; k < startingDay; k++) {
      tableBodyRow.appendChild(createDummyCell());
    }

    // Month days
    for (let k = 1; k <= numberOfDaysInMonth; k++) {
      const monthDayCell = createElementWithText('td', k.toString());
      monthDayCell.setAttribute('aria-label', `${k}/${i + 1}/${year}`);
      tableBodyRow.appendChild(monthDayCell);
    }

    // Post dummy days
    for (let k = 1; k < TOTAL_DAYS - numberOfDaysInMonth - startingDay + 1; k++) {
      tableBodyRow.appendChild(createDummyCell());
    }

    fragment.appendChild(tableBodyRow);
  });

  tableBody.appendChild(fragment);
  cache.mainTable.appendChild(tableBody);
};

const weekendStyle = () => {
  const weekendRows = document.querySelectorAll('tbody tr');
  weekendRows.forEach((row) => {
    const cells = row.querySelectorAll('td');
    cells.forEach((cell, index) => {
      if (index > 0 && cell.textContent !== '' && (index % 7 === 0 || index % 7 === 1)) {
        cell.style.backgroundColor = WEEKEND_BG;
      }
    });
  });
};

const todayBlink = (date, month, year) => {
  const monthRows = document.querySelectorAll('tbody tr');
  const targetRow = monthRows[month];
  if (targetRow) {
    const noOfPreCell = new Date(year, month, 1).getDay();
    const selectedCell = targetRow.querySelectorAll('td')[noOfPreCell + date];
    if (selectedCell) {
      selectedCell.classList.add('blink182');
      selectedCell.removeAttribute('style');
    }
  }
};

const calculateTimeUntilMidnight = () => {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  return midnight - now;
};

const refreshAtMidnight = () => {
  setTimeout(() => {
    window.location.reload();
  }, calculateTimeUntilMidnight());
};

const initCalendarTable = (year) => {
  const { currentDate, currentMonth, currentYear } = getDateInfo();
  setYearHeading(year);
  tableHeaderInit();
  tableBodyInit(year);
  weekendStyle();
  todayBlink(currentDate, currentMonth, currentYear);
  refreshAtMidnight();
};

const dayRatio = (today = new Date()) => {
  const startOfYear = new Date(today.getFullYear(), 0, 1);
  const endOfYear = new Date(today.getFullYear(), 11, 31);

  const totalDays = (endOfYear - startOfYear) / (1000 * 60 * 60 * 24) + 1;
  const daysElapsed = (today - startOfYear) / (1000 * 60 * 60 * 24) + 1;

  const percentage = ((daysElapsed / totalDays) * 100).toFixed(2);

  if (cache.bar && cache.barLabel) {
    cache.bar.style.width = `${percentage}%`;
    cache.barLabel.textContent = `This year is ${percentage}%`;
  }
};

// Initialize
const { currentYear } = getDateInfo();
initCalendarTable(currentYear);
dayRatio();
