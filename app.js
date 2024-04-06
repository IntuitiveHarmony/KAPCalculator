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

// ~~~~~~~~~
// Listeners
// ~~~~~~~~~
preWorkSlider.addEventListener("input", function () {
  // Get the current value of the slider
  const currentValue = this.value;
  // Update variable for calculator
  numIntroSession = currentValue;
  // Update the value displayed in the DOM
  preWorkValue.textContent = currentValue;
  // Calculate and display low to the DOM
  preWorkLow.textContent = calculateWorkCost(numIntroSession, shan.low);
  // Calculate and display high to the DOM
  preWorkHigh.textContent = calculateWorkCost(numIntroSession, shan.high);
});

// ~~~~~~~~~
// Functions
// ~~~~~~~~~

const calculateWorkCost = (sessionAmt, scale) => {
  return sessionAmt * scale;
};
