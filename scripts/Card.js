export default class Card {
    constructor(data, templateSelector, handleCardClick) {
        this._link = data.link;
        this._name = data.name;
        this._handleCardClick = handleCardClick;
        this._templateSelector = templateSelector;
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
        this._element = this._getTemplate(); // Клонируем содержимое элемента .card
        this._initCardInfo(); // Заполняем свойства экземпляра (класса Card)
        this._setEventListeners(); // Устанавливем слушатели событий
        return this._element; // Возвращаем новый элемент
    }

    _handleLike = () => {
        this._likeButton.classList.toggle('card__like_active'); // Переключаес класс
    }

    _deleteCard  = () => {
        this._element.remove(); // Удаляем элемент .card (принадлеж. текущему экземпляру)
    }


    _setEventListeners() {
        this._likeButton.addEventListener('click', this._handleLike); //  При нажатии кнопки лайка переключается класс
        this._cardTrash.addEventListener('click', this._deleteCard); // При нажатии кнопки trash удаляется элемент .card (принадлеж. текущему экземпляру)
        this._image.addEventListener('click', () => this._handleCardClick(this._name, this._link)); 
    }

}