 <!-- Modal start -->
 <div class="first-section first-section-edit hidden">
     <div class="first-section__nav">
         <h3>
             Edit Event
         </h3>
         <svg id="first-section__close__btn__edit" class="first-section__close__btn" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
             <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"></path>
         </svg>
     </div>
     <form id="AddEventModalForm" class="first-section__form">
         <div class="first-section__body">
             <div class="first-section__body__input__group">
                 <label for="name" class="first-section__body__label">Name</label>
                 <input type="text" class="datepicker__text__input" placeholder="Enter name" name="name">
             </div>
             <div class="first-section__body__input__group">
                 <label for="event-types" class="first-section__body__label">Type</label>
                 <select id="event-types" class="first-section__body__select" name="event_type">
                     <option selected disabled>Select type</option>
                     <option value="whole">Whole day</option>
                     <option value="specific">Specific time</option>
                     <option value="multiple">Multiple days</option>
                 </select>
             </div>
             <div class="first-section__body__input__group">
                 <label for="categories" class="first-section__body__label">Category</label>
                 <select id="categories" class="first-section__body__select" name="category_id">
                     <option selected disabled>Select category</option>
                 </select>
             </div>
             <div class="first-section__body__input__group date-input" id="multiple">
                 <label for="date" class="first-section__body__label">Date</label>
                 <div class="date__picker__container">
                     <?php $placeholder = 'Select start date';
                        $datepicker = 'datepickeredit';
                        $datepickerInput = 'datepicker__inputedit';
                        $datepickerContainer = 'toggle-calendaredit';
                        $calendarBody = 'calendar__body__cellsedit';
                        $calendarDisplay = 'calendarDisplayedit';
                        $nextButton = 'nextButtonFromedit';
                        $prevButton = 'prevButtonFromedit';
                        $inputName = "date_from";
                        include "./components/datepicker.php" ?>
                     <span class="seperator">to</span>
                     <?php $placeholder = 'Select end date';
                        $datepicker = 'datepickertoedit';
                        $datepickerInput = 'datepickerto__inputedit';
                        $datepickerContainer = 'toggle-calendartoedit';
                        $calendarBody = 'calendar__body__cellstoedit';
                        $calendarDisplay = 'calendarDisplaytoedit';
                        $nextButton = 'nextButtonToedit';
                        $prevButton = 'prevButtonToedit';
                        $inputName = "date_to";
                        include "./components/datepicker.php" ?>
                 </div>
             </div>
             <div class="first-section__body__input__group date-input" id="whole">
                 <label for="date" class="first-section__body__label">Date</label>
                 <div class="date__picker__container">
                     <?php $placeholder = 'Select date';
                        $datepicker = 'datepickerwholeedit';
                        $datepickerInput = 'datepicker__inputwholeedit';
                        $datepickerContainer = 'toggle-calendarwholeedit';
                        $calendarBody = 'calendar__body__cellswholeedit';
                        $calendarDisplay = 'calendarDisplaywholeedit';
                        $nextButton = 'nextButtonFromwholeedit';
                        $prevButton = 'prevButtonFromwholeedit';
                        $inputName = "date_from";
                        include "./components/datepicker.php" ?>
                 </div>
             </div>
             <div class="first-section__body__input__group--row date-input" id="specific">
                 <div>
                 <label for="date" class="first-section__body__label">Date</label>
                 <div class="date__picker__container">
                     <?php $placeholder = 'Select date';
                        $datepicker = 'datepickerspecificedit';
                        $datepickerInput = 'datepicker__inputspecificedit';
                        $datepickerContainer = 'toggle-calendarspecificedit';
                        $calendarBody = 'calendar__body__cellsspecificedit';
                        $calendarDisplay = 'calendarDisplayspecificedit';
                        $nextButton = 'nextButtonFromspecificedit';
                        $prevButton = 'prevButtonFromspecificedit';
                        $inputName = "date_from";
                        include "./components/datepicker.php" ?>
                 </div>
                 </div>
                 <span class="seperator" style="margin-top: 20px;">to</span>
                 <div>
                 <label for="time-select" class="first-section__body__label">Time</label>
                 <select id="time-select" class="first-section__body__select" name="time_from">
                 <option selected disabled>Select time</option>
                 </select>
                 </div>
             </div>
         </div>
         <div class="first-section__footer">
             <button id="formSubmitButton" class="calendar__nav__container__Button--wide calendar__nav__container__Button">Submit Event</button>
         </div>
     </form>
 </div>
 <!-- Modal end -->