import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._formElement = this._popup.querySelector('.popup__form');
    this._inputList = this._formElement.querySelectorAll('.popup__input');
    this._submitButton = this._formElement.querySelector('.popup__submit-button');
  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  _handleFormSubmit(evt) {
    evt.preventDefault();
    const formValues = this._getInputValues();
    this._submitCallback(formValues);
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', this._handleFormSubmit.bind(this));
  }

  close() {
    super.close();
    this._formElement.reset();
  }

  setLoading() {
    this._submitButton.textContent = 'Сохранение...';
  }

  unsetLoading() {
    this._submitButton.textContent = 'Сохранить';
  }
}
