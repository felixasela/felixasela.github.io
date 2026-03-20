const scriptURL = 'https://script.google.com/macros/s/AKfycbyxq7UyNtPbZdqAijVV5Yo1fVmQgyLLTU4KpyhmwStZkmsa2jAEGkXe7i2k5PMmzPAN/exec';
const form = document.querySelector('#contactForm');
const submitBtn = document.querySelector('.submit-btn');
const successMessage = document.querySelector('.success-message');

form.addEventListener('submit', e => {
    e.preventDefault();
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    fetch(scriptURL, { 
        method: 'POST', 
        body: new FormData(form),
        mode: 'no-cors' // Google Apps Script requires no-cors for simple POST to work without CORS header
    })
    .then(response => {
        successMessage.classList.add('visible');
        form.reset();
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            successMessage.classList.remove('visible');
        }, 5000);
    })
    .catch(error => {
        console.error('Error!', error.message);
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        alert('Hubo un error al enviar el formulario. Por favor, intenta de nuevo.');
    });
});
