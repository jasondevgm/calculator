// Access the custom API exposed by the window object
const win = window?.myApi;

// Select DOM elements for window control buttons
const closeButton = document.querySelector('.button.close');
const minimizeButton = document.querySelector('.button.minimize');
const maximizeButton = document.querySelector('.button.maximize');

// Select other DOM elements
const parentEl = document.getElementById('parentEL');
const sideBar = document.getElementById('side-bar');
const outSol = document.getElementById('solution-output');
const out = document.getElementById('current-output');

// Track whether the window is maximized
let isWindowMaximazed = false;

// Add event listeners for window control buttons
closeButton.addEventListener('click', () => {
    win.close();
});

minimizeButton.addEventListener('click', () => {
    win.minimize();
});

maximizeButton.addEventListener('click', () => {
    isWindowMaximazed = !isWindowMaximazed;
    isWindowMaximazed ? win.maximize() : win.unMaximize();
});

// Object to store the current calculation state
const currentCalc = {
    firstNumber: "",
    secondNumber: "",
    operator: "",
    result: 0
};

// Flags for sign and decimal point handling
let sign = true;
let isDecimal = true;

// Sidebar toggle state
let sideBarToggle = true;

// Accumulated number for input
let accumulatedNumber = "";

// Function to handle number button presses
function pressNumber(number) {
    if (number !== 0 || accumulatedNumber.length !== 0) {
        let updatedNumber = accumulatedNumber += number;
        out.innerText = updatedNumber;
    }
}

// Function to clear all inputs and reset the calculator
function delInput() {
    out.style.removeProperty("font-size");
    currentCalc.firstNumber = "";
    currentCalc.secondNumber = "";
    currentCalc.operator = "";
    currentCalc.result = 0;
    accumulatedNumber = "";
    out.innerText = 0;
    outSol.innerText = "";
    sideBarToggle = true;
    isDecimal = true;
    sign = true;
}

// Function to toggle the sign of the current number
function toggleSign() {
    let updatedNumber;
    if (out.innerText != 0) {
        if (sign) {
            updatedNumber = accumulatedNumber.split("");
            updatedNumber.unshift("-");
            accumulatedNumber = updatedNumber.join("");
            out.innerText = accumulatedNumber;
            sign = false;
        } else {
            updatedNumber = accumulatedNumber.split("");
            updatedNumber.shift();
            accumulatedNumber = updatedNumber.join("");
            out.innerText = accumulatedNumber;
            sign = true;
        }
    }
}

// Function to add a decimal point to the current number
function decimal() {
    if (isDecimal) {
        accumulatedNumber = out.innerText += ".";
        out.innerText = accumulatedNumber;
        isDecimal = false;
    }
}

// Function to display an error message and disable buttons temporarily
async function showError(message) {
    out.style.setProperty("font-size", "25px");
    out.style.setProperty("text-align", "end");
    out.innerText = message;
    const buttonElements = document.querySelectorAll("button");
    buttonElements.forEach(element => element.setAttribute("disabled", "true"));

    setTimeout(() => {
        delInput();
        buttonElements.forEach(element => element.removeAttribute("disabled"));
    }, 3000);
}

// Function to save the current calculation to memory
function saveData() {
    if (currentCalc.result === 0) {
        showError("No hi ha res a guardar."); // "There is nothing to save."
    } else {
        win.saveDataInMemory(currentCalc).then(() => {
            if (!sideBarToggle) {
                sideBarToggle = true;
                while (sideBar.hasChildNodes()) {
                    sideBar.removeChild(sideBar.firstChild);
                }
            }
            showData();
        });
    }
}

// Function to retrieve saved data from memory
async function getData() {
    return await win.getDataFromMemory()
        .then(value => {
            if (value?.message) {
                return value;
            } else {
                return JSON.parse(value?.content);
            }
        });
}

// Function to display saved data in the sidebar
async function showData() {
    sideBarToggle = !sideBarToggle;
    if (sideBarToggle) {
        sideBar.style.setProperty("display", "none", "important");
        while (sideBar.hasChildNodes()) {
            sideBar.removeChild(sideBar.firstChild);
        }
    } else {
        const data = await getData();
        if (data?.message) {
            showError(data?.message);
        } else {
            sideBar.style.setProperty("display", "block", "important");
            sideBar.style.setProperty("rigth", "0px");
            sideBar.style.setProperty("text-align", "end");
            data.reverse();
            for (let index = 0; index < data.length; index++) {
                const divContainer = document.createElement("div");
                const d = data[index];
                const formEquation = document.createTextNode(d?.firstNumber + " " + d?.operator + " " + d?.secondNumber + " =");
                const fromResult = document.createTextNode(d?.result);

                const divEquation = document.createElement("div");
                const divresult = document.createElement("div");

                divContainer.style.setProperty("margin-top", "15px");
                divContainer.style.setProperty("padding", "10px");
                divEquation.style.setProperty("text-align", "end");
                divresult.style.setProperty("font-size", "40px");

                divEquation.appendChild(formEquation);
                divresult.appendChild(fromResult);

                divContainer.appendChild(divEquation);
                divContainer.appendChild(divresult);

                divContainer.addEventListener('click', () => {
                    outSol.innerText = "";
                    out.innerText = d?.result;
                    accumulatedNumber = d?.result.toString();
                    if (accumulatedNumber[0] === "-") {
                        sign = false;
                    } else {
                        sign = true;
                    }
                });
                sideBar.append(divContainer);
            }
        }
    }
}

// Function to remove trailing zeros and unnecessary decimal points
function removeDotAndZeros(inputString) {
    if (!inputString.includes('.') || !/(\.\d*?)0*$/.test(inputString)) {
        return inputString;
    }
    let trimmedString = inputString.replace(/(\.\d*?)0*$/, "$1");
    if (trimmedString.endsWith(".")) {
        trimmedString = trimmedString.slice(0, -1);
    }
    return trimmedString;
}

// Function to handle operator button presses
function operator(operator) {
    if (accumulatedNumber.length != 0) {
        currentCalc.operator = operator;
        currentCalc.firstNumber = removeDotAndZeros(accumulatedNumber);
        outSol.innerText = currentCalc.firstNumber + " " + currentCalc.operator;
        out.innerText = 0;
        isDecimal = true;
        sign = true;
        accumulatedNumber = "";
    }
}

// Function to perform the calculation based on the selected operator
function performCalculation() {
    if (currentCalc.firstNumber.length != 0) {
        if (accumulatedNumber === "") {
            currentCalc.secondNumber = "0";
        } else {
            currentCalc.secondNumber = removeDotAndZeros(accumulatedNumber);
        }
        outSol.innerText = currentCalc.firstNumber + " " + currentCalc.operator + " " + currentCalc.secondNumber;
        accumulatedNumber = "";
        switch (currentCalc.operator) {
            case "+":
                win.add(currentCalc.firstNumber, currentCalc.secondNumber).then(value => {
                    const valueToString = removeDotAndZeros(value.toString());
                    out.innerText = valueToString;
                    accumulatedNumber = valueToString === "0" ? "" : valueToString;
                    currentCalc.result = value;
                }).catch(error => {
                    showError(error);
                });
                break;
            case "-":
                win.subtract(currentCalc.firstNumber, currentCalc.secondNumber).then(value => {
                    const valueToString = removeDotAndZeros(value.toString());
                    out.innerText = valueToString;
                    accumulatedNumber = valueToString === "0" ? "" : valueToString;
                    currentCalc.result = value;
                }).catch(error => {
                    showError(error);
                });
                break;
            case "*":
                win.multiply(currentCalc.firstNumber, currentCalc.secondNumber).then(value => {
                    const valueToString = removeDotAndZeros(value.toString());
                    out.innerText = valueToString;
                    accumulatedNumber = valueToString === "0" ? "" : valueToString;
                    currentCalc.result = value;
                }).catch(error => {
                    showError(error);
                });
                break;
            case "/":
                win.divide(currentCalc.firstNumber, currentCalc.secondNumber).then(value => {
                    const valueToString = removeDotAndZeros(value.toString());
                    out.innerText = valueToString;
                    accumulatedNumber = valueToString === "0" ? "" : valueToString;
                    currentCalc.result = value;
                }).catch(error => {
                    showError(error.message.split(':').pop()?.trim());
                });
                break;
            default:
                out.innerText = "Something went wrong";
                break;
        }
    }
}