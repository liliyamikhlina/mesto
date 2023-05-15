import {initialCards} from './constants.js';
import Card from './card.js';
import FormValidator from './FormValidator.js';

const popupsCloseButtonsSelector = '.popup__close-button';

const popupProfile = document.querySelector('#popup-profile');
const popupContainer = document.querySelector('.popup__container');
const cardsSection = document.querySelector('.elements');

const profile = document.querySelector('.profile');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupProfileCloseButton = popupProfile.querySelector(popupsCloseButtonsSelector);
const profileAddButton = document.querySelector('.profile__add-button');
const profileFormElement = document.forms["profile-form"];

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
const cardFormElement = document.forms["card-form"];

const popupPhoto = document.querySelector('#popup-photo');
const popupPhotoCloseButton = popupPhoto.querySelector(popupsCloseButtonsSelector);
const popupPhotoImg = popupPhoto.querySelector('.popup__image');
const popupPhotoText = popupPhoto.querySelector('.popup__photo-text');

const allPopups = Array.from(document.querySelectorAll('.popup'));

profileFormElement.addEventListener('submit', handleProfileFormSubmit);
cardFormElement.addEventListener('submit', handleCardFormSubmit);

profileEditButton.addEventListener('click', openPopupProfile);
profileAddButton.addEventListener('click', openPopupCard);

popupCardCloseButton.addEventListener('click', closePopupCard);
popupProfileCloseButton.addEventListener('click', closePopupProfile);
popupPhotoCloseButton.addEventListener('click', closePopupPhoto);

allPopups.forEach((popupContainer) => {
    popupContainer.addEventListener('mousedown', function (evt) {
        if(evt.target !== evt.currentTarget) return;
        closePopup(evt.target);
    });
});

function openPopup(el) {
    el.classList.add('popup_active');
    document.addEventListener('keyup', handleEscape);
}

function closePopup(el) {
    el.classList.remove('popup_active');
    document.removeEventListener('keyup', handleEscape);
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
    const job = jobInput.value;
    nameProfile.textContent = name;
    aboutProfile.textContent = job;
    closePopupProfile();
    evt.target.reset();
}

function handleCardFormSubmit(evt) {
    evt.preventDefault();
    const place = placeInput.value;
    const link = linkInput.value;
    const newCard = createCard(place, link);
    const button = popupCard.querySelector('.popup__submit-button');
    cardsSection.insertBefore(newCard, cardsSection.firstChild);
    closePopupCard();
    evt.target.reset();
    button.classList.add('popup__submit-button_inactive');
    button.setAttribute('disabled', '');
}

function openPopupCard() {
    openPopup(popupCard);
}

function closePopupCard() {
    closePopup(popupCard)
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

initialCards.forEach(item => {
const card = new Card(item, openPopupPhoto);
const cardElement = card.generateCard();
cardsSection.append(cardElement);
});



function handleEscape(evt) {
    if (evt.key === 'Escape') {
        const popupActive = document.querySelector('.popup_active');
        closePopup(popupActive);
    }
}