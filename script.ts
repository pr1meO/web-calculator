type Operation = (val1: number, val2: number) => number
type Calculate = {
    val: number,
    op: string
}

const add: Operation = (val1: number, val2: number) => val1 + val2
const subtract: Operation = (val1: number, val2: number) => val1 - val2
const multiply: Operation = (val1: number, val2: number) => val1 * val2
const divide: Operation = (val1: number, val2: number) => val1 / val2
const nthRoot: Operation = (val1: number, val2: number) => val1 ** (1 / val2)
const pow: Operation = (val1: number, val2: number) => val1 ** val2

const updateDisplay = (val: string) => val
const appendDisplay = (val1: string, val2: string): string => val1 + val2

const doOperation = (
    val1: number,
    val2: number,
    op: Operation
): number => op(val1, val2)

const calculate = (op: string, val1: number, val2: number): number => {
    switch (op) {
        case "+":
            return doOperation(val1, val2, add)
        case "−":
            return doOperation(val1, val2, subtract)
        case "×":
            return doOperation(val1, val2, multiply)
        case "÷":
            return val2 !== 0 ? doOperation(val1, val2, divide) : NaN
        case "ⁿ√":
            return val2 !== 0 ? doOperation(val1, val2, nthRoot) : NaN
        case "∧":
            return doOperation(val1, val2, pow)
    }
}

const reset = (): Calculate => ({ val: 0, op: "" })
const setCalc = (calc: Calculate, newCalc: Partial<Calculate>): Calculate => ({
    ...calc,
    ...newCalc
})

let calc = reset()
const display = document.getElementById("display") as HTMLInputElement

const handleNumber = (
    display: HTMLInputElement,
    text: string
): void => {
    if (display.value == "0" || display.value == "NaN") {
        display.value = updateDisplay(text)
        return
    }

    display.value = appendDisplay(display.value, text)
}

const handleClear = (
    text: string,
    calc: Calculate
): void => {
    display.value = updateDisplay(text)
    calc = reset()
}

const handleOperation = (
    text: string,
    display: HTMLInputElement,
    clear: string = ""
): void => {
    if (calc.op) {
        calc = setCalc(
            calc,
            { op: text }
        )
        return
    }

    calc = setCalc(
        calc,
        {
            val: parseFloat(display.value),
            op: text
        })
    display.value = updateDisplay(clear)
}

const handleCalculate = (
    display: HTMLInputElement,
): void => {
    const result = calculate(
        calc.op,
        calc.val,
        parseFloat(display.value)
    )
    display.value = updateDisplay(result.toString())
    calc = setCalc(calc, { ...reset(), val: result })
}

document.getElementsByName("number")
    .forEach(b =>
        b.addEventListener(
            "click",
            () => handleNumber(display, b.textContent))
    )

document.getElementsByName("clear")
    .forEach(b =>
        b.addEventListener(
            "click",
            () => handleClear("0", calc))
    )

document.getElementsByName("op")
    .forEach(b =>
        b.addEventListener(
            "click",
            () => handleOperation(b.textContent, display))
    )

document.getElementsByName("calculate")
    .forEach(b =>
        b.addEventListener(
            "click",
            () => handleCalculate(display))
    )