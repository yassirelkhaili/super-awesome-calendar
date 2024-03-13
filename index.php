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
    <?php include "./partials/eventmodal.php" ?>
    <?php include "./partials/categorymodal.php" ?>
</body>
</html>