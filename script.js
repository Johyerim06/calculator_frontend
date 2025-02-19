let firstNumber = "";
let secondNumber = "";
let operator = "";

function appendNumber(num) {
    const display = document.getElementById("display");
    if (operator === "") {
        firstNumber += num;
        display.innerText = firstNumber;
    } else {
        secondNumber += num;
        display.innerText = secondNumber;
    }
}

function setOperator(op) {
    if (firstNumber === "") return;
    operator = op;
}

function clearDisplay() {
    firstNumber = "";
    secondNumber = "";
    operator = "";
    document.getElementById("display").innerText = "0";
}

function clearEntry() {
    if (operator === "") {
        firstNumber = "";
        document.getElementById("display").innerText = "0";
    } else {
        secondNumber = "";
        document.getElementById("display").innerText = "0";
    }
}

function deleteLast() {
    const display = document.getElementById("display");
    if (operator === "") {
        firstNumber = firstNumber.slice(0, -1);
        display.innerText = firstNumber || "0";
    } else {
        secondNumber = secondNumber.slice(0, -1);
        display.innerText = secondNumber || "0";
    }
}

function calculateResult() {
    if (firstNumber === "" || secondNumber === "" || operator === "") return;

    // `+` 연산자는 URL에서 공백으로 변환되므로 `%2B`로 변경
    let encodedOperator = operator === "+" ? "%2B" : operator;

    fetch(`http://ec2-15-164-99-155.ap-northeast-2.compute.amazonaws.com:8083/calculate?num1=${firstNumber}&num2=${secondNumber}&op=${encodedOperator}`)

        .then(response => response.text())
        .then(data => {
            document.getElementById("display").innerText = data;
            firstNumber = data;
            secondNumber = "";
            operator = "";
        })
        .catch(error => console.error("Error:", error));
}
