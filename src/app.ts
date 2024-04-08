const dt: Date = new Date();
const currentDate: number = dt.getDate();
const currentMonth: number = dt.getMonth();
const currentYear = dt.getFullYear();
const dayOfWeek: readonly string[] = ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'];
const months: readonly string[] = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];

const totalDays: number = 37;
const weekendBg: string = `oklch(92.8% 0 0)`;

const mainTable = document.querySelector('table')! as HTMLTableElement;

function setYearHeading(year: number) {
  document.querySelector<HTMLHeadingElement>('h1')!.innerText = `Calendar ${year + 543}`;
}

function tableHeaderInit() {
  const tableHeader = document.createElement('thead') as HTMLTableSectionElement;
  const tableHeaderRow = document.createElement('tr') as HTMLTableRowElement;
  const tableHeaderDummy = document.createElement('th') as HTMLTableCellElement;
  tableHeaderDummy.innerText = '#';
  tableHeaderRow.appendChild(tableHeaderDummy);

  for (let i: number = 0; i < totalDays; i++) {
    const tableHeaderCell = document.createElement('th') as HTMLTableCellElement;
    tableHeaderCell.innerText = dayOfWeek[i % 7];
    tableHeaderRow.appendChild(tableHeaderCell);
  }

  tableHeader.appendChild(tableHeaderRow);
  mainTable.appendChild(tableHeader);
}

function tableBodyInit(year: number) {
  const tableBody = document.createElement('tbody') as HTMLTableSectionElement;

  for (let i: number = 0; i < months.length; i++) {
    const startingDay = new Date(year, i, 1).getDay();
    const numberOfDateInEachMonth = new Date(year, i + 1, 0).getDate();

    // Month - Month Title
    const tableBodyRow = document.createElement('tr') as HTMLTableRowElement;
    const monthTitleCell = document.createElement('td') as HTMLTableCellElement;
    monthTitleCell.innerText = months[i];
    tableBodyRow.appendChild(monthTitleCell);

    // Month - Dummy Day
    for (let k: number = 0; k < startingDay; k++) {
      const monthDummyCell = document.createElement('td') as HTMLTableCellElement;
      monthDummyCell.style.backgroundColor = `oklch(32.11% 0 0)`;
      tableBodyRow.appendChild(monthDummyCell);
    }

    // Month - Day
    for (let k: number = 1; k <= numberOfDateInEachMonth; k++) {
      const monthDayCell = document.createElement('td') as HTMLTableCellElement;
      monthDayCell.innerText = k.toString();
      tableBodyRow.appendChild(monthDayCell);
    }

    // Month - Post Dummy
    for (let k: number = 1; k < totalDays - numberOfDateInEachMonth - startingDay + 1; k++) {
      const monthDayCell = document.createElement('td') as HTMLTableCellElement;
      monthDayCell.style.backgroundColor = `oklch(32.11% 0 0)`;
      tableBodyRow.appendChild(monthDayCell);
    }

    tableBody.appendChild(tableBodyRow);
    mainTable.appendChild(tableBody);
  }
}

function tableStyle() {
  const weekendRow: HTMLTableRowElement[] = Array.prototype.slice.call(document.querySelectorAll('tbody tr')!, 0);

  for (let i: number = 0; i < weekendRow.length; i++) {
    const allCell: HTMLTableCellElement[] = Array.prototype.slice.call(weekendRow[i].querySelectorAll('td')!, 0);

    for (let k: number = 0; k < allCell.length; k++) {
      if (k == 7 || k == 8 || k == 14 || k == 15 || k == 21 || k == 22 || k == 28 || k == 29) {
        allCell[k].style.backgroundColor = weekendBg;
      } else if ((k == 1 && allCell[k].innerText !== '') || (k == 35 && allCell[k].innerText !== '') || (k == 36 && allCell[k].innerText !== '')) {
        allCell[k].style.backgroundColor = weekendBg;
      }
    }
  }
}

function todayBlink(date: number, month: number, year: number) {
  const monthRow: HTMLTableRowElement[] = Array.prototype.slice.call(document.querySelectorAll('tbody tr')!, 0);

  for (let i: number = 0; i < monthRow.length; i++) {
    const noOfPreCell: number = new Date(year, i, 1).getDay();

    if (i === month) {
      const selectedCell = monthRow[i].querySelectorAll('td')[noOfPreCell + date]! as HTMLTableCellElement;
      selectedCell.classList.add('blink182');
      selectedCell.removeAttribute('style');
    }
  }
}

setYearHeading(currentYear);
tableHeaderInit();
tableBodyInit(currentYear);
tableStyle();
todayBlink(currentDate, currentMonth, currentYear);
