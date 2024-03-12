<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./styles/style.css">
    <link rel="stylesheet" href="./styles/normalize.css">
    <script type="module" src="./js/sandbox.js"></script>
    <title>Super awesome calendar</title>
</head>

<body>
    <section class="calendar__nav__container">
        <button id="formToggleButton" class="calendar__nav__container__addButton">Add Event</button>
    </section>
    <!-- Modal start -->
    <div class="first-section hidden">
        <div class="first-section__nav">
            <h3>
            Create Event
            </h3>
            <svg class="first-section__close__btn" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
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
    <select id="event-types" class="first-section__body__select">
    <option selected disabled>Select type</option>
    <option value="whole">Whole day</option>
    <option value="specific">Specific time</option>
    <option value="multiple">Multiple days</option>
  </select>
        </div>
        <div class="first-section__body__input__group">
        <label for="event-types" class="first-section__body__label">Category</label>
    <select id="event-types" class="first-section__body__select">
    <option selected disabled>Select category</option>
    <option value="whole">Whole day</option>
    <option value="specific">Specific time</option>
    <option value="multiple">Multiple days</option>
  </select>
        </div>
      <div class="first-section__body__input__group">
      <label for="date" class="first-section__body__label">Date</label>
      <div class="date__picker__container">
      <?php $placeholder = 'Select start date'; $datepicker = 'datepicker'; $datepickerInput = 'datepicker__input'; $datepickerContainer = 'toggle-calendar'; $calendarBody = 'calendar__body__cells'; $calendarDisplay = 'calendarDisplay'; $nextButton = 'nextButtonFrom'; $prevButton = 'prevButtonFrom'; include "./components/datepicker.php" ?> <!-- look at what I need to do to mimick a fraction of React/Laravel components power -->
      <span class="seperator">to</span>
      <?php $placeholder = 'Select end date'; $datepicker = 'datepickerto'; $datepickerInput = 'datepickerto__input'; $datepickerContainer = 'toggle-calendarto'; $calendarBody = 'calendar__body__cellsto'; $calendarDisplay = 'calendarDisplayto'; $nextButton = 'nextButtonTo'; $prevButton = 'prevButtonTo'; include "./components/datepicker.php" ?>
      </div>
      </div>
      </div>
      <div class="first-section__footer">
      <button id="formSubmitButton" class="calendar__nav__container__addButton">Submit Event</button>
      </div>
      </form>
</div>
<!-- Modal start -->
</body>

</html>