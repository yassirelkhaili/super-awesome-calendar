/**
 * @author Yassir Elkhaili
 * @license MIT
 */

// calendar code
let currentMonth = new Date().getMonth(); //get current month (from date object) (indexed from 0)
let currentYear = new Date().getFullYear(); //get current year (from date object)
let currentDay = new Date().getDate();
let dateFormat = "ISO"; //supported date formats ISO,US
let currentView = "month";
const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

document.addEventListener("DOMContentLoaded", () => {
  // toggle calendar onclick
  const calendarCellContainer = document.getElementById("month");
  const calendarDaysCellContainer = document.getElementById("day");
  const calendarWeeksCellContainer = document.getElementById("week");
  const display = document.getElementById("monthDisplay");

  //clear calendar cells
  const clearCalendarCells = () => {
    while (calendarCellContainer.firstChild)
      calendarCellContainer.removeChild(calendarCellContainer.firstChild);
    while (calendarDaysCellContainer.firstChild)
      calendarDaysCellContainer.removeChild(
        calendarDaysCellContainer.firstChild
      );
    while (calendarWeeksCellContainer.firstChild)
      calendarWeeksCellContainer.removeChild(
        calendarWeeksCellContainer.firstChild
      );
  };

  //handle cell click
  const handleCellClick = (selectedDay, highlight = false) => {
    let fullDate = "";
    const month = (currentMonth + 1).toString().padStart(2, "0");
    const paddedDay = selectedDay.toString().padStart(2, "0");
    switch (dateFormat) {
      case "ISO":
        fullDate = `${currentYear}-${month}-${paddedDay}`;
        break;
      case "US":
        fullDate = `${month}/${paddedDay}/${currentYear}`;
        break;
      default:
        const monthName = new Date(currentYear, currentMonth).toLocaleString(
          "default",
          { month: "long" }
        );
        fullDate = `${paddedDay}-${monthName}-${currentYear}`;
        break;
    }
    //focus selected cell
    if (highlight) {
      const cells = document.querySelectorAll(".calendar__body__cell--white");
      cells.forEach(
        (randCell) =>
          parseInt(randCell.textContent) === selectedDay && randCell.focus()
      );
    }
    currentDay = selectedDay;
  };

  const todayButton = document.getElementById("formToggleButton-today");

  const returnToToday = () => {
    const date = new Date();
    //switch to current view
    switchView("month");
    //reset date values
    currentDay = date.getDate();
    currentYear = date.getFullYear();
    currentMonth = date.getMonth();
    //render new cells using current date info from date object
    renderCalendarCells(currentYear, currentMonth);
  };

  todayButton.addEventListener("click", returnToToday);

  function formatDate(year, month, day) {
    const formattedMonth = month.toString().padStart(2, "0");
    const formattedDay = day.toString().padStart(2, "0");
    return `${year}-${formattedMonth}-${formattedDay}`;
  }

  //generate calendar cell
  const generateCalendarCell = (selectedDay, month = "current") => {
    const cell = document.createElement("div");
    cell.classList.add("calendar__body__cell--calendar", "calendar--hover");
    month === "current"
      ? cell.classList.add("calendar__body__cell--white")
      : cell.classList.add("calendar__body__cell--grey");
    cell.setAttribute("tabindex", "0");
    cell.textContent = selectedDay;
    let dateYear = currentYear;
    let dateMonth = currentMonth + 1;
    if (month === "prev") {
      dateMonth -= 1;
      if (dateMonth < 1) {
        dateMonth = 12;
        dateYear -= 1;
      }
    } else if (month === "next") {
      dateMonth += 1;
      if (dateMonth > 12) {
        dateMonth = 1;
        dateYear += 1;
      }
    }
    cell.setAttribute(
      "data-date",
      formatDate(dateYear, dateMonth, selectedDay)
    );
    cell.addEventListener("click", () => {
      if (month === "prev") {
        handlePrevButtonClick();
      } else if (month === "next") {
        handleNextButtonClick();
      }
      handleCellClick(selectedDay, true);
    });
    calendarCellContainer.appendChild(cell);
  };

  //update date display
  const updateDateDisplay = (year, month, day = null) => {
    const displayMonth = new Date(year, month).toLocaleString("default", {
      month: "long",
    });
    display.textContent =
      day === null
        ? `${displayMonth} ${year}`
        : `${displayMonth} ${day}, ${year}`;
  };

  //handle view switch
  const calenderHeader = document.getElementById("header_container");
  const clearHeader = () => {
    while (calenderHeader.firstChild)
      calenderHeader.removeChild(calenderHeader.firstChild);
  };

  const generateDaysOfMonth = () => {
    daysOfWeek.forEach((day) => {
      const dayContainer = document.createElement("div");
      dayContainer.textContent = day;
      calenderHeader.appendChild(dayContainer);
    });
  };

  const generateCurrentDay = () => {
    const date = new Date(currentYear, currentMonth, currentDay);
    const dayName = daysOfWeek[date.getDay()];
    const container = document.createElement("div");
    container.textContent = dayName;
    calenderHeader.appendChild(container);
    calenderHeader.style.justifyContent = "center";
  };

  const generateDaysViewCalendarCells = () => {
    clearCalendarCells(); //clear calendar cells
    generateCurrentDay();
    updateDateDisplay(currentYear, currentMonth, currentDay);
    //generate day time periods 30 min intervals
    for (let i = 0; i < 48; i++) {
      const hour = Math.floor(i / 2);
      const minute = i % 2 === 0 ? "00" : "30";
      const timeSlotDiv = document.createElement("div");
      timeSlotDiv.classList.add(
        "calendar__body__cell--calendar--day",
        "calendar--hover"
      );
      timeSlotDiv.textContent = `${hour.toString().padStart(2, "0")}:${minute}`;
      calendarDaysCellContainer.appendChild(timeSlotDiv);
    }
  };

  const generateWeekDays = () => {
    const date = new Date(currentYear, currentMonth, currentDay);
    const dayOfWeek = date.getDay();
    const startDate = new Date(date);
    startDate.setDate(date.getDate() - dayOfWeek);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
    const startDay = startDate.getDate();
    const endDay = endDate.getDate();
    const month = startDate.getMonth() + 1;
    const endMonth = endDate.getMonth() + 1;
    let rangeText;
    if (month === endMonth) {
      rangeText = `${startDay} – ${endDay}`;
    } else {
      rangeText = `${month}/${startDay} – ${endMonth}/${endDay}`;
    }
    const container = document.createElement("div");
    container.textContent = rangeText;
    calenderHeader.appendChild(container);
    calenderHeader.style.justifyContent = "center";
  };

  const generateWeeksViewCalendarCells = () => {
    clearCalendarCells();
    generateWeekDays();
    updateDateDisplay(currentYear, currentMonth);
    const date = new Date(currentYear, currentMonth, currentDay);
    const dayOfWeek = date.getDay();
    const startDate = new Date(date);
    startDate.setDate(date.getDate() - dayOfWeek);
    for (let i = 0; i < 7; i++) {
      const weekDayDate = new Date(startDate);
      weekDayDate.setDate(startDate.getDate() + i);

      const container = document.createElement("div");
      const dayName = daysOfWeek[weekDayDate.getDay()].slice(0, 3);
      const month = weekDayDate.getMonth() + 1;
      const day = weekDayDate.getDate();
      container.classList.add(
        "calendar__body__cell--calendar--day",
        "calendar--hover"
      );
      container.textContent = `${dayName} ${month}/${day}`;
      calendarWeeksCellContainer.appendChild(container);
    }
    calendarWeeksCellContainer.style.justifyContent = "center";
  };

  //generate header container content
  const switchView = (event, view = null) => {
    if (view === null && event !== null && event.target) {
      const targetView = event.target.textContent.toLowerCase();
      currentView = targetView;
    } else if (view !== null) {
      currentView = view;
    } else {
      currentView = "month";
    }
    clearHeader();
    //generate header content
    switch (currentView) {
      case "month":
        generateDaysOfMonth();
        renderCalendarCells(currentYear, currentMonth);
        placeEventsInsideCalendar();
        break;
      case "week":
        generateWeeksViewCalendarCells();
        break;
      case "day":
        generateDaysViewCalendarCells();
        break;
      default:
        generateDaysOfMonth();
        renderCalendarCells(currentYear, currentMonth);
        break;
    }
  };

  // Add event listeners to switch view buttons
  const viewButtons = document.querySelectorAll(".viewButton");
  viewButtons.forEach((viewButton) => {
    viewButton.addEventListener("click", switchView);
  });

  //create event div
  const handleEventClick = () => {};

  const createEventDiv = (event) => {
    const eventDiv = document.createElement("div");
    eventDiv.classList.add("event");
    eventDiv.textContent = event.name;
    eventDiv.addEventListener("click", handleEventClick);
    return eventDiv;
  };

  const placeEventsInsideCalendar = () => {
    const events = JSON.parse(localStorage.getItem("events") || '[]'); // Ensure default is a string that represents an empty array
    events.forEach((event) => {
        // Extract just the date part in YYYY-MM-DD format
        const eventDateFrom = event.date_from.split(' ')[0]; // Assumes date_from is in 'YYYY-MM-DD HH:MM:SS' format

        const eventContainers = document.querySelectorAll(".calendar__body__cell--calendar");
        eventContainers.forEach((container) => {
            // Use the data-date attribute to compare dates directly
            if (container.getAttribute('data-date') === eventDateFrom) {
                container.appendChild(createEventDiv(event));
            }
        });
    });
};


  //handle event placement inside the calendar
  const fetchEvents = () => {
    fetch("http://localhost/backend/api/events.php")
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("events", JSON.stringify(data));
        placeEventsInsideCalendar();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  fetchEvents();

  //render calendar
  const renderCalendarCells = (selectedYear, selectedMonth) => {
    clearCalendarCells(); //reset calendar content
    calenderHeader.style.justifyContent = "space-between";
    const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1).getDay(); //0 for sunday (╯°□°）╯︵ ┻━┻
    const numOfDaysInMonth = new Date(
      selectedYear,
      selectedMonth + 1,
      0
    ).getDate();
    const numOfDaysInPrevMonth = new Date(
      selectedYear,
      selectedMonth,
      0
    ).getDate();
    //update display
    updateDateDisplay(selectedYear, selectedMonth);
    //generate cells of previous month days
    for (let i = firstDayOfMonth - 1; i >= 0; i--)
      generateCalendarCell(numOfDaysInPrevMonth - i, "prev");
    //generate cells of current month days
    for (let i = 1; i <= numOfDaysInMonth; i++) generateCalendarCell(i);
    const totalDaysShown = firstDayOfMonth + numOfDaysInMonth;
    let nextMonthDays = 42 - totalDaysShown; //42 being the total cell number in the calendar
    //generate the remaining cells (next month)
    for (let i = 1; i <= nextMonthDays; i++) generateCalendarCell(i, "next");
    handleCellClick(currentDay, true); //highlight current date
  };

  //add event listeners
  const nextButton = document.getElementById("nextButton");
  const prevButton = document.getElementById("backButton");

  const handleNextButtonClick = () => {
    switch (currentView) {
      case "month":
        //add one month
        if (currentMonth === 11) {
          currentMonth = 0;
          currentYear += 1;
        } else {
          currentMonth += 1;
        }
        renderCalendarCells(currentYear, currentMonth);
        placeEventsInsideCalendar();
        break;
      case "week":
        clearHeader();
        //add one week
        const nextWeek = new Date(currentYear, currentMonth, currentDay + 7);
        currentYear = nextWeek.getFullYear();
        currentMonth = nextWeek.getMonth();
        currentDay = nextWeek.getDate();
        generateWeeksViewCalendarCells();
        break;
      case "day":
        clearHeader();
        //add one day
        const nextDay = new Date(currentYear, currentMonth, currentDay + 1);
        currentYear = nextDay.getFullYear();
        currentMonth = nextDay.getMonth();
        currentDay = nextDay.getDate();
        generateDaysViewCalendarCells();
        break;
      default:
        if (currentMonth === 11) {
          currentMonth = 0;
          currentYear += 1;
        } else {
          currentMonth += 1;
        }
        renderCalendarCells(currentYear, currentMonth);
        placeEventsInsideCalendar();
        break;
    }
  };

  const handlePrevButtonClick = () => {
    switch (currentView) {
      case "month":
        //substract one month
        if (currentMonth === 0) {
          currentMonth = 11;
          currentYear -= 1;
        } else {
          currentMonth -= 1;
        }
        renderCalendarCells(currentYear, currentMonth);
        placeEventsInsideCalendar();
        break;
      case "week":
        //remove one week
        clearHeader();
        const nextWeek = new Date(currentYear, currentMonth, currentDay - 7);
        currentYear = nextWeek.getFullYear();
        currentMonth = nextWeek.getMonth();
        currentDay = nextWeek.getDate();
        generateWeeksViewCalendarCells();
        break;
      case "day":
        clearHeader();
        //remove one day
        const nextDay = new Date(currentYear, currentMonth, currentDay - 1);
        currentYear = nextDay.getFullYear();
        currentMonth = nextDay.getMonth();
        currentDay = nextDay.getDate();
        generateDaysViewCalendarCells();
        break;
      default:
        //substract one month
        if (currentMonth === 0) {
          currentMonth = 11;
          currentYear -= 1;
        } else {
          currentMonth -= 1;
        }
        renderCalendarCells(currentYear, currentMonth);
        placeEventsInsideCalendar();
        break;
    }
  };

  nextButton && nextButton.addEventListener("click", handleNextButtonClick);
  prevButton && prevButton.addEventListener("click", handlePrevButtonClick);

  renderCalendarCells(currentYear, currentMonth); //render initial calendar values
});