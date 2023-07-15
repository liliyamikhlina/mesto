export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._popupCloseButton = this._popup.querySelector('.popup__close-button');
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        this._popup.classList.add('popup_active');
        document.addEventListener('keyup', this._handleEscClose);
    };

    close() {
        this._popup.classList.remove('popup_active');
        document.removeEventListener('keyup', this._handleEscClose);
    };

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    };

    setEventListeners() {
        this._popupCloseButton.addEventListener('click', () => this.close());
        this._popup.addEventListener('click', (evt) => {
            if (evt.target === evt.currentTarget) {
                this.close();
            }
        });
    };
}
