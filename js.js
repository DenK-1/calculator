let divDigits = document.getElementById("digits")
let screen = document.body.querySelector("#screen span")
for (let i = 0; i < 12; i++) {
    divDigits.insertAdjacentHTML("afterbegin", `<div id=digit data-digit data-val=${i - 2}><span>${i - 2}</span></div>`)
}
let digit = document.body.querySelectorAll("#digit")

digit.forEach((val) => {
    val.addEventListener("click", preOperate)
})
let num1 = null, operator = null, num2 = null

function preOperate(event) {
    if (num1 == null && operator == null && num2 == null) screen.innerText = ""
    if (this.hasAttribute("data-cancel")) {
        num1 = null, operator = null, num2 = null
        screen.innerText = 0
    }
    //num1
    if (this.hasAttribute("data-digit") && operator == null) {
        console.log("num1")
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
        console.log("num2")
        if (num2 != null) {
            num2 += this.dataset.val
            screen.innerText = num2
        } else {
            num2 = this.dataset.val
            screen.innerText = num2
        }

    }
    //operator
    if (!this.hasAttribute("data-digit") && num1 != null && num2 == null) {
        console.log("operator")
        operator = this.dataset.val
    }
    //operator+calculate

    if (!this.hasAttribute("data-digit") && num1 != null && num2 != null && operator != null && operator != "=") {
        console.log("operator+calc")
        equal(num1, operator, num2, event)
    }
    console.log(`${num1} ${operator} ${num2}`)
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
    return Number(a) * Number(b)
}
function divide(a, b) {
    if (Number(b) == 0) {
        alert("OOPS")
        return a
    }
    return Number(a) / Number(b)
}
function minus(a, b) {
    return Number(a) - Number(b)
}
function plus(a, b) {
    return Number(a) + Number(b)
}
