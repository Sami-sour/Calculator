const Btn = document.querySelectorAll(".button");

const displayBtn = document.getElementById("display-btn");

const clearBtn = document.getElementById("clear");

const deleteSingleValue = document.getElementById("del-single-value");

const calculate = document.getElementById("calculate");

const operators = document.querySelectorAll(".operator");

let numbers = "";

Btn.forEach((buttons) => {
  buttons.addEventListener("click", () => {
    if (numbers.length < 25) {
      numbers += buttons.textContent;
      displayBtn.value = numbers;
    }
  });
});

clearBtn.addEventListener("click", () => {
  numbers = "";
  displayBtn.value = numbers;
});

deleteSingleValue.addEventListener("click", () => {
  numbers = numbers.slice(0, -2);
  displayBtn.value = numbers;
});

operators.forEach((operator) => {
  operator.addEventListener("click", () => {
    const opChar = operator.textContent;

    if (numbers === "") {
      if (opChar === "-") {
        numbers = "-";
        displayBtn.value = numbers;
      }
      return;
    }

    if (numbers === "-" && opChar !== "-") {
      return;
    }

    numbers = numbers.replace(/[+\-x÷%]+$/g, "");

    if (numbers === "") {
      if (opChar === "-") {
        numbers = "-";
      } else {
        return;
      }
    } else {
      numbers += opChar;
    }

    if (displayBtn.value === "") {
      operator.innerHTML = trim();
    }

    displayBtn.value = numbers;
  });
});

calculate.addEventListener("click", () => {
  try {
    let expression = numbers.replace(/%/g, "/100");
    const tokens = expression.match(/[0-9.]+|[+\-x÷]/g);
    if (!tokens) {
      displayBtn.value = "Error";
      return;
    }
    const step1 = [];
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      if (token === "x" || token === "÷") {
        const prev = Number(step1.pop());
        const next = Number(tokens[++i]);
        const res = token === "x" ? prev * next : prev / next;
        step1.push(res);
      } else {
        step1.push(token);
      }
    }

    let result = Number(step1[0]);
    for (let i = 1; i < step1.length; i += 2) {
      const operator = step1[i];
      const next = Number(step1[i + 1]);
      if (operator === "+") result += next;
      if (operator === "-") result -= next;
    }
    displayBtn.value = result;
    numbers = result.toString();
  } catch (error) {
    displayBtn.value = "Error";
  }
});
