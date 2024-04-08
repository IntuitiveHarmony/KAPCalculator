// ~~~~~~~~~~~~~~~~~~
// Shoshana Variables
// ~~~~~~~~~~~~~~~~~~
let numIntroSession = 3;
let numKAPSession;
let numIVIntegration;
let numIMIntegration;
let numSubIntegration;

let lowTotalCost;
let highTotalCost;

let modalOpen = false;
let hasMedicaid = false;
let preWorkComplete = false;

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
// Total Cost
const lowTotal = document.getElementById("low-total");
const highTotal = document.getElementById("high-total");
// Option Buttons
const optionRadioButtons = document.querySelectorAll(".option-radio");
const medicaidButton = document.getElementById("medicaid-button");
const medicaidInputButton = document.getElementById("medicaid-input");
const previousWorkInputButton = document.getElementById("previous-work-input");
const optionModalElement = document.querySelector(".option-modal");
const checkElement = document.querySelector(".option-checkmark");

// Pre-Work sessions
const preWorkSlider = document.getElementById("pre-work-input");
const preWorkValue = document.getElementById("pre-work-value");
const preWorkLow = document.getElementById("pre-work-low");
const preWorkHigh = document.getElementById("pre-work-high");
// Medicine type
const medicineRadioButtons = document.querySelectorAll(".medicine-radio");
const medicineControls = document.querySelectorAll(".medicine-controls");

// KAP Sliders
// All Sliders
const allSliders = document.querySelectorAll(".slider");
// IM Sliders
const imSessionSlider = document.getElementById("im-sessions-input");
const imIntegrationSlider = document.getElementById("im-integration-input");
const imSessionValue = document.getElementById("im-sessions-value");
const imIntegrationValue = document.getElementById("im-integration-value");
const imSessionLow = document.getElementById("im-sessions-low");
const imSessionHigh = document.getElementById("im-sessions-high");
const imSessionAdmin = document.getElementById("im-admin");
const imIntegrationLow = document.getElementById("im-integration-low");
const imIntegrationHigh = document.getElementById("im-integration-high");
// Iv Sliders
const ivSessionSlider = document.getElementById("iv-sessions-input");
const ivIntegrationSlider = document.getElementById("iv-integration-input");
const ivSessionValue = document.getElementById("iv-sessions-value");
const ivIntegrationValue = document.getElementById("iv-integration-value");
const ivSessionLow = document.getElementById("iv-sessions-low");
const ivSessionHigh = document.getElementById("iv-sessions-high");
const ivSessionAdmin = document.getElementById("iv-admin");
const ivIntegrationLow = document.getElementById("iv-integration-low");
const ivIntegrationHigh = document.getElementById("iv-integration-high");

// ~~~~~~~~~
// Listeners
// ~~~~~~~~~

// Radio Buttons
// Loop over each one and add an event listener
medicineRadioButtons.forEach((radio, index) => {
  radio.addEventListener("click", () => {
    // Deselect all of the Radio buttons
    medicineRadioButtons.forEach((btn) =>
      btn.classList.remove("selected-radio")
    );
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
  imSessionValue.textContent = numIMSession;
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

ivSessionSlider.addEventListener("input", (event) => {
  // Get the current value of the slider
  const currentValue = event.target.value;
  // Update variable for calculator
  numIVSession = currentValue;
  // Update DOM with new variable amount
  ivSessionValue.textContent = numIVSession;
  // Calculate the cost for Shoshana and add to the DOM
  ivSessionLow.textContent = calculateWorkCost(numIVSession, shan.low)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  ivSessionHigh.textContent = calculateWorkCost(numIVSession, shan.high)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  // calculate cost for medicine and update DOM
  ivSessionAdmin.textContent = (numIVSession * iv.subsequent)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  // Update Integration sessions variable and DOM
  numIVIntegration = numIVSession;
  ivIntegrationValue.textContent = numIVIntegration;
  // Calculate integration cost and update DOM
  ivIntegrationLow.textContent = calculateWorkCost(numIVIntegration, shan.low)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  ivIntegrationHigh.textContent = calculateWorkCost(numIVIntegration, shan.high)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  // Update Integration slider params
  ivIntegrationSlider.min = numIVSession;
  ivIntegrationSlider.value = numIVSession;
  // Enable the Integration slider
  ivIntegrationSlider.disabled = false;
});

ivIntegrationSlider.addEventListener("input", (event) => {
  // Update the variable
  numIVIntegration = event.target.value;
  // Update the DOM
  ivIntegrationValue.textContent = numIVIntegration;
  // Update the cost
  ivIntegrationLow.textContent = calculateWorkCost(numIVIntegration, shan.low)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  ivIntegrationHigh.textContent = calculateWorkCost(numIVIntegration, shan.high)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
});

// Show Medicaid / Triwest Pre-work completed Options Modal
medicaidButton.addEventListener("click", () => {
  // Close Modal
  if (modalOpen) {
    modalOpen = false; // update flag
    optionModalElement.classList.add("hidden"); // Hide Modal
    // Hide Checkmark
    checkElement.classList.add("hidden");
    medicaidButton.classList.remove("selected-radio");
  }
  // Open Modal
  else {
    modalOpen = true; // update flag
    optionModalElement.classList.remove("hidden"); // Show Modal
    // Show Checkmark
    checkElement.classList.remove("hidden");
    medicaidButton.classList.add("selected-radio");
    // Reset Option Variables
    hasMedicaid = false;
    preWorkComplete = false;
    // Reset Button selections
    medicaidInputButton.classList.remove("selected-radio");
    previousWorkInputButton.classList.remove("selected-radio");
  }
});

medicaidInputButton.addEventListener("click", () => {
  if (hasMedicaid) {
    hasMedicaid = false;
    medicaidInputButton.classList.remove("selected-radio");
  } else {
    hasMedicaid = true;
    medicaidInputButton.classList.add("selected-radio");
  }
});

previousWorkInputButton.addEventListener("click", () => {
  if (preWorkComplete) {
    preWorkComplete = false;
    previousWorkInputButton.classList.remove("selected-radio");
  } else {
    preWorkComplete = true;
    previousWorkInputButton.classList.add("selected-radio");
  }
});

// Calculate the total if any slider or button is used
medicineRadioButtons.forEach((radio) => {
  radio.addEventListener("click", () => {
    calculateTotalCost();
  });
});

optionRadioButtons.forEach((radio) => {
  radio.addEventListener("click", () => {
    calculateTotalCost();
  });
});

allSliders.forEach((slider) => {
  slider.addEventListener("input", () => {
    calculateTotalCost();
  });
});

// ~~~~~~~~~
// Functions
// ~~~~~~~~~
const calculateWorkCost = (sessionAmt, scale) => {
  return sessionAmt * scale;
};

const calculateTotalCost = () => {
  // Conditional based on medicine type
  // IV Selected
  if (medicineType === "iv") {
    // Before Number of KAP sessions selected includes consult
    lowTotalCost =
      calculateWorkCost(numIntroSession, shan.low) + iv.initialHigh;
    highTotalCost =
      calculateWorkCost(numIntroSession, shan.high) + iv.initialHigh;
    // Factor in number of KAP sessions
    if (numIVSession != undefined) {
      lowTotalCost +=
        calculateWorkCost(numIVSession, shan.low) +
        calculateWorkCost(numIVSession, iv.subsequent) +
        calculateWorkCost(numIVIntegration, shan.low);
      highTotalCost +=
        calculateWorkCost(numIVSession, shan.high) +
        calculateWorkCost(numIVSession, iv.subsequent) +
        calculateWorkCost(numIVIntegration, shan.high);
    }
  }
  // IM Selected
  else if (medicineType === "im") {
    // Before Number of KAP sessions selected
    lowTotalCost =
      calculateWorkCost(numIntroSession, shan.low) + im.initialHigh;
    highTotalCost =
      calculateWorkCost(numIntroSession, shan.high) + im.initialHigh;
    // Factor in number of KAP sessions
    if (numIMSession != undefined) {
      lowTotalCost +=
        numIMSession * shan.low +
        numIMSession * im.subsequent +
        numIMIntegration * shan.low;
      highTotalCost +=
        numIMSession * shan.high +
        numIMSession * im.subsequent +
        numIMIntegration * shan.high;
    }
  }
  // Sublingual Selected
  else if (medicineType === "sub") {
    // Before Number of KAP sessions selected
    lowTotalCost = calculateWorkCost(numIntroSession, shan.low) + sub.initial;
    highTotalCost = calculateWorkCost(numIntroSession, shan.high) + sub.initial;
    // Factor in number of KAP sessions
  }
  // No medicine type selected
  else {
    // Calculate the cost
    lowTotalCost = calculateWorkCost(numIntroSession, shan.low);
    highTotalCost = calculateWorkCost(numIntroSession, shan.high);
  }
  // Display total cost estimates to DOM
  lowTotal.textContent = lowTotalCost
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  highTotal.textContent = highTotalCost
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Populate the DOM with variables upon page load
document.addEventListener("DOMContentLoaded", function () {
  // Shans pre-work with 3 hr minimum
  document.getElementById("pre-work-low").textContent = shan.low * 3;
  document.getElementById("pre-work-high").textContent = shan.high * 3;
  // Provider's consults
  document.getElementById("iv-consult-high").textContent = iv.initialHigh;
  document.getElementById("im-consult-high").textContent = im.initialHigh;
  document.getElementById("sub-consult").textContent = sub.initial;

  calculateTotalCost();
});
