import '../pages/index.css';
import Card from '../components/Card.js';
import { validationConfig } from '../utils/constants.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import API from '../components/API.js';
import PopupConfirm from '../components/PopupConfirm.js';

const popupProfile = document.querySelector('#popup-profile');
const popupCard = document.querySelector('#popup-card');
const popupAvatar = document.querySelector('#popup-avatar');

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const profileAvatarButton = document.querySelector('.profile__avatar-button');

const nameInput = document.querySelector('#input-name');
const jobInput = document.querySelector('#input-job');

profileEditButton.addEventListener('click', openPopupProfile);
profileAddButton.addEventListener('click', openPopupCard);
profileAvatarButton.addEventListener('click', openPopupAvatar);

const api = new API({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-71',
    headers: {
        authorization: '9c1cf152-056e-4431-8276-6546daba52e3',
        'Content-Type': 'application/json'
    }
});

const userInfo = new UserInfo('.profile__name', '.profile__job', '.profile__avatar');
const newSection = new Section({
    renderer: (item) => {
        createCard(item);
    }
}, '.elements');

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

function openPopupAvatar() {
    popupWithAvatar.open();
}

function handleProfileFormSubmit(formValues) {
    const { name, job } = formValues;
    userInfo.setUserInfo({ name, job });
    api.editProfile({ name, job });
    popupWithProfile.close();
}

function createCard(item) {
    const card = new Card(
        item,
        '.cards',
        userId,
        openPopupPhoto,
        {
            like: (id) => {
                api.likeCard(id)
                    .then((res) => {
                        card.getLikesCount(res);
                        card.like();
                    })
                    .catch((err) => console.log(err))
            },
            dislike: (id) => {
                api.dislikeCard(id)
                    .then((res) => {
                        card.getLikesCount(res);
                        card.dislike();
                    })
                    .catch((err) => console.log(err))
            },
            deleteCard: (id) => {
                popupConfirm.setConfirmCallback(() => {
                    api.deleteCard(id)
                        .then(() => {
                            popupConfirm.close();
                            card.delete();
                        })
                        .catch((err) => console.log(err))
                });
                popupConfirm.open();
            }
        }
    );

    const cardElement = card.generateCard();
    newSection.addItem(cardElement);
}

function handleCardFormSubmit(data) {
    popupWithCard.setLoading();
    const { place, link } = data;
    api.addCard({ name: place, link })
        .then(() => {
            createCard({ name: place, link })
        });

    popupWithCard.close();
}

function handleAvatarFormSubmit(data) {
    
    popupWithAvatar.setLoading();
    api.changeAvatar(data)
        .then((res) => {
            userInfo.setUserAvatar(res);
            popupWithAvatar.close();
        })
        .catch((err) => console.log(err));
}

const popupProfileFormValidator = new FormValidator(validationConfig, popupProfile);
popupProfileFormValidator.enableValidation();

const popupCardFormValidator = new FormValidator(validationConfig, popupCard);
popupCardFormValidator.enableValidation();

const popupAvatarFormValidator = new FormValidator(validationConfig, popupAvatar);
popupAvatarFormValidator.enableValidation();

const popupWithPhoto = new PopupWithImage('#popup-photo');
popupWithPhoto.setEventListeners();

const popupWithCard = new PopupWithForm('#popup-card', handleCardFormSubmit);
popupWithCard.setEventListeners();

const popupWithProfile = new PopupWithForm('#popup-profile', handleProfileFormSubmit);
popupWithProfile.setEventListeners();

const popupWithAvatar = new PopupWithForm('#popup-avatar', handleAvatarFormSubmit);
popupWithAvatar.setEventListeners();

const popupConfirm = new PopupConfirm('#popup-confirm');
popupConfirm.setEventListeners();

let userId;
Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, initialCards]) => {
        userInfo.setUserInfo({ name: userData.name, job: userData.about });
        userInfo.setUserAvatar(userData.avatar);
        userId = userData._id;
        newSection.render(initialCards);
    })
    .catch((err) => console.log(err));
