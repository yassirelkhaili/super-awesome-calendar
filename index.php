<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./style.css">
    <link rel="stylesheet" href="./normalize.css">
    <script src="./sandbox.js"></script>
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
      <div class="first-section__body">
        <div class="first-section__body__input__group">
        <label for="name" class="first-section__body__label">Name</label>
        <input type="text" class="datepicker__text__input" placeholder="Enter event name" name="name">
        </div>
      <div class="first-section__body__input__group">
      <div class="datepicker-container">
            <!-- calendar toggle input -->
        <div class="datepicker-wrapper toggle-calendar">
            <div class="datepicker__icon-container">
                <svg class="datepicker__icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                </svg>
            </div>
            <input type="text" class="datepicker__input" placeholder="Select date" id="datepicker__input">
        </div>
        <!-- calendar -->
        <div id="calendar" class="calendar hidden">
            <div class="calendar__nav__container">
                <div class="calendar__nav">
                    <button type="button" class="calendar__nav__button" id="prevButton" style="padding-right: 0px;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="m15 18-6-6 6-6"></path>
                        </svg>
                    </button>
                    <h2 class="calendar__title" id="calendarDisplay"></h2>
                    <button type="button" class="calendar__nav__button" id="nextButton" style="padding-left: 0px;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="m9 18 6-6-6-6"></path>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="calendar__body">
                <div class="calendar__body__days">
                    <span class="calendar__body__dayoftheweek">Su</span><span class="calendar__body__dayoftheweek">Mo</span><span class="calendar__body__dayoftheweek">Tu</span><span class="calendar__body__dayoftheweek">We</span><span class="calendar__body__dayoftheweek">Th</span><span class="calendar__body__dayoftheweek">Fr</span><span class="calendar__body__dayoftheweek">Sa</span>
                </div>
                <div class="calendar__body__cells"></div>
            </div>
        </div>
        </div>
      </div>
      </div>
</div>
<!-- Modal start -->
</body>

</html>