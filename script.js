const form = document.getElementById("contactForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const messageInput = document.getElementById("message");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const phoneError = document.getElementById("phoneError");
const messageError = document.getElementById("messageError");
const formStatus = document.getElementById("formStatus");

function clearError(input, errorEl) {
    errorEl.textContent = "";
    input.classList.remove("is-invalid");
    input.removeAttribute("aria-invalid");
}

function setError(input, errorEl, msg) {
    errorEl.textContent = msg;
    input.classList.add("is-invalid");
    input.setAttribute("aria-invalid", "true");
}

function validateName() {
    const value = nameInput.value.trim();
    const nameRegex = /^[A-Za-z]+(?: [A-Za-z]+)*$/;

    if (value.length === 0) {
        setError(nameInput, nameError, "Name is required.");
        return false;
    }
    if (!nameRegex.test(value)) {
        setError(nameInput, nameError, "Name must contain only English letters (A–Z) and spaces.");
        return false;
    }
    return true;
}

function validateEmail() {
    const value = emailInput.value.trim();
    if (value.length === 0) {
        setError(emailInput, emailError, "Email is required.");
        return false;
    }
    if (!emailInput.checkValidity()) {
        setError(emailInput, emailError, "Enter a valid email address.");
        return false;
    }
    return true;
}

function validatePhone() {
    const value = phoneInput.value.trim();
    if (value.length === 0) return true;

    const phoneRegex = /^\d+$/;
    if (!phoneRegex.test(value)) {
        setError(phoneInput, phoneError, "Phone number must be numbers only (no dashes or parentheses).");
        return false;
    }
    return true;
}

function validateMessage() {
    const value = messageInput.value.trim();
    if (value.length === 0) {
        setError(messageInput, messageError, "Message is required.");
        return false;
    }

    if (value.length <= 10 || value.length >= 250) {
        setError(messageInput, messageError, "Message must be 11–249 characters.");
        return false;
    }
    return true;
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    formStatus.textContent = "";
    
    clearError(nameInput, nameError);
    clearError(emailInput, emailError);
    clearError(phoneInput, phoneError);
    clearError(messageInput, messageError);
    
    const okName = validateName();
    const okEmail = validateEmail();
    const okPhone = validatePhone();
    const okMsg = validateMessage();

    if (!okName) return nameInput.focus();
    if (!okEmail) return emailInput.focus();
    if (!okPhone) return phoneInput.focus();
    if (!okMsg) return messageInput.focus();

    formStatus.textContent = "Form is valid.";
    form.reset();
});
