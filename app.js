// ~~~~~~~~~~~~~~~~~~
// Shoshana Variables
// ~~~~~~~~~~~~~~~~~~
let numIntroSession = 3;
let numKAPSession;
let numIVIntegration;
let numIMIntegration;
let numSubIntegration;

// Sliding scale for Shoshana
const shan = {
  low: 160,
  high: 200,
};

// ~~~~~~~~~~~~~~~~~~~~~
// Progressive Variables
// ~~~~~~~~~~~~~~~~~~~~~
let medicineType;
let numIVSession;
let numIMSession;
let numSubSession;

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
// KAP Sliders
const imSessionSlider = document.getElementById("im-sessions-input");
const imIntegrationSlider = document.getElementById("im-integration-input");
const imValue = document.getElementById("im-sessions-value");
const imIntegrationValue = document.getElementById("im-integration-value");
const imSessionLow = document.getElementById("im-sessions-low");
const imSessionHigh = document.getElementById("im-sessions-high");
const imSessionAdmin = document.getElementById("im-admin");
const imIntegrationLow = document.getElementById("im-integration-low");
const imIntegrationHigh = document.getElementById("im-integration-high");

// ~~~~~~~~~
// Listeners
// ~~~~~~~~~
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

// Sliders
preWorkSlider.addEventListener("input", (event) => {
  // Get the current value of the slider
  const currentValue = event.target.value;
  // Update variable for calculator
  numIntroSession = currentValue;
  // Update the value displayed in the DOM
  preWorkValue.textContent = currentValue;
  // Calculate and display low to the DOM Uses reg expression to put comma for 1,000+ numbers
  preWorkLow.textContent = calculateWorkCost(numIntroSession, shan.low)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  // Calculate and display high to the DOM Uses reg expression to put comma for 1,000+ numbers
  preWorkHigh.textContent = calculateWorkCost(numIntroSession, shan.high)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
});

imSessionSlider.addEventListener("input", (event) => {
  // Get the current value of the slider
  const currentValue = event.target.value;
  // Update variable for calculator
  numIMSession = currentValue;
  // Update DOM with new variable amount
  imValue.textContent = numIMSession;
  // Calculate the cost for Shoshana and add to the DOM
  imSessionLow.textContent = calculateWorkCost(numIMSession, shan.low)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  imSessionHigh.textContent = calculateWorkCost(numIMSession, shan.high)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  // calculate cost for medicine and update DOM
  imSessionAdmin.textContent = (numIMSession * im.subsequent)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  // Update Integration sessions variable and DOM
  numIMIntegration = numIMSession;
  imIntegrationValue.textContent = numIMIntegration;
  // Calculate integration cost and update DOM
  imIntegrationLow.textContent = calculateWorkCost(numIMIntegration, shan.low)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  imIntegrationHigh.textContent = calculateWorkCost(numIMIntegration, shan.high)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  // Update Integration slider params
  imIntegrationSlider.min = numIMSession;
  imIntegrationSlider.value = numIMSession;
  // Enable the Integration slider
  imIntegrationSlider.disabled = false;
});

imIntegrationSlider.addEventListener("input", (event) => {
  // Update the variable
  numIMIntegration = event.target.value;
  // Update the DOM
  imIntegrationValue.textContent = numIMIntegration;
  // Update the cost
  imIntegrationLow.textContent = calculateWorkCost(numIMIntegration, shan.low)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  imIntegrationHigh.textContent = calculateWorkCost(numIMIntegration, shan.high)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
