/**
 * @author Yassir Elkhaili
 * @license MIT
*/

import datepicker from "./datepicker.js";

datepicker('datepicker', 'datepicker__input', 'toggle-calendar');
datepicker('datepickerto', 'datepickerto__input', 'toggle-calendarto');

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