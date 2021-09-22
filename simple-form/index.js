console.log('Hello World')

const outputHeading = document.getElementById('outputHeading');
const submitButton = document.getElementById('cmdSetAge');

function foo(e) {
    // Prevent the form from actually submitting
    e.preventDefault();

    const name = document.forms['user']['name'].value;
    const age = document.forms['user']['age'].value;

    outputHeading.innerHTML = "Your name is " + name + ", you are " + age + " years old";
}

submitButton.addEventListener('click', foo);

