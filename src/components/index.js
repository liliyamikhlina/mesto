import '../pages/index.css';
import Card from './Card.js';
import { initialCards, validationConfig, popupsCloseButtonsSelector } from '../utils/constants.js';
import Section from './Section';
import FormValidator from './FormValidator.js';
import PopupWithImage from './PopupWithImage';
import PopupWithForm from './PopupWithForm';

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

const allPopups = document.querySelectorAll('.popup');

profileFormElement.addEventListener('submit', handleProfileFormSubmit);
cardFormElement.addEventListener('submit', handleCardFormSubmit);

profileEditButton.addEventListener('click', openPopupProfile);
profileAddButton.addEventListener('click', openPopupCard);

popupCardCloseButton.addEventListener('click', closePopupCard);
popupProfileCloseButton.addEventListener('click', closePopupProfile);

allPopups.forEach((popupContainer) => {
    popupContainer.addEventListener('mousedown', function (evt) {
        if (evt.target !== evt.currentTarget) return;
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
    popupProfileFormValidator.disableSaveButton();
}

function createCard(item) {
    const card = new Card(item, '.cards', openPopupPhoto);
    const cardElement = card.generateCard();
    cardsSection.prepend(cardElement);
}

function handleCardFormSubmit(evt) {
    evt.preventDefault();
    const item = {
        name: placeInput.value,
        link: linkInput.value,
    };
    createCard(item);
    closePopupCard();
    evt.target.reset();
    popupCardFormValidator.toggleButtonState();
}

function openPopupCard() {
    openPopup(popupCard);
}

function closePopupCard() {
    closePopup(popupCard)
}

function openPopupPhoto(name, link) {
    popupWithPhoto.open(name, link);
}

function handleEscape(evt) {
    if (evt.key === 'Escape') {
        const popupActive = document.querySelector('.popup_active');
        closePopup(popupActive);
    }
}

const popupProfileFormValidator = new FormValidator(validationConfig, popupProfile)
popupProfileFormValidator.enableValidation();

const popupCardFormValidator = new FormValidator(validationConfig, popupCard)
popupCardFormValidator.enableValidation();

const newSection = new Section({
    items: initialCards, renderer: (item) => {
        const cardElement = createCard(item);
        newSection.addItem(cardElement);
    }
}, '.elements');

newSection.render();

const popupWithPhoto = new PopupWithImage('.popup__photo-container');
popupWithPhoto.setEventListeners();

const popupWithCard = new PopupWithForm('.popup__card-container', (formValues) => {
    handleCardFormSubmit
});

const popupWithProfile = new PopupWithForm('.popup__profile-container', (formValues) => {
    handleProfileFormSubmit
});
