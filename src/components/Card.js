export default class Card {
  constructor(data, templateSelector, userId, handleCardClick, { like, dislike, deleteCard }) {
    this._data = data;
    this._link = data.link;
    this._name = data.name;
    this._likes = data.likes;
    this._cardId = data._id;
    this._userId = userId;
    this._handleCardClick = handleCardClick;
    this._templateSelector = templateSelector;

    this._ownerId = data.owner?._id || null;
    this._like = like;
    this._dislike = dislike;
    this._deleteCard = deleteCard;


    if (this._likes) {
      this._isLiked = this._likes.some(el => el._id === this._userId);
    }

  }

  _initCardInfo() {
    this._image = this._element.querySelector('.card__image');
    this._likeButton = this._element.querySelector('.card__like');
    this._likeCounter = this._element.querySelector('.card__like-counter');
    this._cardTrash = this._element.querySelector('.card__trash');
    this._element.querySelector('.card__title').textContent = this._name;
    this._image.src = this._link;
    this._image.alt = this._name;

    if (this._isLiked) {
      this.setLikeClass();
    }

    this.setLikesCount(this._likes);
    this._checkDeleteButtonVisibility();
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._initCardInfo();
    this._setEventListeners();
    return this._element;
  }

  setLikeClass() {
    this._likeButton.classList.add('card__like_active');
  }

  removeLikeClass() {
    this._likeButton.classList.remove('card__like_active');
  }

  delete = () => {
    this._element.remove();
    this._element = null;
  }

  _handleLikeCard() {
    if (this._likeButton.classList.contains('card__like_active')) {
      this._dislike(this._cardId);
    } else {
      this._like(this._cardId);
    }
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleLikeCard();
    });
    this._cardTrash.addEventListener('click', () => {
      this._deleteCard(this._cardId)
    });
    this._image.addEventListener('click', () =>
      this._handleCardClick(this._name, this._link)
    );
  }

  setLikesCount(likes) {
    this._likes = likes;
    if (Array.isArray(this._likes)) {
      this._likeCounter.textContent = this._likes.length;
    } else {
      this._likeCounter.textContent = '0';
    }
  }

  _checkDeleteButtonVisibility() {
    if (this._ownerId === this._userId) {
      this._cardTrash.style.display = 'block';
    } else {
      this._cardTrash.style.display = 'none';
    }
  }

}