const formElement = document.querySelector('.popup__form');
const formInput = formElement.querySelector('.popup__input');

const classAndSelector = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

function showInputError(input) {
  input.classList.add('popup__input_type_error'); 
};

function hideInputError(input) {;
  input.classList.remove('popup__input_type_error'); 
};

function checkInputValidity() {
  if (!formInput.validity.valid) {
  showInputError(formInput);
} else {
  hideInputError(formInput);
} 
};

function enableValidation() {};

formElement.addEventListener('submit', function (evt) {
  evt.preventDefault();
});

formInput.addEventListener('input', function () {
  checkInputValidity();
});