// ~~~~~~~~~~~~~~~~~~
// Shoshana Variables
// ~~~~~~~~~~~~~~~~~~
let numIntroSession = 3;
let numKAPSession;
let numIVIntegration = 0;
let numIMIntegration = 0;
let numSubIntegration = 0;

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
const preWorkContainer = document.querySelector(".pre-work-container");
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

const integrationContainers = document.querySelectorAll(
  ".integration-container"
);
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
  imIntegrationLow.textContent = formatThousands(
    calculateWorkCost(numIMIntegration, shan.low)
  );
  imIntegrationHigh.textContent = formatThousands(
    calculateWorkCost(numIMIntegration, shan.high)
  );
});

ivSessionSlider.addEventListener("input", (event) => {
  // Get the current value of the slider
  const currentValue = event.target.value;
  // Update variable for calculator
  numIVSession = currentValue;
  // Update DOM with new variable amount
  ivSessionValue.textContent = numIVSession;
  // Calculate the cost for Shoshana and add to the DOM
  ivSessionLow.textContent = formatThousands(
    calculateWorkCost(numIVSession, shan.low)
  );
  ivSessionHigh.textContent = formatThousands(
    calculateWorkCost(numIVSession, shan.high)
  );
  // calculate cost for medicine and update DOM
  ivSessionAdmin.textContent = formatThousands(numIVSession * iv.subsequent);
  // Update Integration sessions variable and DOM
  numIVIntegration = numIVSession;
  ivIntegrationValue.textContent = numIVIntegration;
  // Calculate integration cost and update DOM
  ivIntegrationLow.textContent = formatThousands(
    calculateWorkCost(numIVIntegration, shan.low)
  );
  ivIntegrationHigh.textContent = formatThousands(
    calculateWorkCost(numIVIntegration, shan.high)
  );
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
  ivIntegrationLow.textContent = formatThousands(
    calculateWorkCost(numIVIntegration, shan.low)
  );
  ivIntegrationHigh.textContent = formatThousands(
    calculateWorkCost(numIVIntegration, shan.high)
  );
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
    // Reset Option Variables
    hasMedicaid = false;
    preWorkComplete = false;
  }
  // Open Modal
  else {
    modalOpen = true; // update flag
    optionModalElement.classList.remove("hidden"); // Show Modal
    // Show Checkmark
    checkElement.classList.remove("hidden");
    medicaidButton.classList.add("selected-radio");
    // Reset Button selections
    medicaidInputButton.classList.remove("selected-radio");
    previousWorkInputButton.classList.remove("selected-radio");
  }
});

medicaidInputButton.addEventListener("click", () => {
  if (hasMedicaid) {
    hasMedicaid = false;
    medicaidInputButton.classList.remove("selected-radio");
    if (preWorkComplete != true) {
      numIntroSession = 3; //  Put pre-KAP sessions back the equation
    }
  } else {
    hasMedicaid = true;
    medicaidInputButton.classList.add("selected-radio");
    numIntroSession = 0; // Take pre-KAP sessions out of the equation
  }
});

previousWorkInputButton.addEventListener("click", () => {
  if (preWorkComplete) {
    preWorkComplete = false;
    previousWorkInputButton.classList.remove("selected-radio");
    if (hasMedicaid != true) {
      numIntroSession = 3; //  Put pre-KAP sessions back the equation
    }
  } else {
    preWorkComplete = true;
    previousWorkInputButton.classList.add("selected-radio");
    numIntroSession = 0; // Take pre-KAP sessions out of the equation
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
    handleOptionContainers();
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
// Add comma for 1000 numbers
const formatThousands = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Hide the pre-work container based on medicaid, triwest or pre-work completion
const handleOptionContainers = () => {
  if (hasMedicaid) {
    integrationContainers.forEach((container) => {
      container.classList.add("hidden");
    });
  } else {
    integrationContainers.forEach((container) => {
      container.classList.remove("hidden");
    });
  }

  if (preWorkComplete || hasMedicaid) {
    preWorkContainer.classList.add("hidden");
  } else {
    preWorkContainer.classList.remove("hidden");
  }
};

const calculateWorkCost = (sessionAmt, scale) => {
  return sessionAmt * scale;
};

const calculateTotalCost = () => {
  // Conditional based on medicine type
  // IV Selected
  if (medicineType === "iv") {
    // Before Number of KAP sessions selected includes consult
    lowTotalCost = calculateWorkCost(numIntroSession, shan.low) + iv.initialLow;
    highTotalCost =
      calculateWorkCost(numIntroSession, shan.high) + iv.initialHigh;
    // Factor in number of KAP sessions
    if (numIVSession != undefined) {
      lowTotalCost +=
        calculateWorkCost(numIVSession, shan.low) +
        calculateWorkCost(numIVSession, iv.subsequent);
      highTotalCost +=
        calculateWorkCost(numIVSession, shan.high) +
        calculateWorkCost(numIVSession, iv.subsequent);
    }
    // Incorporate Integration if no medicaid
    if (numIVIntegration > 0 && hasMedicaid != true) {
      lowTotalCost += calculateWorkCost(numIVIntegration, shan.low);
      highTotalCost += calculateWorkCost(numIVIntegration, shan.high);
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
      lowTotalCost += numIMSession * shan.low + numIMSession * im.subsequent;
      highTotalCost += numIMSession * shan.high + numIMSession * im.subsequent;
    }
    // Incorporate Integration if no medicaid
    if (numIMIntegration > 0 && hasMedicaid != true) {
      lowTotalCost += calculateWorkCost(numIMIntegration, shan.low);
      highTotalCost += calculateWorkCost(numIMIntegration, shan.high);
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
  lowTotal.textContent = formatThousands(lowTotalCost);

  highTotal.textContent = formatThousands(highTotalCost);
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
