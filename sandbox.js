/**
 * @author Yassir Elkhaili
 * @license MIT
*/

let currentMonth = new Date().getMonth(); //get current month (from date object) (indexed from 0)
let currentYear = new Date().getFullYear(); //get current year (from date object)

document.addEventListener("DOMContentLoaded", () => {
    // toggle calendar onclick
    const calendar = document.getElementById("calendar");
    const toggleButton = document.querySelector(".toggle-calendar");

    toggleButton && toggleButton.addEventListener("click", () => calendar && calendar.classList.remove("hidden"));

    //close calendar on outsideclick
    const handleCalendarOutsideClick = (event) => {
        const target = event.target;
        if (!calendar.contains(target) && !toggleButton.contains(target)) calendar && calendar.classList.add("hidden");
    }

    document.addEventListener("click", handleCalendarOutsideClick);
    //clear calendar cells
    const calendarCellContainer = document.querySelector('.calendar__body__cells');

    const clearCalendarCells = () => {
        while (calendarCellContainer.firstChild) calendarCellContainer.removeChild(calendarCellContainer.firstChild);
    }

    //generate calendar cell
    const generateCalendarCell = (content, currentMonth = true) => {
        const cell = document.createElement("span");
        cell.classList.add('calendar__body__cell', 'calendar--hover');
        currentMonth ? cell.classList.add('calendar__body__cell--white') : cell.classList.add('calendar__body__cell--grey');
        cell.textContent = content;
        calendarCellContainer.appendChild(cell);
    }

    //update date display
    const updateDateDisplay = (year, month) => {
        const display = document.getElementById('calendarDisplay');
        const displayMonth = new Date(year, month).toLocaleString('default', { month: 'long' });
        display.textContent = `${displayMonth} ${year}`;
    }
    
    //render calendar
    const renderCalendarCells = (selectedYear, selectedMonth) => {
        clearCalendarCells(); //reset calendar content
        const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1).getDay(); //0 for sunday (╯°□°）╯︵ ┻━┻ 
        const numOfDaysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
        const numOfDaysInPrevMonth = new Date(selectedYear, selectedMonth, 0).getDate();
        //update display
        updateDateDisplay(selectedYear, selectedMonth);
        //generate cells of previous month days
        for (let i = firstDayOfMonth - 1; i >= 0; i--) generateCalendarCell(numOfDaysInPrevMonth - i, false);
        //generate cells of current month days
        for (let i = 1; i <= numOfDaysInMonth; i++) generateCalendarCell(i);
        const totalDaysShown = firstDayOfMonth + numOfDaysInMonth;
        let nextMonthDays = 42 - totalDaysShown; //42 being the total cell number in the calendar
        //generate the remaining cells (next month)
        for (let i = 1; i <= nextMonthDays; i++) generateCalendarCell(i, false);
    }

    renderCalendarCells(currentYear, currentMonth); //render initial calendar values

    //add event listeners
    const nextButton = document.getElementById('nextButton');
    const prevButton = document.getElementById('prevButton');

    nextButton && nextButton.addEventListener('click', () => { //handle next button click
        //add one month
        if (currentMonth === 11) {
            currentMonth = 0;
            currentYear += 1;
        } else {
            currentMonth += 1;
        }
        renderCalendarCells(currentYear, currentMonth);
    })

    prevButton && prevButton.addEventListener('click', () => {  //handle prev button click
        //substract one month
        if (currentMonth === 0) {
            currentMonth = 11;
            currentYear -= 1;
        } else {
            currentMonth -= 1;
        }
        renderCalendarCells(currentYear, currentMonth);
    })
})