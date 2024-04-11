// ~~~~~~~~~~~~~~~~~~
// Shoshana Variables
// ~~~~~~~~~~~~~~~~~~
let numIntroSession = 3;
let numKAPSession;
let numIVIntegration = 4;
let numIMIntegration = 4;
let numSubIntegration = 4;

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
let numIVSession = 4;
let numIMSession = 4;
let numSubSession = 4;
let roomOption = false;

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
const medicaidCheckElement = document.getElementById("medicaid-checkmark");

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

// Sub Buttons and sliders
const subMedicineCostElement = document.getElementById("sub-medicine-cost");
const roomOptionCheckbox = document.getElementById("room-option-button");
const roomOptionCheckmark = document.getElementById("room-option-checkmark");
const roomFeeElement = document.getElementById("room-fee");
const roomFeeContainerElement = document.getElementById("room-fee-container");

const subSessionSlider = document.getElementById("sub-sessions-input");
const subIntegrationSlider = document.getElementById("sub-integration-input");
const subSessionValue = document.getElementById("sub-sessions-value");
const subIntegrationValue = document.getElementById("sub-integration-value");
const subSessionLow = document.getElementById("sub-sessions-low");
const subSessionHigh = document.getElementById("sub-sessions-high");
const subSessionAdmin = document.getElementById("sub-admin");
const subIntegrationLow = document.getElementById("sub-integration-low");
const subIntegrationHigh = document.getElementById("sub-integration-high");

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
  preWorkLow.textContent = formatThousands(
    calculateWorkCost(numIntroSession, shan.low)
  );

  // Calculate and display high to the DOM Uses reg expression to put comma for 1,000+ numbers
  preWorkHigh.textContent = formatThousands(
    calculateWorkCost(numIntroSession, shan.high)
  );
});

imSessionSlider.addEventListener("input", (event) => {
  // Get the current value of the slider
  const currentValue = event.target.value;
  // Update variable for calculator
  numIMSession = currentValue;
  // Update DOM with new variable amount
  imSessionValue.textContent = numIMSession;
  // Calculate the cost for Shoshana and add to the DOM
  imSessionLow.textContent = formatThousands(
    calculateWorkCost(numIMSession, shan.low)
  );
  imSessionHigh.textContent = formatThousands(
    calculateWorkCost(numIMSession, shan.high)
  );
  // calculate cost for medicine and update DOM
  imSessionAdmin.textContent = formatThousands(numIMSession * im.subsequent);
  // Update Integration sessions variable and DOM
  numIMIntegration = numIMSession;
  imIntegrationValue.textContent = numIMIntegration;
  // Calculate integration cost and update DOM
  imIntegrationLow.textContent = formatThousands(
    calculateWorkCost(numIMIntegration, shan.low)
  );
  imIntegrationHigh.textContent = formatThousands(
    calculateWorkCost(numIMIntegration, shan.high)
  );
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

// Sub sliders
subSessionSlider.addEventListener("input", (event) => {
  // Get the current value of the slider
  const currentValue = event.target.value;
  // Update variable for calculator
  numSubSession = currentValue;
  // Update DOM with new variable amount
  subSessionValue.textContent = numSubSession;
  // Calculate the cost for Shoshana and add to the DOM
  subSessionLow.textContent = formatThousands(
    calculateWorkCost(numSubSession, shan.low)
  );
  subSessionHigh.textContent = formatThousands(
    calculateWorkCost(numSubSession, shan.high)
  );
  // Update Integration sessions variable and DOM
  numSubIntegration = numSubSession;
  subIntegrationValue.textContent = numSubIntegration;
  // Calculate integration cost and update DOM
  subIntegrationLow.textContent = formatThousands(
    calculateWorkCost(numSubIntegration, shan.low)
  );
  subIntegrationHigh.textContent = formatThousands(
    calculateWorkCost(numSubIntegration, shan.high)
  );
  // Update Integration slider params
  subIntegrationSlider.min = numSubSession;
  subIntegrationSlider.value = numSubSession;
  // Enable the Integration slider
  subIntegrationSlider.disabled = false;
});

subIntegrationSlider.addEventListener("input", (event) => {
  // Update the variable
  numSubIntegration = event.target.value;
  // Update the DOM
  subIntegrationValue.textContent = numSubIntegration;
  // Update the cost
  subIntegrationLow.textContent = formatThousands(
    calculateWorkCost(numSubIntegration, shan.low)
  );
  subIntegrationHigh.textContent = formatThousands(
    calculateWorkCost(numSubIntegration, shan.high)
  );
});

// IV Sliders
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
    medicaidCheckElement.classList.add("hidden");
    medicaidButton.classList.remove("selected-radio");
    // Reset Option Variables
    hasMedicaid = false;
    preWorkComplete = false;
    numIntroSession = 3;
  }
  // Open Modal
  else {
    modalOpen = true; // update flag
    optionModalElement.classList.remove("hidden"); // Show Modal
    // Show Checkmark
    medicaidCheckElement.classList.remove("hidden");
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

roomOptionCheckbox.addEventListener("click", () => {
  if (roomOption) {
    // Remove cost from calculator
    roomOption = false;
    // Hide Checkmark
    roomOptionCheckmark.classList.add("hidden");
    // Remove color
    roomOptionCheckbox.classList.remove("selected-radio");
    // Hide the cost in th DOM
    roomFeeContainerElement.classList.add("hidden");
  } else {
    // Put cost into calculator
    roomOption = true;
    // Show checkmark
    roomOptionCheckmark.classList.remove("hidden");
    // Add color
    roomOptionCheckbox.classList.add("selected-radio");
    // Show the cost in th DOM
    roomFeeContainerElement.classList.remove("hidden");
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
  // Start with the pre-work
  lowTotalCost = calculateWorkCost(numIntroSession, shan.low);
  highTotalCost = calculateWorkCost(numIntroSession, shan.high);

  // Conditional based on medicine type
  // IV Selected
  if (medicineType === "iv") {
    // Consult
    lowTotalCost += iv.initialHigh;
    highTotalCost += iv.initialHigh;
    // KAP sessions
    if (numIVSession != undefined) {
      lowTotalCost +=
        calculateWorkCost(numIVSession, shan.low) +
        calculateWorkCost(numIVSession, iv.subsequent);
      highTotalCost +=
        calculateWorkCost(numIVSession, shan.high) +
        calculateWorkCost(numIVSession, iv.subsequent);
    }
    // Incorporate Integration if no medicaid
    if (hasMedicaid != true) {
      // Check for positive value first
      if (numIVIntegration > 0) {
        lowTotalCost += calculateWorkCost(numIVIntegration, shan.low);
        highTotalCost += calculateWorkCost(numIVIntegration, shan.high);
      }
    }
  }
  // IM Selected
  else if (medicineType === "im") {
    // Consult
    lowTotalCost += im.initialHigh;
    highTotalCost += im.initialHigh;
    // KAP sessions
    if (numIMSession != undefined) {
      lowTotalCost +=
        calculateWorkCost(numIMSession, shan.low) +
        calculateWorkCost(numIMSession, im.subsequent);
      highTotalCost +=
        calculateWorkCost(numIMSession, shan.high) +
        calculateWorkCost(numIMSession, im.subsequent);
    }
    // Incorporate Integration if no medicaid
    if (hasMedicaid != true) {
      // Check for positive value first
      if (numIMIntegration > 0) {
        lowTotalCost += calculateWorkCost(numIMIntegration, shan.low);
        highTotalCost += calculateWorkCost(numIMIntegration, shan.high);
      }
    }
  }
  // Sublingual Selected
  else if (medicineType === "sub") {
    // Consult
    lowTotalCost += sub.initial;
    highTotalCost += sub.initial;
    // Cost of Medicine
    lowTotalCost += sub.medsHigh;
    highTotalCost += sub.medsHigh;
    // Cost of room option
    if (roomOption) {
      lowTotalCost += sub.room.high;
      highTotalCost += sub.room.high;
    }
    // Cost of KAP Sessions
    lowTotalCost += calculateWorkCost(numSubSession, shan.low);
    highTotalCost += calculateWorkCost(numSubSession, shan.high);
    // Incorporate Integration if no medicaid
    if (hasMedicaid != true) {
      // Check for positive value first
      if (true) {
        lowTotalCost += calculateWorkCost(numSubIntegration, shan.low);
        highTotalCost += calculateWorkCost(numSubIntegration, shan.high);
      }
    }
  }

  // Display total cost estimates to DOM
  lowTotal.textContent = formatThousands(lowTotalCost);
  highTotal.textContent = formatThousands(highTotalCost);
};

// Populate the DOM with variables upon page load
document.addEventListener("DOMContentLoaded", function () {
  // Shans pre-work with 3 hr minimum
  preWorkLow.textContent = shan.low * numIntroSession;
  preWorkHigh.textContent = shan.high * numIntroSession;
  // Provider's consults
  document.getElementById("iv-consult-high").textContent = iv.initialHigh;
  document.getElementById("im-consult-high").textContent = im.initialHigh;
  document.getElementById("sub-consult").textContent = sub.initial;

  // KAP Sessions / Integration
  imSessionAdmin.textContent = numIMSession * im.subsequent;
  imSessionValue.textContent = numIMSession;
  imIntegrationValue.textContent = numIMSession;
  imSessionLow.textContent = calculateWorkCost(numIMSession, shan.low);
  imSessionHigh.textContent = calculateWorkCost(numIMSession, shan.high);
  imIntegrationLow.textContent = calculateWorkCost(numIMIntegration, shan.low);
  imIntegrationHigh.textContent = calculateWorkCost(
    numIMIntegration,
    shan.high
  );

  subMedicineCostElement.textContent = sub.medsHigh;
  roomFeeElement.textContent = sub.room.high;
  subSessionLow.textContent = calculateWorkCost(numSubSession, shan.low);
  subSessionHigh.textContent = calculateWorkCost(numSubSession, shan.high);
  subIntegrationLow.textContent = calculateWorkCost(
    numSubIntegration,
    shan.low
  );
  subIntegrationHigh.textContent = calculateWorkCost(
    numSubIntegration,
    shan.high
  );

  ivSessionAdmin.textContent = numIVSession * iv.subsequent;
  ivSessionValue.textContent = numIVSession;
  ivIntegrationValue.textContent = numIVSession;
  ivSessionLow.textContent = calculateWorkCost(numIVSession, shan.low);
  ivSessionHigh.textContent = calculateWorkCost(numIVSession, shan.high);
  ivIntegrationLow.textContent = calculateWorkCost(numIVIntegration, shan.low);
  ivIntegrationHigh.textContent = calculateWorkCost(
    numIVIntegration,
    shan.high
  );

  imSessionSlider;

  calculateTotalCost();
});
