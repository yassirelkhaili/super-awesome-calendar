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
      </div>
        <div id="monthDisplay"></div>
        <div class="header__buttons__container">
          <button id="backButton" class="calendar__nav__container__Button">Back</button>
          <button id="nextButton" class="calendar__nav__container__Button">Next</button>
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
    <div id="modalBackDrop"></div>
    <?php include "./partials/eventmodal.php" ?>
    <?php include "./partials/categorymodal.php" ?>
</body>
</html>