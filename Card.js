export default class Card {
    constructor(data, handleCardClick) {
        const link = data.link;
        const name = data.name;
        this._link = link;
        this._name = name;
        this._handleCardClick = handleCardClick;
    }

    _initCardInfo() {
        this._image = this._element.querySelector('.card__image');
        this._likeButton = this._element.querySelector('.card__like');
        this._cardTrash = this._element.querySelector('.card__trash');
        this._element.querySelector('.card__title').textContent = this._name;
        this._image.src = this._link;
        this._image.alt = this._name;
    }
    
    _getTemplate() {
        const cardElement = document.querySelector('.cards').content.querySelector('.card').cloneNode(true);
        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._initCardInfo();
        this._setEventListeners();
        return this._element;
    }

    _handleLike = () => {
        this._likeButton.classList.toggle('card__like_active');
    }

    _deleteCard  = () => {
        this._element.remove();
    }


    _setEventListeners() {
        this._likeButton.addEventListener('click', this._handleLike);
        this._cardTrash.addEventListener('click', this._deleteCard);
        this._image.addEventListener('click', this._handleCardClick);
    }

    _createCard() {
        _setEventListeners();
        return newCard;
    };


}