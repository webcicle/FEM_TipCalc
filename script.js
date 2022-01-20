const inputs = [...document.querySelectorAll('[type="number"]')];
const peopleAmount = document.querySelector('[name="peopleAmount"]');
const billAmount = document.querySelector('[name="billAmount"]');

const tipBtns = [...document.querySelectorAll('[data-tipValue]')];
const resetBtn = document.querySelector('[data-resetBtn]');
const printAmount = document.querySelector('[data-printAmount]');
const printTotal = document.querySelector('[data-printTotal]');

const init = () => {
	inputs.forEach((input) => {
		input.value = '';
	});
	resetTipBtns();
	tipBtns[0].dataset.selected = true;
	setupTipBtns();
	setupAmountTotal();

	inputs.forEach((input) => {
		input.addEventListener(
			'keyup',
			() => {
				validateInputs();
				calculateTipAndTotal();
			},
			{ once: false }
		);
	});

	resetBtn.addEventListener('click', init);
};

window.addEventListener('DOMContentLoaded', init);

const validateInputs = () => {
	inputs.forEach((input) => {
		if (
			typeof parseInt(input.value) == 'number' ||
			parseInt(input.value) == 'NaN'
		) {
			return;
		} else {
			prompt('Please enter only numbers');
			input.removeEventListener('keyup', validateInputs);
			console.log('ERROOORRRR');
		}
	});
};

let tipOut;
let totalOut;

const calculateTipAndTotal = () => {
	const bill = parseInt(billAmount.value) || 0;
	const people = parseInt(peopleAmount.value) || 1;
	let tip = [];
	tipBtns.forEach((btn) => {
		if (btn.dataset.selected == 'true') {
			tip.push(parseInt(btn.dataset.tipvalue));
		} else {
			return;
		}
	});
	tip = tip / 100;
	tipOut = ((bill * tip) / people).toFixed(2);
	totalOut = bill / people + parseInt(tipOut);
	totalOut = totalOut.toFixed(2);
	printAmount.textContent = `$${tipOut}`;
	printTotal.textContent = `$${totalOut}`;
};

const prompt = () => {};

const setupTipBtns = () => {
	tipBtns.forEach((btn) => {
		btn.addEventListener('click', () => {
			if (btn.dataset.selected == 'false') {
				resetTipBtns();
				btn.setAttribute('data-selected', true);
				calculateTipAndTotal();
			}
		});
		if (btn.dataset.customtipbtn) {
			btn.classList.add('hide');
			inputs[1].classList.remove('hide');
		}
	});
};

const resetTipBtns = () => {
	tipBtns.forEach((btn) => {
		btn.setAttribute('data-selected', false);
	});
};

const setupAmountTotal = () => {
	printAmount.textContent = `$0.00`;
	printTotal.textContent = `$0.00`;
};

resetBtn.removeEventListener('click', init);
