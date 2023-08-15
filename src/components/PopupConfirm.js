import Popup from './Popup.js';

export default class PopupConfirm extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._submitButton = this._popup.querySelector('.popup__submit-button');
    }

    setConfirmCallback(confirmCallback) {
        this._confirmCallback = confirmCallback;
    }

    _handleConfirm() {
        if (this._confirmCallback) {
            this._confirmCallback();
        }
    }

    setEventListeners() {
        super.setEventListeners();
        this._submitButton.addEventListener('click', (evt) => {
            evt.preventDefault();
            this._handleConfirm()
        });
    }
}