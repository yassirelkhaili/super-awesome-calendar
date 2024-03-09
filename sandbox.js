/**
 * @author Yassir Elkhaili
 * @license MIT
*/

document.addEventListener("DOMContentLoaded", () => {
    // toggle calendar onclick
    const calendar = document.getElementById("calendar");
    const toggleButton = document.querySelector(".toggle-calendar");
    toggleButton && toggleButton.addEventListener("click", () => calendar && calendar.classList.toggle("hidden"));
    
    //render calendar
    const calendarCellContainer = document.querySelector('.calendar__body__cells');


    //generate calendar cell
    const generateCalendarCell = (content) => {
        const cell = document.createElement("span");
        cell.classList.add('calendar__body__cell', 'calendar--hover');
        cell.textContent = content;
        return cell;
    }

    //clear calendar cells
    const clearCalendarCells = () => {
        while (calendarCellContainer.children) calendarCellContainer.removeChild(calendarCellContainer.firstChild);
    }
})