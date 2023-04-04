const popupsCloseButtonsSelector = '.popup__close-button';
const popupActiveClass = 'popup_active';

const popupProfile = document.querySelector('#popup-profile');
const popupContainer = document.querySelector('.popup__container');
const cardsSection = document.querySelector('.elements');

const profile = document.querySelector('.profile');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupProfileCloseButton = popupProfile.querySelector(popupsCloseButtonsSelector);
const profileAddButton = document.querySelector('.profile__add-button');
const profileFormElement = popupProfile.querySelector('.popup__form');

const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const nameProfile = document.querySelector('.profile__name');
const aboutProfile = document.querySelector('.profile__job');

const popupCard = document.querySelector('#popup-card');
const popupCardCloseButton = popupCard.querySelector(popupsCloseButtonsSelector);

const placeInput = document.querySelector('.popup__input_type_place');
const linkInput = document.querySelector('.popup__input_type_link');
const cardTemplate = document.querySelector('.cards');
const card = document.querySelector('.cards');
const cardFormElement = popupCard.querySelector('.popup__form');

const popupPhoto = document.querySelector('#popup-photo');
const popupPhotoCloseButton = popupPhoto.querySelector(popupsCloseButtonsSelector);
const popupPhotoImg = popupPhoto.querySelector('.popup__image');
const popupPhotoText = popupPhoto.querySelector('.popup__photo-text');

profileFormElement.addEventListener('submit', handleProfileFormSubmit);
cardFormElement.addEventListener('submit', handleCardFormSubmit);

profileEditButton.addEventListener('click', popupProfileOpen);
profileAddButton.addEventListener('click', popupCardOpen);

popupCardCloseButton.addEventListener('click', popupCardClose);
popupProfileCloseButton.addEventListener('click', popupProfileClose);
popupPhotoCloseButton.addEventListener('click', closePopupPhoto);


function init() {
    initialCards.forEach(function (item) {
        const title = item.name;
        const link = item.link;
        const node = createCard(title, link);
        cardsSection.appendChild(node);
    });
}

function popupProfileOpen() {
    openPopup(popupProfile);
    nameInput.value = nameProfile.textContent;
    jobInput.value = aboutProfile.textContent;
}


function popupProfileClose() {
    closePopup(popupProfile)
}


function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    const name = nameInput.value;
    const aboutProfile = jobInput.value;

    if (!name || !aboutProfile) {
        return;
    }

    nameProfile.textContent = name;
    aboutProfile.textContent = aboutProfile;

    popupProfileClose()
}

function handleCardFormSubmit(evt) {
    evt.preventDefault();
    const place = placeInput.value;
    const link = linkInput.value;
    
    if (!place || !link) {
        return;
    }

    const newCard = createCard(place, link);
    cardsSection.insertBefore(newCard, cardsSection.firstChild)
    popupCardClose();
}


function popupCardOpen() {
    openPopup(popupCard);
}


function popupCardClose() {
    closePopup(popupCard)
}

function likeCard(event) {
    event.target.classList.toggle('card__like_active');
}   

function deleteCard(event) {
    event.target.parentNode.remove();
}

function createCard(name, link) {
    const newCard = card.content.cloneNode(true);
    const cardImage = newCard.querySelector('.card__image');
    const likeButton = newCard.querySelector('.card__like');
    const cardTitle = newCard.querySelector('.card__title');
    const cardTrash = newCard.querySelector('.card__trash');

    cardImage.src = link;
    cardImage.alt = name;
    cardTitle.textContent = name;

    likeButton.addEventListener('click', likeCard);
    cardTrash.addEventListener('click', deleteCard);
    cardImage.addEventListener('click', openPopupPhoto);
    return newCard;
};

function renderCard(data, cardsContainer) {
    const cardElement = createCard(data);
    cardsContainer.prepend(cardElement);
}

function submitForm() {
    evt.preventDefault();
    renderCard();
} 

function openPopupPhoto(event) {
    openPopup(popupPhoto);
    popupPhotoImg.src = event.target.src;
    popupPhotoText.textContent = event.target.alt;
}

function closePopupPhoto() {
    closePopup(popupPhoto);
}

function closePopup(el) {
    el.classList.remove(popupActiveClass)
}

function openPopup(el) {
    el.classList.add(popupActiveClass);
}

init();