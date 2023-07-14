import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, formSubmit) {
        super(popupSelector);
        this._popupForm = this._popup.querySelector('.popup__form');
        this._formSubmit = formSubmit;
    }

    _getInputValues() {
        const inputList = Array.from(this._popupForm.querySelectorAll('.popup__input'));
        const formValues = {};
        inputList.forEach((input) => {
            formValues[input.name] = input.value;
          });
          return formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._formSubmit(this._getInputValues());
        });
    }

    close() {
        super.close();
        this._popupForm.reset();
    }
}

