const dt = new Date();
const currentDate = dt.getDate();
const currentMonth = dt.getMonth();
const currentYear = dt.getFullYear();
const dayOfWeek = ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'];
const months = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
const bhuddistEraOffset = 543;
const totalDays = 37;
const weekendBg = `hsl(223.81 0% 91%)`;
const dummyBg = `hsl(223.81 0% 20%)`;

const mainTable = document.querySelector('table');

function setYearHeading(year) {
  const headerContent = document.createTextNode(`\xa0${year + bhuddistEraOffset}`);
  document.querySelector('h1').appendChild(headerContent);
}

function createDummyCell() {
  const dummyCell = document.createElement('td');
  dummyCell.style.backgroundColor = dummyBg;
  return dummyCell;
}

function tableHeaderInit() {
    const tableHeader = document.createElement('thead');
  const tableHeaderRow = document.createElement('tr');
  const tableHeaderDummy = document.createElement('th');
  const dummyText = document.createTextNode(`#`);
  tableHeaderDummy.appendChild(dummyText);
  tableHeaderRow.appendChild(tableHeaderDummy);

  for (let i = 0; i < totalDays; i++) {
    const tableHeaderCell = document.createElement('th');
    tableHeaderCell.innerText = dayOfWeek[i % 7];
    tableHeaderRow.appendChild(tableHeaderCell);
  }

  tableHeader.appendChild(tableHeaderRow);
  mainTable.appendChild(tableHeader);
}

function tableBodyInit(year) {
  const tableBody = document.createElement('tbody');

  for (let i = 0; i < months.length; i++) {
    const startingDay = new Date(year, i, 1).getDay();
    const numberOfDateInEachMonth = new Date(year, i + 1, 0).getDate();

    // Month - Month Title
    const tableBodyRow = document.createElement('tr');
    const monthTitleCell = document.createElement('td');
    const monthTitle = document.createTextNode(months[i]);
    monthTitleCell.appendChild(monthTitle);
    tableBodyRow.appendChild(monthTitleCell);

    // Month - Dummy Day
    for (let k = 0; k < startingDay; k++) {
      tableBodyRow.appendChild(createDummyCell());
    }

    // Month - Day
    for (let k = 1; k <= numberOfDateInEachMonth; k++) {
      const monthDayCell = document.createElement('td');
      const dateText = document.createTextNode(k.toString());
      monthDayCell.setAttribute('aria-label', `${k}/${currentMonth + 1}/${currentYear}}`);
      monthDayCell.appendChild(dateText);
      tableBodyRow.appendChild(monthDayCell);
    }

    // Month - Post Dummy
    for (let k = 1; k < totalDays - numberOfDateInEachMonth - startingDay + 1; k++) {
      tableBodyRow.appendChild(createDummyCell());
    }

    tableBody.appendChild(tableBodyRow);
    mainTable.appendChild(tableBody);
  }
}

function weekendStyle() {
  const weekendRow = Array.prototype.slice.call(document.querySelectorAll('tbody tr'), 0);

  for (let i = 0; i < weekendRow.length; i++) {
    const allCell = Array.prototype.slice.call(weekendRow[i].querySelectorAll('td'), 0);

    for (let k = 0; k < allCell.length; k++) {
      if (k == 7 || k == 8 || k == 14 || k == 15 || k == 21 || k == 22 || k == 28 || k == 29) {
        allCell[k].style.backgroundColor = weekendBg;
      } else if ((k == 1 && allCell[k].innerText !== '') || (k == 35 && allCell[k].innerText !== '') || (k == 36 && allCell[k].innerText !== '')) {
        allCell[k].style.backgroundColor = weekendBg;
      }
    }
  }
}

function todayBlink(date, month, year) {
  const monthRow = Array.prototype.slice.call(document.querySelectorAll('tbody tr'), 0);

  for (let i = 0; i < monthRow.length; i++) {
    const noOfPreCell = new Date(year, i, 1).getDay();

    if (i === month) {
      const selectedCell = monthRow[i].querySelectorAll('td')[noOfPreCell + date];
      selectedCell.classList.add('blink182');
      selectedCell.removeAttribute('style');
    }
  }
}

function calculateTimeUntilMidnight() {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  // 24:00 - now = remaining time left;
  return midnight - now;
}

function refreshAtMidnight() {
  const timeUntilMidnight = calculateTimeUntilMidnight();
  setTimeout(() => {
    window.location.reload();
  }, timeUntilMidnight);
}

function initCalendarTable(year) {
  setYearHeading(year);
  tableHeaderInit();
  tableBodyInit(year);
  weekendStyle();
  todayBlink(currentDate, currentMonth, currentYear);
  refreshAtMidnight();
}

initCalendarTable(currentYear);
