import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this.popupImage = this._popup.querySelector('.popup__image');
        this.popupText = this._popup.querySelector('.popup__photo-text');
    }

    open(name, link) {
        super.open();
        this.popupImage.alt = name;
        this.popupImage.src = link;
        this.popupText.textContent = name;
    }
}

  