<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./normalize.css">
    <link rel="stylesheet" href="./style.css">
    <script src="./sandbox.js"></script>
    <title>Super awesome calendar</title>
</head>
<body>
    <!-- calendar toggle button -->
    <button class="toggle-calendar">Toggle calendar</button>
    <!-- calendar -->
    <div id="calendar" class="hidden calendar">
        <h2 class="calendar__title">September 2022</h2>
        <div class="calendar__nav">
            <button type="button" class="calendar__nav__button">
                <img src="./assets/left-arrow.svg" alt="left-calendar-arrow">
            </button>
            <button type="button" class="calendar__nav__button">
                <img src="./assets/right-arrow.svg" alt="right-calendar-arrow">
            </button>
        </div>
    </div>
</body>
</html>