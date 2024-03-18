/**
 * @author Yassir Elkhaili
 * @license MIT
 */

import datepicker from "./datepicker.js";
import "./calendar.js";

alert("Click on an event to delete and/or modify it. Auf ein Event klicken um es zu löschen und/oder zu bearbeiten.")
//too many required params. ideally this should only require the inputId.
//note: best solution is to dynamically generate/remove datePicker when input is clicked/unclicked, this will take some time but would make for an awesome datepicker open source npm package, maybe I'll do that some other time.
datepicker(
  "datepicker",
  "datepicker__input",
  "toggle-calendar",
  "calendar__body__cells",
  "calendarDisplay",
  "nextButtonFrom",
  "prevButtonFrom"
);
datepicker(
  "datepickerto",
  "datepickerto__input",
  "toggle-calendarto",
  "calendar__body__cellsto",
  "calendarDisplayto",
  "nextButtonTo",
  "prevButtonTo"
);
datepicker(
  "datepickerwhole",
  "datepicker__inputwhole",
  "toggle-calendarwhole",
  "calendar__body__cellswhole",
  "calendarDisplaywhole",
  "nextButtonFromwhole",
  "prevButtonFromwhole"
);
datepicker(
  "datepickerspecific",
  "datepicker__inputspecific",
  "toggle-calendarspecific",
  "calendar__body__cellsspecific",
  "calendarDisplayspecific",
  "nextButtonFromspecific",
  "prevButtonFromspecific"
);
datepicker(
  "datepickeredit",
  "datepicker__inputedit",
  "toggle-calendaredit",
  "calendar__body__cellsedit",
  "calendarDisplayedit",
  "nextButtonFromedit",
  "prevButtonFromedit"
);
datepicker(
  "datepickertoedit",
  "datepickerto__inputedit",
  "toggle-calendartoedit",
  "calendar__body__cellstoedit",
  "calendarDisplaytoedit",
  "nextButtonToedit",
  "prevButtonToedit"
);
datepicker(
  "datepickerwholeedit",
  "datepicker__inputwholeedit",
  "toggle-calendarwholeedit",
  "calendar__body__cellswholeedit",
  "calendarDisplaywholeedit",
  "nextButtonFromwholeedit",
  "prevButtonFromwholeedit"
);
datepicker(
  "datepickerspecificedit",
  "datepicker__inputspecificedit",
  "toggle-calendarspecificedit",
  "calendar__body__cellsspecificedit",
  "calendarDisplayspecificedit",
  "nextButtonFromspecificedit",
  "prevButtonFromspecificedit"
);

//toggle add event modal
const addEventModal = document.querySelector(".first-section");
const closeEventModalButton = document.querySelector(
  ".first-section__close__btn"
);
const addEventButton = document.getElementById("formToggleButton");

const toggleAddEventModal = () => {
  toggleScrollbar();
  toggleBackdrop();
  addEventModal.classList.toggle("hidden");
  addEventModal.classList.toggle("fadeIn");
  addEventModal.classList.toggle("flex");
};

addEventButton && addEventButton.addEventListener("click", toggleAddEventModal);
closeEventModalButton &&
  closeEventModalButton.addEventListener("click", toggleAddEventModal);

//toggle add category modal
const addCategoryModal = document.getElementById("first-section-category");
const closeCategoryModalButton = document.getElementById(
  "first-section__close__btn__category"
);
const addCategoryButton = document.getElementById("formToggleButton-category");

const toggleBackdrop = () => {
  const backdrop = document.getElementById("modalBackDrop");
  backdrop.classList.toggle("hidden");
  backdrop.classList.toggle("flex");
};

const toggleScrollbar = () => {
  document.body.style.overflow =
    document.body.style.overflow === "hidden" ? "visible" : "hidden";
};

const toggleAddCategoryModal = () => {
  toggleScrollbar();
  toggleBackdrop();
  addCategoryModal.classList.toggle("hidden");
  addCategoryModal.classList.toggle("fadeIn");
  addCategoryModal.classList.toggle("flex");
};

addCategoryButton &&
  addCategoryButton.addEventListener("click", toggleAddCategoryModal);
closeCategoryModalButton &&
  closeCategoryModalButton.addEventListener("click", toggleAddCategoryModal);

//handle category addition
const categoryForm = document.getElementById("AddCategoryModal");
categoryForm &&
  categoryForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formDataObj = {};
    for (const [key, value] of formData.entries()) {
      formDataObj[key] = value;
    }
    isLoading();
    //endpoint should be stored in .env
    fetch("http://localhost/backend/api/categories.php", {
      method: "POST",
      body: JSON.stringify(formDataObj),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        toggleAddCategoryModal();
        alert(data.message);
      })
      .catch((error) => {
        console.error("Error:", error);
        toggleAddCategoryModal();
        alert(data.message);
      })
      .finally(() => {
        isLoading();
      });
  });

//toggle spinner
const isLoading = () => {
  const loader = document.querySelector(".loader");
  const submitButton = loader.closest("button");
  loader.classList.toggle("hidden");
  submitButton.disabled = true;
};

const populateCategoryDropdown = () => {
  const generateCategoryOption = (category) => {
    const formSelect = document.getElementById("categories");
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

//close modals on outside click
const backdrop = document.getElementById("modalBackDrop");

const closeModals = () => {
  const modals = [addEventModal, addCategoryModal];
  for (let index = 0; index < modals.length; index++) {
    if (modals[index].classList.contains("flex")) {
      toggleScrollbar();
      toggleBackdrop();
      modals[index].classList.toggle("hidden");
      modals[index].classList.toggle("fadeIn");
      modals[index].classList.toggle("flex");
      break;
    }
  }
};

backdrop.addEventListener("click", closeModals);

//handle event addition
const eventForm = document.getElementById("AddEventModalForm");
eventForm &&
  eventForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formDataObj = {};
    for (const [key, value] of formData.entries()) {
      formDataObj[key] = value;
    }
    isLoading();
    //endpoint should be stored in .env
    fetch("http://localhost/backend/api/events.php", {
      method: "POST",
      body: JSON.stringify(formDataObj),
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        toggleAddEventModal();
        alert(data.message);
        if (data.success) window.location.reload(); //too lazy to do live calendar updates
      })
      .catch((error) => {
        console.error("Error:", error);
        toggleAddEventModal();
        alert(data.message);
      })
      .finally(() => {
        isLoading();
      });
  });

//generate day times 30 min intervals
document.addEventListener("DOMContentLoaded", function () {
  var select = document.getElementById("time-select");

  for (var hour = 0; hour < 24; hour++) {
    for (var minute = 0; minute < 60; minute += 30) {
      var hourFormatted = hour.toString().padStart(2, "0");
      var minuteFormatted = minute.toString().padStart(2, "0");
      var timeValue = hourFormatted + ":" + minuteFormatted;
      var option = new Option(timeValue, timeValue);
      select.appendChild(option);
    }
  }
});

//handle date input show/hide depending on event type
const selectdropdown = document.getElementById('event-types');
const dateInputs = document.querySelectorAll('.date-input');

//helper function to disable or enable all input-like elements inside an input group
const changeInputStatus = (inputGroup, disabled) => {
  const inputElements = inputGroup.querySelectorAll('input, select');
  inputElements.forEach(inputElement => inputElement.disabled = disabled);
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

selectdropdown.addEventListener('change', handleSelectChange);