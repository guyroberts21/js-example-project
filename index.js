const createCalculator = () => ({
	display: '0',
	num1: '',
	num2: '',
	hasInputNum1: false,
	operator: null,
});

let calculator = createCalculator();

// DOM Elements
const display = document.querySelector('.calculator-display');
const numberBtns = document.querySelectorAll('.calculator-keys .number');
const opBtns = document.querySelectorAll('.calculator-keys .operator');

const plus = (a, b) => a + b;
const minus = (a, b) => a - b;
const times = (a, b) => a * b;
const divide = (a, b) => a / b;

function operate(a, b, operator) {
	a = parseInt(a);
	b = parseInt(b);

	if (operator === 'plus') return a + b;
	if (operator === 'minus') return a - b;
	if (operator === 'times') return a * b;
	if (operator === 'divide') return a / b;
}

function formatNum(n) {
	// always return to 2d.p.
	return (Math.round(n * 100) / 100).toFixed(1);
}

function inputNumber(e) {
	const num = e.target.textContent;

	if (num === 'AC') {
		calculator = createCalculator();
	} else {
		if (!calculator.hasInputNum1) {
			calculator.num1 += num;
			calculator.display = calculator.num1;
		} else {
			calculator.num2 += num;
			calculator.display = calculator.num2;
		}
	}

	// Update display
	display.textContent = calculator.display;
}

function inputOperator(e) {
	if (e.target.value === 'equals') {
		calculate(calculator);
		return;
	}

	let { num1, operator } = calculator;
	if (!num1) return false;

	if (operator) {
		calculate(calculator);
	}

	let op = e.target.value;
	calculator.operator = op;

	calculator.hasInputNum1 = true;
}

function calculate(c) {
	if (!c.num2) return false;

	const result = operate(c.num1, c.num2, c.operator);

	calculator.num1 = result;
	calculator.num2 = '';

	display.textContent = formatNum(result);
}

// Event listeners
numberBtns.forEach((num) => num.addEventListener('click', inputNumber));
opBtns.forEach((op) => op.addEventListener('click', inputOperator));
