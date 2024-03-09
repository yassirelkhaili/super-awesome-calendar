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
   <section class="first-section">
     <!-- calendar toggle button -->
     <button class="toggle-calendar">Toggle Calendar</button>
    <!-- calendar -->
    <div id="calendar" class="calendar">
       <div class="calendar__nav__container">
        <div class="calendar__nav">
            <button type="button" class="calendar__nav__button" style="padding-right: 0px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"></path></svg>
            </button>
            <h2 class="calendar__title">September 2022</h2>
            <button type="button" class="calendar__nav__button" style="padding-left: 0px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"></path></svg>
            </button>
       </div>
        </div>
        <div class="calendar__body">
        <div class="calendar__body__days">
            <span class="calendar__body__dayoftheweek">Su</span><span class="calendar__body__dayoftheweek">Mo</span><span class="calendar__body__dayoftheweek">Tu</span><span class="calendar__body__dayoftheweek">We</span><span class="calendar__body__dayoftheweek">Th</span><span class="calendar__body__dayoftheweek">Fr</span><span class="calendar__body__dayoftheweek">Sa</span>
        </div>
        <div class="calendar__body__cells">
        <span class="calendar__body__cell calendar--hover">12</span><span class="calendar__body__cell">12</span><span class="calendar__body__cell">12</span><span class="calendar__body__cell">12</span><span class="calendar__body__cell">12</span><span class="calendar__body__cell">12</span><span class="calendar__body__cell">12</span><span class="calendar__body__cell">12</span><span class="calendar__body__cell">12</span><span class="calendar__body__cell">12</span><span class="calendar__body__cell">12</span><span class="calendar__body__cell">12</span><span class="calendar__body__cell">12</span><span class="calendar__body__cell">12</span><span class="calendar__body__cell">12</span><span class="calendar__body__cell">12</span><span class="calendar__body__cell">12</span><span class="calendar__body__cell">12</span><span class="calendar__body__cell">12</span><span class="calendar__body__cell">12</span><span class="calendar__body__cell">12</span><span class="calendar__body__cell">12</span><span class="calendar__body__cell">12</span><span class="calendar__body__cell">12</span><span class="calendar__body__cell">12</span><span class="calendar__body__cell">12</span><span class="calendar__body__cell">12</span><span class="calendar__body__cell">12</span><span class="calendar__body__cell">12</span><span class="calendar__body__cell">12</span><span class="calendar__body__cell">12</span><span class="calendar__body__cell">12</span><span class="calendar__body__cell">12</span><span class="calendar__body__cell">12</span><span class="calendar__body__cell">12</span><span class="calendar__body__cell">12</span><span class="calendar__body__cell">12</span><span class="calendar__body__cell">12</span><span class="calendar__body__cell">12</span><span class="calendar__body__cell">12</span><span class="calendar__body__cell">12</span><span class="calendar__body__cell">12</span>
        </div>
       </div>
    </div>
   </section>
</body>
</html>