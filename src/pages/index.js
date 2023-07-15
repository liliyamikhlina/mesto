import '../pages/index.css';
import Card from '../components/Card.js';
import { initialCards, validationConfig } from '../utils/constants.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const popupProfile = document.querySelector('#popup-profile');
const cardsSection = document.querySelector('.elements');

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

const nameInput = document.querySelector('#input-name');
const jobInput = document.querySelector('#input-job');
const placeInput = document.querySelector('#input-place'); 
const linkInput = document.querySelector('#input-link'); 


const popupCard = document.querySelector('#popup-card');

profileEditButton.addEventListener('click', openPopupProfile);
profileAddButton.addEventListener('click', openPopupCard);

const userInfo = new UserInfo('.profile__name', '.profile__job');

const newSection = new Section({
    items: initialCards,
    renderer: (item) => {
        createCard(item);
    },
}, '.elements');

newSection.render();

function openPopupProfile() {
    popupWithProfile.open();
    const newUserInfo = userInfo.getUserInfo();
    nameInput.value = newUserInfo.name;
    jobInput.value = newUserInfo.about;
}

function openPopupCard() {
    popupWithCard.open();
    popupCardFormValidator.disableSaveButton();
}

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
    newSection.addItem(cardElement);
}

function handleCardFormSubmit(formValues) {
    const { place, link } = formValues;
    createCard({ name: place, link });
    popupWithCard.close();
}

    const popupProfileFormValidator = new FormValidator(validationConfig, popupProfile);
    popupProfileFormValidator.enableValidation();

    const popupCardFormValidator = new FormValidator(validationConfig, popupCard);
    popupCardFormValidator.enableValidation();

    const popupWithPhoto = new PopupWithImage('#popup-photo');
    popupWithPhoto.setEventListeners();

    const popupWithCard = new PopupWithForm('#popup-card', handleCardFormSubmit);
    popupWithCard.setEventListeners();

    const popupWithProfile = new PopupWithForm('#popup-profile', handleProfileFormSubmit);
    popupWithProfile.setEventListeners();
