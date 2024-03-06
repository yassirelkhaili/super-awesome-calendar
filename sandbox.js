/**
 * @author Yassir Elkhaili
 * @license MIT
*/

document.addEventListener("DOMContentLoaded", () => {
    // toggle calendar onclick
    const calendar = document.getElementById("calendar");
    const toggleButton = document.querySelector(".toggle-calendar");
    toggleButton && toggleButton.addEventListener("click", () => calendar && calendar.classList.toggle("hidden"));
    
})