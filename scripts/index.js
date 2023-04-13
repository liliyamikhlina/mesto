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

const nameInput = document.querySelector('#input-name');
const jobInput = document.querySelector('#input-job');
const nameProfile = document.querySelector('.profile__name');
const aboutProfile = document.querySelector('.profile__job');

const popupCard = document.querySelector('#popup-card');
const popupCardCloseButton = popupCard.querySelector(popupsCloseButtonsSelector);

const placeInput = document.querySelector('#input-place');
const linkInput = document.querySelector('#input-link');
const cardTemplate = document.querySelector('.cards');
const card = document.querySelector('.cards');
const cardFormElement = popupCard.querySelector('.popup__form');

const popupPhoto = document.querySelector('#popup-photo');
const popupPhotoCloseButton = popupPhoto.querySelector(popupsCloseButtonsSelector);
const popupPhotoImg = popupPhoto.querySelector('.popup__image');
const popupPhotoText = popupPhoto.querySelector('.popup__photo-text');

const popupsAll = Array.from(document.querySelectorAll('.popup'));

profileFormElement.addEventListener('submit', handleProfileFormSubmit);
cardFormElement.addEventListener('submit', handleCardFormSubmit);

profileEditButton.addEventListener('click', openPopupProfile);
profileAddButton.addEventListener('click', openPopupCard);

popupCardCloseButton.addEventListener('click', closePopupCard);
popupProfileCloseButton.addEventListener('click', closePopupProfile);
popupPhotoCloseButton.addEventListener('click', closePopupPhoto);

popupsAll.forEach((popupContainer) => {
    popupContainer.addEventListener('click', function (evt) {
        if(evt.target !== evt.currentTarget) return;
        closePopup(evt.target);
    });
});

document.addEventListener('click', escapePopup);

function closePopup(el) {
    el.classList.remove(popupActiveClass);
}

function openPopup(el) {
    el.classList.add(popupActiveClass);
}

function openPopupProfile() {
    openPopup(popupProfile);
    nameInput.value = nameProfile.textContent;
    jobInput.value = aboutProfile.textContent;
}

function closePopupProfile() {
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
    closePopupProfile();
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
    closePopupCard();
    evt.target.reset();
}

function openPopupCard() {
    openPopup(popupCard);
}

function closePopupCard() {
    closePopup(popupCard)
}

function likeCard(evt) {
    evt.target.classList.toggle('card__like_active');
}   

function deleteCard(evt) {
    evt.target.parentNode.remove();
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

function submitCreateCardForm() {
    evt.preventDefault();
    renderCard();
} 

function openPopupPhoto(evt) {
    openPopup(popupPhoto);
    popupPhotoImg.src = evt.target.src;
    popupPhotoImg.alt = evt.target.alt;
    popupPhotoText.textContent = evt.target.alt;
}

function closePopupPhoto() {
    closePopup(popupPhoto);
}

initialCards.forEach(function (item) {
    const title = item.name;
    const link = item.link;
    const node = createCard(title, link);
    cardsSection.appendChild(node);
});


function escapePopup (evt) {
    if (evt.key === 'Escape') {
        const popupActive = document.querySelector('.popup_active');
        closePopup(popupActive);
    }
  }

