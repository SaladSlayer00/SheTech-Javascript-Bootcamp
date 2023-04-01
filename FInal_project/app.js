let runningTotal = 0;
let buffer = "0";
let previousOperator = null;
let decimal = 0;
const screen = document.querySelector(".screen");

function buttonClick(value) {
  if (isNaN(value)) {
    handleSymbol(value);
  }else{
    handleNumber(value);
  }
  screen.innerText = buffer;
}



function handleSymbol(symbol) {
  switch (symbol) {
    case "C":
      buffer = "0";
      runningTotal = 0;
      previousOperator = null;
      break;
    case "=":
      if (previousOperator === null) {
        return;
      }
      flushOperation(parseInt(buffer));
      previousOperator = null;
      buffer = "" + runningTotal;
      runningTotal = 0;
      break;
    case "←":
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.toString().substring(0, buffer.length - 1);
      }
      break;
    case '.':
        decimal = 1;
        break;
    case "+":
    case "-":
    case "×":
    case "÷":
      handleMath(symbol);
      break;
      case 'sqrt':
        buffer = Math.sqrt(buffer).toFixed(2);
        break;
    case '^2':
        buffer = (buffer**2).toFixed(2);
        break;
    case 'help':
        let answer = prompt('Do you need help?');
        if(answer == 'yes'){
            alert('Select the operators to perform mathematical manipulations of the data. \n Press C to reset the input. \n Press \'help\' to see this menu again')
        }
        break;
  }
}

function handleMath(symbol) {
  if (buffer === "0" || decimal) {
    return;
  }
  const intBuffer = parseFloat(buffer);
  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else if(symbol =='='){
    flushOperation(intBuffer);
  }
  previousOperator = symbol;
  buffer = "0";
}

function flushOperation(intBuffer) {
    const floatBuffer = parseFloat(buffer);
    if (previousOperator === "+") {
      runningTotal += floatBuffer;
    } else if (previousOperator === "-") {
      runningTotal -= floatBuffer;
    } else if (previousOperator === "×") {
      runningTotal *= floatBuffer;
    } else if (previousOperator === "÷") {
      runningTotal /= floatBuffer;
    }
  }
  
  function handleNumber(numberString) {
    if (buffer === "0") {
      buffer = numberString;
    } else if (decimal > 0) {
      handleDec(numberString);
      decimal = 0; // reset decimal after handling it
    } else {
      buffer += numberString;
    }
  }

function handleDec(numberString){
    buffer = buffer + '.' + numberString;
    decimal = 0;
}

function init() {
  document
    .querySelector(".calc-buttons")
    .addEventListener("click", function (event) {
      buttonClick(event.target.innerText);
    });
}

init();