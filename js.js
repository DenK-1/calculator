let divDigits = document.getElementById("digits")
let screen = document.body.querySelector("#screen span")

for (let i = 0; i < 12; i++) {
    divDigits.insertAdjacentHTML("afterbegin", `<div id=digit data-digit data-val=${i - 2}><span>${i - 2}</span></div>`)
}

let digit = document.body.querySelectorAll("#digit")
digit.forEach((val) => {
    val.addEventListener("click", preOperate)
})

let num1 = null;
let operator = null;
let num2 = null;
let equalPressed = null;
let pressedOper = null;

function preOperate(event) {
    //C
    if (this.hasAttribute("data-cancel")) {
        num1 = null, operator = null, num2 = null, equalPressed = null
        if (pressedOper) pressedOper.classList.remove
        screen.innerText = 0
    }

    //equal
    if (equalPressed && this.hasAttribute("data-digit")) {
        equalPressed = false
        num1 = null, operator = null, num2 = null
    }
    if (this.hasAttribute("data-equal") && num1 != null && num2 != null && operator != null) {
        equal(num1, operator, num2, event)
        equalPressed = true
    }

    //num1
    if (this.hasAttribute("data-digit") && operator == null) {
        if (pressedOper) pressedOper.classList.remove("pressedOper")
        if (num1 != null) {
            num1 += this.dataset.val
            screen.innerText = num1
        } else {
            num1 = this.dataset.val
            screen.innerText = num1
        }
    }

    //num2
    if (this.hasAttribute("data-digit") && num1 != null && operator != null) {
        pressedOper.classList.remove("pressedOper")
        if (num2 != null) {
            num2 += this.dataset.val
            screen.innerText = num2
        } else {
            num2 = this.dataset.val
            screen.innerText = num2
        }

    }

    //operator
    if (this.hasAttribute("data-oper") && num1 != null && num2 == null) {
        if (pressedOper) pressedOper.classList.remove("pressedOper")
        this.classList.add("pressedOper")
        pressedOper = this

        operator = this.dataset.val
        equalPressed = false
    }

    //operator+calculate
    if (this.hasAttribute("data-oper") && num1 != null && num2 != null && operator != null) {
        if (pressedOper) pressedOper.classList.remove("pressedOper")
        this.classList.add("pressedOper")
        pressedOper = this
        equal(num1, operator, num2, event)
    }
}

function equal(n1, op, n2, e) {
    let calculate = operate(n1, op, n2)
    num1 = calculate
    operator = e.currentTarget.dataset.val
    num2 = null
    screen.innerText = num1
}

function operate(n1, op1, n2) {
    if (op1 == "/") {
        return divide(n1, n2)
    }
    if (op1 == "*") {
        return multiply(n1, n2)
    }
    if (op1 == "-") {
        return minus(n1, n2)
    }
    if (op1 == "+") {
        return plus(n1, n2)
    }
}

function multiply(a, b) {
    let num = Number(a) * Number(b)
    return Number(num.toFixed(1))
}

function divide(a, b) {
    if (Number(b) == 0) {
        alert("OOPS")
        return a
    }
    let num = Number(a) / Number(b)
    return Number(num.toFixed(1))
}

function minus(a, b) {
    return Number(a) - Number(b)
}

function plus(a, b) {
    return Number(a) + Number(b)
}
