<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./style.css">
    <link rel="stylesheet" href="./normalize.css">
    <script type="module" src="./sandbox.js"></script>
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
        <input type="text" class="datepicker__text__input" placeholder="Enter event name" name="name">
        </div>
      <div class="first-section__body__input__group">
      <label for="date" class="first-section__body__label">Date</label>
      <div class="date__picker__container">
      <?php $placeholder = 'Select start date'; $datepicker = 'datepicker'; $datepickerInput = 'datepickerInput'; $datepickerContainer = 'toggle-calendar'; include "./components/datepicker.php" ?> <!-- look at what I need to do to mimick a fraction of React/Laravel components power -->
      <span class="seperator">to</span>
      <?php $placeholder = 'Select end date'; $datepicker = 'datepickerto'; $datepickerInput = 'datepickerto__input'; $datepickerContainer = 'toggle-calendarto'; include "./components/datepicker.php" ?> <!-- look at what I need to do to mimick a fraction of React/Laravel components power -->
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