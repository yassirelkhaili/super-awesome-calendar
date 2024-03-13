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
        <button id="formToggleButton-category" class="calendar__nav__container__addButton">Add Category</button>
    </section>
    <div id="container" class="datepicker-container">
      <div id="header">
        <div id="monthDisplay"></div>
        <div>
          <button id="backButton">Back</button>
          <button id="nextButton">Next</button>
        </div>
      </div>

      <div id="weekdays">
        <div>Sunday</div>
        <div>Monday</div>
        <div>Tuesday</div>
        <div>Wednesday</div>
        <div>Thursday</div>
        <div>Friday</div>
        <div>Saturday</div>
      </div>

      <div id="calendar"></div>
    </div>
    <div id="modalBackDrop"></div>
    <?php include "./partials/eventmodal.php" ?>
    <?php include "./partials/categorymodal.php" ?>
</body>
</html>