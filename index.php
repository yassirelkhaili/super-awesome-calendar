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
    <div id="container" class="calendar__container">
      <div id="header" class="calendar__display">
      <div class="header__buttons__container">
      <button id="formToggleButton" class="calendar__nav__container__Button">Event</button>
      <button id="formToggleButton-category" class="calendar__nav__container__Button">Category</button>
      <button id="formToggleButton-today" class="calendar__nav__container__Button">Today</button>
      </div>
        <div id="monthDisplay"></div>
        <div class="header__buttons__container--smaller header__buttons__container">
        <div class="header__button__group">
      <button id="formToggleButton" class="calendar__nav__container__interfaceButton--left calendar__nav__container__interfaceButton">Month</button>
      <button id="formToggleButton-category" class="calendar__nav__container__interfaceButton">Week</button>
      <button id="formToggleButton" class="calendar__nav__container__interfaceButton">Day</button>
      <button id="formToggleButton-category" class="calendar__nav__container__interfaceButton--right calendar__nav__container__interfaceButton">List</button>
      </div>
        <button type="button" class="calendar__nav__button" id="nextButton">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="m15 18-6-6 6-6"></path>
                    </svg>
                </button>
                <button type="button" class="calendar__nav__button" id="backButton">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="m9 18 6-6-6-6"></path>
                    </svg>
                </button>
        </div>
      </div>
      <div class="header__weekdays">
        <div>Sunday</div>
        <div>Monday</div>
        <div>Tuesday</div>
        <div>Wednesday</div>
        <div>Thursday</div>
        <div>Friday</div>
        <div>Saturday</div>
      </div>
      <div id="calendar" class="calendar__cell__container"></div>
</div>
    <div id="modalBackDrop" class="modalBackDrop hidden"></div>
    <?php include "./partials/eventmodal.php" ?>
    <?php include "./partials/categorymodal.php" ?>
</body>
</html>