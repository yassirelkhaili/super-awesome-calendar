/**
 * @author Yassir Elkhaili
 * @license MIT
*/

import datepicker from "./datepicker.js";

//too many required params. ideally this should only require the inputId.
//note: best solution is to dynamically generate/remove datePicker when input is clicked/unclicked, this will take some time but would make for an awesome datepicker open source calendar npm package, maybe I'll do that some other time.
datepicker('datepicker', 'datepicker__input', 'toggle-calendar', 'calendar__body__cells', 'calendarDisplay', 'nextButtonFrom', 'prevButtonFrom');
datepicker('datepickerto', 'datepickerto__input', 'toggle-calendarto', 'calendar__body__cellsto', 'calendarDisplayto', 'nextButtonTo', 'prevButtonTo');

//toggle add event modal
const addEventModal = document.querySelector('.first-section');
const closeEventModalButton = document.querySelector('.first-section__close__btn');
const addEventButton = document.getElementById('formToggleButton');

const toggleAddEventButton = () => {
    addEventModal.classList.toggle('hidden');
    addEventModal.classList.toggle('fadeIn');
    addEventModal.classList.toggle('flex');
}

addEventButton && addEventButton.addEventListener('click', toggleAddEventButton);
closeEventModalButton && closeEventModalButton.addEventListener('click', toggleAddEventButton);

//toggle add category modal
const addCategoryModal = document.querySelector('.first-section');
const closeCategoryModalButton = document.querySelector('.first-section__close__btn');
const addCategoryButton = document.getElementById('formToggleButton');

const toggleAddCategoryButton = () => {
    addCategoryModal.classList.toggle('hidden');
    addCategoryModal.classList.toggle('fadeIn');
    addCategoryModal.classList.toggle('flex');
}

addCategoryButton && addCategoryButton.addEventListener('click', toggleAddCategoryButton);
closeCategoryModalButton && closeCategoryModalButton.addEventListener('click', toggleAddCategoryButton);