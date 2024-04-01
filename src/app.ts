/* Global Constants */
const date: Date = new Date();
const currentDate: number = date.getDate();
const currentMonth: number = date.getMonth();
const currentYear: number = date.getFullYear();
const daysOfWeek: string[] = ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'];
const monthsThai: string[] = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
const totalDays: number = 37; // 31 Days + pre,post 7 days
const bgDummy: string = `oklch(32.11% 0 0)`;
const bgWeekend: string = `oklch(92.8% 0 0)`;

const headerTitle = document.querySelector('h1')! as HTMLHeadingElement;
const mainTable = document.querySelector('table')! as HTMLTableElement;

/* Header */
function heading(year: number) {
  headerTitle.innerText = `Calendar ${year + 543}`;
}

/* Table Header Init */
function tableHeaderInit() {
  const tableHead = document.createElement('thead') as HTMLTableSectionElement;
  const tableHeaderRow = document.createElement('tr') as HTMLTableRowElement;
  const tableHeaderDummy = document.createElement('th') as HTMLTableCellElement;

  tableHeaderDummy.innerText = '#';
  tableHeaderRow.appendChild(tableHeaderDummy);

  // Header with Day
  for (let i: number = 0; i < totalDays; i++) {
    const tableHeaderCell = document.createElement('th') as HTMLTableCellElement;
    tableHeaderCell.innerText = daysOfWeek[i % 7];
    tableHeaderRow.appendChild(tableHeaderCell);
  }

  tableHead.appendChild(tableHeaderRow);
  mainTable.appendChild(tableHead);
}

/* Table Body Init*/
function tableBodyInit(year: number) {
  const tableBody = document.createElement('tbody') as HTMLTableSectionElement;

  // Loop row for 12 months
  for (let i: number = 0; i < monthsThai.length; i++) {
    const startingDay: number = new Date(year, i, 1).getDay();
    const numberOfDateInEachMonth: number = new Date(year, i + 1, 0).getDate();

    // Month Title
    const tableBodyRow = document.createElement('tr') as HTMLTableRowElement;
    const monthTitleCell = document.createElement('td') as HTMLTableCellElement;
    monthTitleCell.innerText = monthsThai[i];
    tableBodyRow.appendChild(monthTitleCell);

    // Month Pre-dummy
    for (let k: number = 0; k < startingDay; k++) {
      const monthDummyCell = document.createElement('td') as HTMLTableCellElement;
      monthDummyCell.style.backgroundColor = bgDummy;
      tableBodyRow.appendChild(monthDummyCell);
    }

    // Month Day
    for (let k: number = 1; k <= numberOfDateInEachMonth; k++) {
      const monthDayCell = document.createElement('td') as HTMLTableCellElement;
      monthDayCell.innerText = k.toString();
      tableBodyRow.appendChild(monthDayCell);
    }

    // Month Post-dummy
    for (let k = 1; k < totalDays - numberOfDateInEachMonth - startingDay + 1; k++) {
      const monthDayCell = document.createElement('td') as HTMLTableCellElement;
      monthDayCell.style.backgroundColor = bgDummy;
      tableBodyRow.appendChild(monthDayCell);
    }

    tableBody.appendChild(tableBodyRow);
    mainTable.appendChild(tableBody);
  }
}

/* Table Styling */
function tableStyleWeekend() {
  const weekendRow = Array.prototype.slice.call(document.querySelectorAll('tbody tr')!, 0);
  for (let i: number = 0; i < weekendRow.length; i++) {
    const allCell = Array.prototype.slice.call(weekendRow[i].querySelectorAll('td')!, 0);

    for (let k: number = 0; k < allCell.length; k++) {
      if (k == 7 || k == 8 || k == 14 || k == 15 || k == 21 || k == 22 || k == 28 || k == 29) {
        allCell[k].style.backgroundColor = bgWeekend;
      } else if ((k == 1 && allCell[k].innerText !== '') || (k == 35 && allCell[k].innerText !== '') || (k == 36 && allCell[k].innerText !== '')) {
        allCell[k].style.backgroundColor = bgWeekend;
      }
    }
  }
}

/* Today */
function todayBlink(date: number, month: number, year: number) {
  const monthRow = Array.prototype.slice.call(document.querySelectorAll('tbody tr')!, 0);

  for (let i: number = 0; i < monthRow.length; i++) {
    const noOfPreCell: number = new Date(year, i, 1).getDay();

    if (i === month) {
      const selectedCell = monthRow[i].querySelectorAll('td')[noOfPreCell + date] as HTMLTableCellElement;
      selectedCell.classList.add('blink182');
      selectedCell.removeAttribute('style');
    }
  }
}

heading(currentYear);
tableHeaderInit();
tableBodyInit(currentYear);
tableStyleWeekend();
todayBlink(currentDate, currentMonth, currentYear);
