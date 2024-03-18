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
    placeEventsInsideCalendar();
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
    clearCalendarCells();
    generateCurrentDay();
    updateDateDisplay(currentYear, currentMonth, currentDay);
    for (let i = 0; i < 48; i++) {
      const hour = Math.floor(i / 2);
      const minute = i % 2 === 0 ? "00" : "30";
      const timeSlotDiv = document.createElement("div");
      timeSlotDiv.classList.add(
        "calendar__body__cell--calendar--day",
        "calendar--hover"
      );
      timeSlotDiv.textContent = `${hour.toString().padStart(2, "0")}:${minute}`;
      const dateTime = formatDayDate(
        currentYear,
        currentMonth + 1,
        currentDay,
        hour,
        minute
      );
      timeSlotDiv.setAttribute("data-date", dateTime);
      calendarDaysCellContainer.appendChild(timeSlotDiv);
    }
  };

  function formatDayDate(year, month, day, hour = "00", minute = "00") {
    const formattedMonth = month.toString().padStart(2, "0");
    const formattedDay = day.toString().padStart(2, "0");
    const formattedHour = hour.toString().padStart(2, "0");
    const formattedMinute = minute.toString().padStart(2, "0");
    return `${year}-${formattedMonth}-${formattedDay} ${formattedHour}:${formattedMinute}:00`;
  }

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
      const weekDayDate = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate() + i
      );

      const container = document.createElement("div");
      const dayName = daysOfWeek[weekDayDate.getDay()].slice(0, 3);
      const month = weekDayDate.getMonth() + 1;
      const day = weekDayDate.getDate();
      const year = weekDayDate.getFullYear();
      container.classList.add(
        "calendar__body__cell--calendar--day",
        "calendar--hover"
      );
      container.textContent = `${dayName} ${month}/${day}`;
      container.setAttribute("data-date", formatDate(year, month, day));

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
        placeEventsInsideCalendar("week");
        break;
      case "day":
        generateDaysViewCalendarCells();
        placeEventsInsideCalendar("day");
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

  //toggle Manage Event Modal
  const manageEventModal = document.getElementById("first-section-choice");
  const closeEventModal = document.getElementById(
    "first-section__close__btn__choice"
  );
  const deleteEventButton = document.getElementById("deleteEventButton");
  const editForm = document.querySelector(".first-section-edit");
  const editFormCloseButton = document.getElementById(
    "first-section__close__btn__edit"
  );

  const toggleBackdrop = () => {
    const backdrop = document.getElementById("modalBackDrop");
    backdrop.classList.toggle("hidden");
    backdrop.classList.toggle("flex");
  };

  const toggleScrollbar = () => {
    document.body.style.overflow =
      document.body.style.overflow === "hidden" ? "visible" : "hidden";
  };

  const toggleManageEventModal = () => {
    toggleScrollbar();
    toggleBackdrop();
    manageEventModal.classList.toggle("hidden");
    manageEventModal.classList.toggle("fadeIn");
    manageEventModal.classList.toggle("flex");
  };

  closeEventModal.addEventListener("click", () => {
    toggleManageEventModal();
  });

  //close modals on outside click
  const backdrop = document.getElementById("modalBackDrop");

  backdrop.addEventListener("click", () => {
    !manageEventModal.classList.contains("hidden") && toggleManageEventModal();
    !editForm.classList.contains("hidden") && toggleEditForm();
  });

  const handleEventDelete = (eventId) => {
    fetch(`http://localhost/backend/api/events.php?id=${eventId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => {
        console.log("Delete successful:", data);
        if (data.success) window.location.reload(); //again too lazy for live calendar update feature
      })
      .catch((error) => {
        console.error("Error deleting event:", error);
      });
  };

  const toggleEditForm = () => {
    toggleScrollbar();
    toggleBackdrop();
    editForm.classList.toggle("hidden");
    editForm.classList.toggle("fadeIn");
    editForm.classList.toggle("flex");
  };

  editFormCloseButton.addEventListener("click", toggleEditForm);
  //handle date input show/hide depending on event type
  const selectdropdown = document.getElementById("event-types-edit");
  const dateInputs = document.querySelectorAll(".date-input-edit");

  //helper function to disable or enable all input-like elements inside an input group
  const changeInputStatus = (inputGroup, disabled) => {
    const inputElements = inputGroup.querySelectorAll("input, select");
    inputElements.forEach((inputElement) => (inputElement.disabled = disabled));
  };

  //initially hide and disable date inputs
  dateInputs.forEach((input) => {
    input.style.display = "none";
    changeInputStatus(input, true); //initially disable inputs
  });

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    dateInputs.forEach((dateInput) => {
      if (dateInput.id === selectedValue) {
        dateInput.style.display = "flex";
        changeInputStatus(dateInput, false); //enable inputs for the selected group
      } else {
        dateInput.style.display = "none";
        changeInputStatus(dateInput, true); //disable inputs for non-selected groups
      }
    });
  };

  const populateCategoryDropdown = () => {
    const generateCategoryOption = (category) => {
      const formSelect = document.getElementById("categories-edit");
      const option = document.createElement("option");
      option.value = category.id;
      option.textContent = category.name;
      formSelect.appendChild(option);
    };
    fetch("http://localhost/backend/api/categories.php")
      .then((response) => response.json())
      .then((data) =>
        data.forEach((category) => generateCategoryOption(category))
      )
      .catch((error) => console.error("Error:", error));
  };

  populateCategoryDropdown();

  // Function to generate time options
  const generateTimeOptions = () => {
    const select = document.getElementById("time-select-edit");
    select.innerHTML = ""; // Clear existing options
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const hourFormatted = hour.toString().padStart(2, "0");
        const minuteFormatted = minute.toString().padStart(2, "0");
        const timeValue = `${hourFormatted}:${minuteFormatted}`;
        const option = new Option(timeValue, timeValue);
        select.appendChild(option);
      }
    }
  };
  selectdropdown.addEventListener("change", handleSelectChange);
  const populateEditEventModal = (event) => {
    document.querySelector('#EditEventModalForm input[name="name"]').value =
      event.name;
    const eventTypeSelect = document.querySelector("#event-types-edit");
    eventTypeSelect.value = event.event_type;
    document.querySelector("#categories-edit").value = event.category_id || "";
    const dateInputs = document.querySelectorAll(".date-input-edit");
    dateInputs.forEach((input) => {
      input.style.display = "none";
      changeInputStatus(input, true);
    });
    const selectedDateInput = document.querySelector(
      `.date-input-edit#${event.event_type}`
    );
    if (selectedDateInput) {
      selectedDateInput.style.display = "flex";
      changeInputStatus(selectedDateInput, false);
      if (event.event_type === "specific") {
        //generate day times 30 min intervals
        generateTimeOptions();
        const [date, time] = event.date_from.split(" ");
        document.getElementById("datepicker__inputspecificedit").value = date;
        document.querySelector("#time-select-edit").value = time.substring(
          0,
          5
        );
      } else if (event.event_type === "whole") {
        document.getElementById("datepicker__inputwholeedit").value =
          event.date_from.split(" ")[0];
      } else if (event.event_type === "multiple") {
        document.getElementById("datepicker__inputedit").value =
          event.date_from.split(" ")[0];
        if (event.date_to) {
          document.getElementById("datepickerto__inputedit").value =
            event.date_to.split(" ")[0];
        }
      }
    }
  };

  //toggle spinner
  const isLoading = () => {
    const loader = document.querySelector(".loader");
    const submitButton = loader.closest("button");
    loader.classList.toggle("hidden");
    submitButton.disabled = true;
  };

  const editEventForm = document.getElementById("EditEventModalForm");

  const handleEditEvent = (eventId) => {
    editEventForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const formDataObj = { id: eventId };
      for (const [key, value] of formData.entries()) {
        formDataObj[key] = value;
      }
      // isLoading();
      fetch(`http://localhost/backend/api/events.php?id=${eventId}`, {
        method: "PUT",
        body: JSON.stringify(formDataObj),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) throw new Error("Network response was not ok");
          return response.json();
        })
        .then((data) => {
          console.log("Success:", data);
          toggleEditForm();
          alert(data.message);
          if(data.success) window.location.reload();
        })
        .catch((error) => {
          console.error("Error:", error);
          toggleEditForm();
          alert("An error occurred, please try again later.");
        })
        .finally(() => {
          isLoading();
        });
    });
  };

  const handleEventEdit = (eventId) => {
    toggleManageEventModal();
    toggleEditForm();
    const events = JSON.parse(localStorage.getItem("events") || "[]");
    const foundEvent = events.find((event) => event.id == eventId);
    if (foundEvent) {
      populateEditEventModal(foundEvent);
    } else {
      console.error("Event not found");
    }
    handleEditEvent(eventId);
  };
  let currentDeleteEventHandler = null;
  let currentEditEventHandler = null;
  //create event div
  const handleEventClick = (event) => {
    const target = event.target;
    const eventId = target.getAttribute("data-id");
    if (currentDeleteEventHandler) {
      deleteEventButton.removeEventListener("click", currentDeleteEventHandler);
    }
    if (currentEditEventHandler) {
      editEventButton.removeEventListener("click", currentEditEventHandler);
    }
    currentDeleteEventHandler = () => handleEventDelete(eventId);
    deleteEventButton.addEventListener("click", currentDeleteEventHandler);
    currentEditEventHandler = () => handleEventEdit(eventId);
    editEventButton.addEventListener("click", currentEditEventHandler);
    toggleManageEventModal();
  };

  const createEventDiv = (event) => {
    const eventDiv = document.createElement("div");
    eventDiv.classList.add("event");
    eventDiv.textContent = event.name;
    eventDiv.setAttribute("data-id", event.id);
    eventDiv.addEventListener("click", handleEventClick);
    return eventDiv;
  };

  const placeEventsInsideCalendar = (view = "month") => {
    const events = JSON.parse(localStorage.getItem("events") || "[]");
    const isDateTimeInRange = (
      containerDateTime,
      startDateTime,
      endDateTime,
      eventType
    ) => {
      const dateTime = new Date(containerDateTime);
      const start = new Date(startDateTime);
      let end = new Date(endDateTime || startDateTime);
      if (endDateTime && end.toDateString() !== start.toDateString()) {
        end.setHours(23, 59, 0, 0);
      }
      if (eventType === "whole" && view === "day" && !endDateTime) {
        end = new Date(startDateTime);
        end.setHours(23, 59, 0, 0);
      }
      return dateTime >= start && dateTime <= end;
    };
    events.forEach((event) => {
      const containerClass =
        view === "month"
          ? ".calendar__body__cell--calendar"
          : view === "week" || view === "day"
          ? ".calendar__body__cell--calendar--day"
          : ".calendar__body__cell--calendar--day";
      const eventContainers = document.querySelectorAll(containerClass);
      eventContainers.forEach((container) => {
        const containerDateTime = container.getAttribute("data-date");
        const eventStartDateTime = event.date_from;
        const eventEndDateTime = event.date_to || event.date_from;
        if (event.event_type === "whole" && view === "day") {
          const containerDate = containerDateTime.split(" ")[0];
          const eventDate = eventStartDateTime.split(" ")[0];
          if (containerDate === eventDate) {
            container.appendChild(createEventDiv(event));
          }
        } else {
          const shouldPlaceEvent = isDateTimeInRange(
            containerDateTime,
            eventStartDateTime,
            eventEndDateTime,
            event.event_type
          );
          if (
            shouldPlaceEvent ||
            (event.event_type === "specific" &&
              (view === "week" || view === "month") &&
              containerDateTime.startsWith(eventStartDateTime.split(" ")[0]))
          ) {
            container.appendChild(createEventDiv(event));
          }
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
        placeEventsInsideCalendar("week");
        break;
      case "day":
        clearHeader();
        //add one day
        const nextDay = new Date(currentYear, currentMonth, currentDay + 1);
        currentYear = nextDay.getFullYear();
        currentMonth = nextDay.getMonth();
        currentDay = nextDay.getDate();
        generateDaysViewCalendarCells();
        placeEventsInsideCalendar("day");
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
        placeEventsInsideCalendar("week");
        break;
      case "day":
        clearHeader();
        //remove one day
        const nextDay = new Date(currentYear, currentMonth, currentDay - 1);
        currentYear = nextDay.getFullYear();
        currentMonth = nextDay.getMonth();
        currentDay = nextDay.getDate();
        generateDaysViewCalendarCells();
        placeEventsInsideCalendar("day");
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
