const classAndSelector = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(classAndSelector.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(classAndSelector.errorClass);
};

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(classAndSelector.inputErrorClass); 
  errorElement.classList.remove(classAndSelector.errorClass);
  errorElement.textContent = ' ';
};

function isValid(formElement, inputElement) {
  if (!inputElement.validity.valid) {
  showInputError(formElement, inputElement, inputElement.validationMessage);
} else {
  hideInputError(formElement, inputElement);
} 
};

function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(classAndSelector.inputSelector));
  const buttonElement = formElement.querySelector(classAndSelector.submitButtonSelector);

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}; 

function enableValidation() {
  const formList = Array.from(document.querySelectorAll(classAndSelector.formSelector));
  formList.forEach((formElement) => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });
    setEventListeners(formElement);
});
}

enableValidation(classAndSelector);

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

function toggleButtonState (inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(classAndSelector.inactiveButtonClass);
    buttonElement.setAttribute('disabled', '');
  } else {
    buttonElement.classList.remove(classAndSelector.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
};