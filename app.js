// ~~~~~~~~~~~~~~~~~~
// Shoshana Variables
// ~~~~~~~~~~~~~~~~~~
let numIntroSession = 3;
let numKAPSession;

// Sliding scale for Shoshana
const shan = {
  low: 160,
  high: 200,
};

// ~~~~~~~~~~~~~~~~~~~~~
// Progressive Variables
// ~~~~~~~~~~~~~~~~~~~~~
let medicineType;

const iv = {
  initialLow: 475,
  initialHigh: 550,
  subsequent: 375,
};

const im = {
  initialLow: 375,
  initialHigh: 450,
  subsequent: 275,
};

const sub = {
  initial: 350,
  room: {
    low: 0,
    high: 50,
  },
  medsLow: 65,
  medsHigh: 85,
};

// ~~~~~~~~~~~~~
// DOM Variables
// ~~~~~~~~~~~~~
// Pre-Work sessions
const preWorkSlider = document.getElementById("pre-work-input");
const preWorkValue = document.getElementById("pre-work-value");
const preWorkLow = document.getElementById("pre-work-low");
const preWorkHigh = document.getElementById("pre-work-high");
// Medicine type
const radioButtons = document.querySelectorAll(".medicine-radio");
const medicineControls = document.querySelectorAll(".medicine-controls");

// ~~~~~~~~~
// Listeners
// ~~~~~~~~~
// Sliders
preWorkSlider.addEventListener("input", (event) => {
  // Get the current value of the slider
  const currentValue = event.target.value;
  // Update variable for calculator
  numIntroSession = currentValue;
  // Update the value displayed in the DOM
  preWorkValue.textContent = currentValue;
  // Calculate and display low to the DOM
  preWorkLow.textContent = calculateWorkCost(numIntroSession, shan.low);
  // Calculate and display high to the DOM
  preWorkHigh.textContent = calculateWorkCost(numIntroSession, shan.high);
});

// Radio Buttons
// Loop over each one and add an event listener
radioButtons.forEach((radio, index) => {
  radio.addEventListener("click", () => {
    // Deselect all of the Radio buttons
    radioButtons.forEach((btn) => btn.classList.remove("selected-radio"));
    // Select the clicked radio button
    radio.classList.add("selected-radio");
    // Hide all medicine controls
    medicineControls.forEach((control) => control.classList.add("hidden"));
    // Show the corresponding medicine Controls
    medicineControls[index].classList.remove("hidden");
    // Get Medicine Type for the calculator from id and remove the -input part
    medicineType = radio.id.replace("-input", "");
  });
});

// ~~~~~~~~~
// Functions
// ~~~~~~~~~
const calculateWorkCost = (sessionAmt, scale) => {
  return sessionAmt * scale;
};

// Populate the DOM with variables upon page load
document.addEventListener("DOMContentLoaded", function () {
  // Shans pre-work with 3 hr minimum
  document.getElementById("pre-work-low").textContent = shan.low * 3;
  document.getElementById("pre-work-high").textContent = shan.high * 3;
  // Dr. Markey's consults
  document.getElementById("iv-consult-low").textContent = iv.initialLow;
  document.getElementById("iv-consult-high").textContent = iv.initialHigh;
  document.getElementById("im-consult-low").textContent = im.initialLow;
  document.getElementById("im-consult-high").textContent = im.initialHigh;
  document.getElementById("sub-consult").textContent = sub.initial;
});
