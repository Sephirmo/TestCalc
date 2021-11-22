let runningTotal = 0;
let buffer = "0";
let previousOperator = null;
const screen = document.querySelector(".screen");

//Esto nos brinda un evento que escucha a la clase buttons de nuestro html.
document.querySelector(".buttons").addEventListener("click", function (event) {
  clicBoton(event.target.innerText);
  console.log(event.target, event.target.innerText); // con esto veo el valor del campo completo, y ademas tambien el nuemro digitado. el innerText
});

function clicBoton(valor) {
  if (isNaN(parseInt(valor))) {
    //aqui lo que hicimos fue si no es un entero, entonces es un operador como +-*/
    controlOperador(valor);
  } else {
    controlNumero(valor);
  }
  renderizar();
}

function controlOperador(valor) {
  switch (valor) {
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
    case "<-":
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;
    default:
      controlMath(valor);
      break;
  }
}

function controlNumero(valor) {
  if (buffer === "0") {
    buffer = valor;
  } else {
    buffer += valor;
  }
}

function controlMath(valor) {
  const intBuffer = parseInt(buffer);
  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    flushOperation(intBuffer);
  }
  previousOperator = valor;
  buffer = "0";
}

function flushOperation(intBuffer) {
  if (previousOperator === "+") {
    runningTotal += intBuffer;
  } else if (previousOperator === "-") {
    runningTotal -= intBuffer;
  } else if (previousOperator === "*") {
    runningTotal *= intBuffer;
  } else {
    runningTotal /= intBuffer;
  }
}

function renderizar() {
  screen.innerText = buffer;
}
