console.log('Hello World')

const outputHeading = document.getElementById('result');
const submitButton = document.getElementById('cmdMultiply');

function multiply(e) {
    // Prevent the form from actually submitting
    e.preventDefault();

    const number1 = document.forms['maths']['number1'].value;
    const number2 = document.forms['maths']['number2'].value;
    const multiplied = number1 * number2;

    outputHeading.innerHTML = number1 + " x " + number2 + " = " + multiplied;
}

submitButton.addEventListener('click', multiply);

