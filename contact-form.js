const form_errors = [];

const form = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageTextarea = document.getElementById('message');
const errorsOutput = document.getElementById('errors');
const infoOutput = document.getElementById('info');
const charCounter = document.getElementById('char-counter');

const fieldPatterns = {
    name: /[A-Za-z\s\-'.]+/
};

function showTemporaryMessage(message, type = 'error', duration = 3000) {
    const output = type === 'error' ? errorsOutput : infoOutput;
    output.textContent = message;
    setTimeout(() => {
        output.textContent = '';
    }, duration);
}

function flashField(field) {
    field.classList.add('flash-error');
    setTimeout(() => {
        field.classList.remove('flash-error');
    }, 500);
}

function checkForInvalidCharacters(e, patternRegex, fieldName) {
    const char = e.data;
    if (char && !patternRegex.test(char)) {
        flashField(e.target);
        showTemporaryMessage(`Invalid character "${char}" entered in ${fieldName} field.`, 'error', 2000);
    }
}

nameInput.addEventListener('input', (e) => {
    checkForInvalidCharacters(e, fieldPatterns.name, 'Name');
});

function updateCharacterCounter() {
    const currentLength = messageTextarea.value.length;
    const maxLength = 1000;
    const remaining = maxLength - currentLength;

    charCounter.textContent = `${currentLength} / ${maxLength} characters`;

    charCounter.classList.remove('warning', 'danger');

    if (currentLength > maxLength) {
        charCounter.classList.add('danger');
    } else if (remaining <= 100) {
        charCounter.classList.add('warning');
    }
}

messageTextarea.addEventListener('input', updateCharacterCounter);

function setCustomValidationMessage(field, fieldName) {
    if (field.validity.valueMissing) {
        field.setCustomValidity(`${fieldName} is required.`);
    } else if (field.validity.typeMismatch) {
        field.setCustomValidity(`Please enter a valid ${fieldName.toLowerCase()}.`);
    } else if (field.validity.tooShort) {
        field.setCustomValidity(`${fieldName} is too short. Minimum ${field.minLength} characters.`);
    } else if (field.validity.tooLong) {
        field.setCustomValidity(`${fieldName} is too long. Maximum ${field.maxLength} characters.`);
    } else if (field.validity.patternMismatch) {
        field.setCustomValidity(`${fieldName} contains invalid characters.`);
    } else {
        field.setCustomValidity('');
    }
}

function validateField(field, fieldName) {
    setCustomValidationMessage(field, fieldName);
    return field.checkValidity();
}

[nameInput, emailInput, messageTextarea].forEach(field => {
    field.addEventListener('blur', () => {
        const fieldName = field.labels[0]?.textContent.replace(' *', '').trim() || field.name;
        validateField(field, fieldName);
    });

    field.addEventListener('input', () => {
        field.setCustomValidity('');
    });
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const fields = [
        { element: nameInput, name: 'Name' },
        { element: emailInput, name: 'Email' },
        { element: messageTextarea, name: 'Message' }
    ];

    let hasErrors = false;
    const currentErrors = [];

    fields.forEach(({ element, name }) => {
        const isValid = validateField(element, name);

        if (!isValid) {
            hasErrors = true;
            const errorDetail = {
                field: name,
                fieldId: element.id,
                value: element.value,
                error: element.validationMessage,
                timestamp: new Date().toISOString()
            };
            currentErrors.push(errorDetail);
            form_errors.push(errorDetail);
        }
    });

    if (messageTextarea.value.length > 1000) {
        hasErrors = true;
        const errorDetail = {
            field: 'Message',
            fieldId: messageTextarea.id,
            value: messageTextarea.value.substring(0, 50) + '...',
            error: 'Message exceeds maximum length of 1000 characters',
            timestamp: new Date().toISOString()
        };
        currentErrors.push(errorDetail);
        form_errors.push(errorDetail);
    }

    if (hasErrors) {
        const errorMessages = currentErrors.map(err => `${err.field}: ${err.error}`).join('; ');
        showTemporaryMessage(`Form has errors: ${errorMessages}`, 'error', 5000);
        return;
    }

    showTemporaryMessage('Message sent successfully!', 'info', 2000);

    setTimeout(() => {
        const hiddenInput = document.createElement('input');
        hiddenInput.type = 'hidden';
        hiddenInput.name = 'form-errors';
        hiddenInput.value = JSON.stringify(form_errors);
        form.appendChild(hiddenInput);

        form.submit();
    }, 2000);
});
