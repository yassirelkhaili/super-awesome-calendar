// calendar code 
let currentMonth = new Date().getMonth(); //get current month (from date object) (indexed from 0)
let currentYear = new Date().getFullYear(); //get current year (from date object)
let currentDay = new Date().getDate();
let dateFormat = 'ISO'; //supported date formats ISO,US
let currentView = 'month';
const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

document.addEventListener("DOMContentLoaded", () => {
    // toggle calendar onclick
    const calendarCellContainer = document.getElementById("calendar");
    const display = document.getElementById("monthDisplay");

    //clear calendar cells
    const clearCalendarCells = () => {
        while (calendarCellContainer.firstChild) calendarCellContainer.removeChild(calendarCellContainer.firstChild);
    }

    //handle cell click
    const handleCellClick = (selectedDay, highlight = false) => {
        let fullDate = '';
        const month = (currentMonth + 1).toString().padStart(2, '0');
        const paddedDay = selectedDay.toString().padStart(2, '0');
        switch(dateFormat) {
            case 'ISO':
                fullDate = `${currentYear}-${month}-${paddedDay}`
            break;
            case 'US':
                fullDate = `${month}/${paddedDay}/${currentYear}`
            break;
            default:
            const monthName = new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' });
            fullDate = `${paddedDay}-${monthName}-${currentYear}`;
            break;
        }
        //focus selected cell
        if (highlight) {
            const cells = document.querySelectorAll('.calendar__body__cell--white');
            cells.forEach((randCell) => parseInt(randCell.textContent) === selectedDay && randCell.focus());
        }
        currentDay = selectedDay;
    }

    //generate calendar cell
    const generateCalendarCell = (selectedDay, month = "current") => {
        const cell = document.createElement("span");
        cell.classList.add('calendar__body__cell--calendar', 'calendar--hover');
        month === 'current' ? cell.classList.add('calendar__body__cell--white') : cell.classList.add('calendar__body__cell--grey');
        cell.setAttribute("tabindex", '0');
        cell.textContent = selectedDay;
        switch (month) {
            case 'current':
                cell.addEventListener("click", () => handleCellClick(selectedDay));
            break;
            case 'prev':
                cell.addEventListener("click", () => {
                    handlePrevButtonClick();
                    handleCellClick(selectedDay, true);
                });
            break;
            case 'next':
                cell.addEventListener("click", () => {
                    handleNextButtonClick();
                    handleCellClick(selectedDay, true);
                });
            break;
            default:
                cell.addEventListener("click", () => handleCellClick(selectedDay));
            break;
        }
        calendarCellContainer.appendChild(cell);
    }

    //update date display
    const updateDateDisplay = (year, month) => {
        const displayMonth = new Date(year, month).toLocaleString('default', { month: 'long' });
        display.textContent = `${displayMonth} ${year}`;
    }

    //handle view switch
    const calenderHeader = document.getElementById('header_container');
    const clearHeader = () => {
        while (calenderHeader.firstChild) calenderHeader.removeChild(calenderHeader.firstChild);
    }

    const generateDaysOfMonth = () => {
        daysOfWeek.forEach(day => {
            const dayContainer = document.createElement('div');
            dayContainer.textContent = day;
            calenderHeader.appendChild(dayContainer);
        });
    };
    

    const generateCurrentWeekDays = () => {
        
    }

    const generateCurrentDay = () => {
            const date = new Date(currentYear, currentMonth - 1, currentDay);
            console.log(daysOfWeek[date.getDay()]);
          
    }

    //generate header container content
    const switchView = (event) => {
        const targetView = event.target.textContent.toLowerCase();
         currentView = targetView;
             clearHeader();
            //generate header content
            switch(currentView) {
                case "month":
                generateDaysOfMonth();
                renderCalendarCells(currentYear, currentMonth);
                break;
                case "week":
                
                break;
                case "day":
                generateCurrentDay();
                break;
                default:
                generateDaysOfMonth();
                renderCalendarCells(currentYear, currentMonth);
                break;
            }
        }

    // Add event listeners to switch view buttons
    const viewButtons = document.querySelectorAll('.viewButton');
    viewButtons.forEach(viewButton => {
        viewButton.addEventListener('click', switchView);
    });
    //render calendar
    const renderCalendarCells = (selectedYear, selectedMonth) => {
        clearCalendarCells(); //reset calendar content
        const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1).getDay(); //0 for sunday (╯°□°）╯︵ ┻━┻ 
        const numOfDaysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
        const numOfDaysInPrevMonth = new Date(selectedYear, selectedMonth, 0).getDate();
        //update display
        updateDateDisplay(selectedYear, selectedMonth);
        //generate cells of previous month days
        for (let i = firstDayOfMonth - 1; i >= 0; i--) generateCalendarCell(numOfDaysInPrevMonth - i, 'prev');
        //generate cells of current month days
        for (let i = 1; i <= numOfDaysInMonth; i++) generateCalendarCell(i);
        const totalDaysShown = firstDayOfMonth + numOfDaysInMonth;
        let nextMonthDays = 42 - totalDaysShown; //42 being the total cell number in the calendar
        //generate the remaining cells (next month)
        for (let i = 1; i <= nextMonthDays; i++) generateCalendarCell(i, 'next');
        handleCellClick(currentDay, true); //highlight current date
    }

    //add event listeners
    const nextButton = document.getElementById("nextButton");
    const prevButton = document.getElementById("backButton");

    const handleNextButtonClick = () => {
        //add one month
        if (currentMonth === 11) {
            currentMonth = 0;
            currentYear += 1;
        } else {
            currentMonth += 1;
        }
        renderCalendarCells(currentYear, currentMonth);
    }

    const handlePrevButtonClick = () => {
        //substract one month
        if (currentMonth === 0) {
            currentMonth = 11;
            currentYear -= 1;
        } else {
            currentMonth -= 1;
        }
        renderCalendarCells(currentYear, currentMonth);
    }

    nextButton && nextButton.addEventListener('click', handleNextButtonClick);
    prevButton && prevButton.addEventListener('click', handlePrevButtonClick);

    renderCalendarCells(currentYear, currentMonth); //render initial calendar values);
})