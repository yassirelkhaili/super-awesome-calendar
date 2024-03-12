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
const addCategoryModal = document.getElementById('first-section-category');
const closeCategoryModalButton = document.getElementById('first-section__close__btn__category');
const addCategoryButton = document.getElementById('formToggleButton-category');

const toggleAddCategoryButton = () => {
    addCategoryModal.classList.toggle('hidden');
    addCategoryModal.classList.toggle('fadeIn');
    addCategoryModal.classList.toggle('flex');
}

addCategoryButton && addCategoryButton.addEventListener('click', toggleAddCategoryButton);
closeCategoryModalButton && closeCategoryModalButton.addEventListener('click', toggleAddCategoryButton);

 //handle category addition
 const categoryForm = document.getElementById('AddCategoryModal');
 categoryForm && categoryForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formDataObj = {};
    for (const [key, value] of formData.entries()) {
        formDataObj[key] = value;
      }
      isLoading();
    //endpoint should be stored in .env
    fetch('http://localhost/backend/api/categories.php', {
        method: 'POST',
        body: JSON.stringify(formDataObj),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        alert(data.message)
      })
      .catch((error) => {
        console.error('Error:', error);
        alert(data.message)
      }).finally(() => {
        isLoading();
      });
 })

 //toggle spinner
const isLoading = () => {
    const loader = document.querySelector('.loader');
    const submitButton = loader.closest('button');
    loader.classList.toggle('hidden');
    submitButton.disabled = true;
}