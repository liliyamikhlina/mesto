import '../pages/index.css';
import Card from './Card.js';
import { initialCards, validationConfig } from '../utils/constants.js';
import Section from './Section.js';
import FormValidator from './FormValidator.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';

const popupProfile = document.querySelector('#popup-profile');
const cardsSection = document.querySelector('.elements');

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const profileFormElement = document.forms['profile-form'];

const nameInput = document.querySelector('#input-name');
const jobInput = document.querySelector('#input-job');
const placeInput = document.querySelector('#input-place'); 
const linkInput = document.querySelector('#input-link'); 


const popupCard = document.querySelector('#popup-card');

const cardFormElement = document.forms['card-form'];

profileEditButton.addEventListener('click', openPopupProfile);
profileAddButton.addEventListener('click', openPopupCard);

const userInfo = new UserInfo('.profile__name', '.profile__job');

function openPopupProfile() {
    popupWithProfile.open();
    const newUserInfo = userInfo.getUserInfo();
    nameInput.value = newUserInfo.name;
    jobInput.value = newUserInfo.about;
}

function openPopupCard() {
    popupWithCard.open();
}4

function openPopupPhoto(name, link) {
    popupWithPhoto.open(name, link);
}

function handleProfileFormSubmit(formValues) {
    const { name, job } = formValues;
    userInfo.setUserInfo({ name, job });
    popupWithProfile.close();
}

function createCard(item) {
    const card = new Card(item, '.cards', openPopupPhoto);
    const cardElement = card.generateCard();
    cardsSection.prepend(cardElement);
}

function handleCardFormSubmit(formValues) {
    const { name, link } = formValues;
    const newItem = {
        name: placeInput.value,
        link: linkInput.value,
      };
    createCard(newItem);
    popupWithCard.close();
}

    const popupProfileFormValidator = new FormValidator(validationConfig, popupProfile);
    popupProfileFormValidator.enableValidation();

    const popupCardFormValidator = new FormValidator(validationConfig, popupCard);
    popupCardFormValidator.enableValidation();

    const newSection = new Section({
        items: initialCards,
        renderer: (item) => {
            createCard(item);
        },
    }, '.elements');

    newSection.render();

    const popupWithPhoto = new PopupWithImage('.popup__photo-container');
    popupWithPhoto.setEventListeners();

    const popupWithCard = new PopupWithForm('.popup__card-container', handleCardFormSubmit);
    popupWithCard.setEventListeners();

    const popupWithProfile = new PopupWithForm('.popup__profile-container', handleProfileFormSubmit);
    popupWithProfile.setEventListeners();
