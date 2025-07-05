const displayElement = document.getElementById("display");
const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const clearButton = document.getElementById("clear");
const deleteButton = document.getElementById("delete");
const equalsButton = document.getElementById("equals");

let currentInput = "";
let previousInput = "";
let operation = null;

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.dataset.number === "." && currentInput.includes(".")) return;
    currentInput = currentInput.toString() + button.dataset.number.toString();
    updateDisplay();
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (currentInput === "") return;
    if (previousInput !== "") calculate();
    operation = button.dataset.operator;
    previousInput = currentInput;
    currentInput = "";
  });
});

equalsButton.addEventListener("click", () => {
  if (currentInput === "" || previousInput === "") return;
  calculate();
  updateDisplay();
  operation = null;
});

clearButton.addEventListener("click", () => {
  currentInput = "";
  previousInput = "";
  operation = null;
  updateDisplay();
});

deleteButton.addEventListener("click", () => {
  currentInput = currentInput.toString().slice(0, -1);
  updateDisplay();
});

function calculate() {
  let result;
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);
  if (isNaN(prev) || isNaN(current)) return;
  switch (operation) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "*":
      result = prev * current;
      break;
    case "/":
      result = prev / current;
      break;
    default:
      return;
  }
  currentInput = result.toString();
  previousInput = "";
}

function updateDisplay() {
  displayElement.textContent = currentInput.toString() || "0";
}

// Keyboard support
document.addEventListener("keydown", (e) => {
  if ((e.key >= "0" && e.key <= "9") || e.key === ".") {
    document.querySelector(`[data-number="${e.key}"]`)?.click();
  } else if (["+", "-", "*", "/"].includes(e.key)) {
    document.querySelector(`[data-operator="${e.key}"]`)?.click();
  } else if (e.key === "Enter" || e.key === "=") {
    equalsButton.click();
  } else if (e.key === "Backspace") {
    deleteButton.click();
  } else if (e.key === "Escape") {
    clearButton.click();
  }
});
