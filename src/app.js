/**
 * Global Constants
 */
const date = new Date();
const currentDate = date.getDate();
const currentMonth = date.getMonth();
const currentYear = date.getFullYear();
const daysThai = ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'];
const monthsThai = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
const totalDays = 37; // 31 Days + pre,post 7 days
const bgDummy = `oklch(32.11% 0 0)`;
const bgWeekend = `oklch(92.8% 0 0)`;

const mainTitle = document.querySelector('h1');
const mainTable = document.querySelector('table');

/**
 * Header
 */
function header(year) {
  mainTitle.innerText = `Calendar ${year}`;
}

/**
 * Table Header
 */
function tableHeader() {
  const tableHeader = document.createElement('thead');
  const tableHeaderRow = document.createElement('tr');

  // Dummy Header
  const tableHeaderDummy = document.createElement('th');
  tableHeaderDummy.innerText = '#';
  tableHeaderRow.appendChild(tableHeaderDummy);

  // Header with Day
  for (let i = 0; i < totalDays; i++) {
    const tableHeaderCell = document.createElement('th');
    tableHeaderCell.innerText = daysThai[i % 7];

    tableHeaderRow.appendChild(tableHeaderCell);
  }

  tableHeader.appendChild(tableHeaderRow);
  mainTable.appendChild(tableHeader);
}

/**
 * Table Body
 */
function tableBody(year) {
  const tableBody = document.createElement('tbody');

  // Loop row for 12 months
  for (let i = 0; i < monthsThai.length; i++) {
    const startingDay = new Date(year, i, 1).getDay();
    const numberOfDateInEachMonth = new Date(year, i + 1, 0).getDate();

    // Month Title
    const tableBodyRow = document.createElement('tr');
    const monthTitleCell = document.createElement('td');
    monthTitleCell.innerText = monthsThai[i];
    tableBodyRow.appendChild(monthTitleCell);

    // Month Pre-dummy
    for (let k = 0; k < startingDay; k++) {
      const monthDummyCell = document.createElement('td');
      monthDummyCell.style.backgroundColor = bgDummy;
      tableBodyRow.appendChild(monthDummyCell);
    }

    // Month Day
    for (let k = 1; k <= numberOfDateInEachMonth; k++) {
      const monthDayCell = document.createElement('td');
      monthDayCell.innerText = k;
      tableBodyRow.appendChild(monthDayCell);
    }

    // Month Post-dummy
    // 37 - preDummyCell - startingIndex (+1)
    for (let k = 1; k < totalDays - numberOfDateInEachMonth - startingDay + 1; k++) {
      const monthDayCell = document.createElement('td');
      monthDayCell.style.backgroundColor = bgDummy;
      tableBodyRow.appendChild(monthDayCell);
    }

    tableBody.appendChild(tableBodyRow);
    mainTable.appendChild(tableBody);
  }
}

/**
 * Table Styling
 */

function tableStyle() {
  const weekendRow = document.querySelectorAll('tbody tr');
  for (let i = 0; i < weekendRow.length; i++) {
    const allCell = weekendRow[i].querySelectorAll('td');

    for (let k = 0; k < allCell.length; k++) {
      if (k == 7 || k == 8 || k == 14 || k == 15 || k == 21 || k == 22 || k == 28 || k == 29) {
        allCell[k].style.backgroundColor = bgWeekend;
      } else if ((k == 1 && allCell[k].innerText !== '') || (k == 35 && allCell[k].innerText !== '') || (k == 36 && allCell[k].innerText !== '')) {
        allCell[k].style.backgroundColor = bgWeekend;
      }
    }
  }
}

/**
 * Blink Today
 */

function today() {
  const monthRow = document.querySelectorAll('tbody tr');

  for (let i = 0; i < monthRow.length; i++) {
    if (i === currentMonth) {
      monthRow[i].querySelectorAll('td')[currentDate + 1].classList.add('blink182');
    }
  }
}

header(currentYear);
tableHeader();
tableBody(currentYear);
tableStyle();
today();
