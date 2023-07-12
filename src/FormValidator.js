export default class FormValidator {
  constructor(data, form) {
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._form = form;
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`); //Ищем элемент ошибки по id инпута
    inputElement.classList.add(this._inputErrorClass); //Добавляем инпуту класс ошибки
    errorElement.textContent = errorMessage; //Делаем текстовое содержание элемента ошибки сообщением об ошибке
    errorElement.classList.add(this._errorClass); //Добовляем элементу ошибки класс ошибки
  };

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`); // Ищем элемент ошибки по id инпута
    inputElement.classList.remove(this._inputErrorClass); //Убираем у инпута класс ошибки
    errorElement.classList.remove(this._errorClass); //Убираем у элемента ошибки класс ошибки
    errorElement.textContent = ' '; //Убираем текст ошибки
  };

  _isValid(inputElement) {
    if (!inputElement.validity.valid) { // Если данные в инпуте не отвечают условиям валидации 
      this._showInputError(inputElement, inputElement.validationMessage); // Показываем сообщение об ошибке
    } else {
      this._hideInputError(inputElement); // В ином случае прячем сообщение об ошибке 
    }
  };

  _setEventListeners() {
    this._form.addEventListener('submit', (evt) => { //Убираем для сабмита формы дефолтное поведение
      evt.preventDefault();
    });
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector)); //Делаем массив из массивопод. объекта инпутов (для метода some)
    this._buttonElement = this._form.querySelector(this._submitButtonSelector); // Ищем кнопку сабмита через селектор
    this.toggleButtonState(); // Добавляем переключение состояния кнопки сабмита

    this._inputList.forEach((inputElement) => { // Проходимся по инпутам в массиве 
      inputElement.addEventListener('input', () => { //Добавляем каждому проверку на валидность и переключение состояния кнопки
        this._isValid(inputElement);
        this.toggleButtonState();
      });
    });
  };

  enableValidation() {
    this._setEventListeners(); //Добавляем слушатели событий
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => { //Проверяем массив инпутов на соответствие правилам валидации
      return !inputElement.validity.valid; //Показывает, есть ли невалидный элемент инпута
    })
  };

  disableSaveButton() {
    this._buttonElement.classList.add(this._inactiveButtonClass); //Добавляем кнопке класс неактивной
    this._buttonElement.setAttribute('disabled', ''); // Добавляем кнопке атрибут выключенной
  }

  toggleButtonState() {
    if (this._hasInvalidInput()) { //Если есть невалидный инпут 
      this.disableSaveButton();
    } else { //В ином случае 
      this._buttonElement.classList.remove(this._inactiveButtonClass); //Убираем кнопке класс неактивной (делаем активной)
      this._buttonElement.removeAttribute('disabled'); //Убираем атрибут выключенной (включаем)
    }
  };
}