export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._popupCloseButton = this._popup.querySelector('.popup__close-button');
        this._popupBg = this._popup.parentElement;
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        this._popupBg.classList.add('popup_active');
        document.addEventListener('keyup', this._handleEscClose);
    };

    close() {
        this._popupBg.classList.remove('popup_active');
        document.removeEventListener('keyup', this._handleEscClose);
    };

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    };

    setEventListeners() {
        this._popupCloseButton.addEventListener('click', () => this.close());
        this._popupBg.addEventListener('click', (event) => {
            if (event.target === event.currentTarget) {
                this.close();
            }
        });
    };
}
