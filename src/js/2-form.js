'use strict'

const KEY_FORM = 'feedback-form-state';
const formData = {
    email: "",
    message: ""
}

readLocalStorage(formData);

const form = document.querySelector(".feedback-form");

form.elements.email.value = formData.email;
form.elements.message.value = formData.message;

form.addEventListener("input", handleInput);
form.addEventListener("submit", handleSubmit);

function readLocalStorage(data) {
    const storageData = localStorage.getItem(KEY_FORM);
    if (!storageData) {
        return;
    }
    try {
        const parseData = JSON.parse(storageData);
        data.email = parseData.email ?? "";
        data.message = parseData.message ?? "";
    } catch (error) {
        console.log(error);
    }
}

function handleInput(event) {
    if (event.target.name === "email" || event.target.name === "message") {
        formData[event.target.name] = event.target.value;
        localStorage.setItem(KEY_FORM, JSON.stringify(formData));
    }
}

function handleSubmit(event) {
    event.preventDefault();
    formData.email = event.target.elements.email.value.trim();
    formData.message = event.target.elements.message.value.trim();

    if (formData.email.length === 0 || formData.message.length === 0) {
        alert("Fill please all fields");
        return;
    }

    console.log(formData);
    localStorage.removeItem(KEY_FORM);
    
    event.target.reset();
}
