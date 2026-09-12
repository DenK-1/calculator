for (let i = 0; i < 12; i++) {
    digits.insertAdjacentHTML("afterbegin", `<div id=digit><span>${i - 2}</span></div>`)
}
calcbodybottom.addEventListener("click", function (event) {
    if (!(event.target.id == "digit" || event.target.tagName == "SPAN")) return
    console.log(123)

})

/* 
принцип
срабатывае собтытие нажатия цифры
цифра записывается на экран

*/