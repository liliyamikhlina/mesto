import '../pages/index.css';
import Card from '../components/Card.js';
import { validationConfig, popupProfile, popupCard, popupAvatar, profileEditButton, profileAddButton, profileAvatarButton, nameInput, jobInput } from '../utils/constants.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import API from '../components/API.js';
import PopupConfirm from '../components/PopupConfirm.js';

const popupWithPhoto = new PopupWithImage('#popup-photo');
const popupWithCard = new PopupWithForm('#popup-card', handleCardFormSubmit);
const popupWithProfile = new PopupWithForm('#popup-profile', handleProfileFormSubmit);
const popupWithAvatar = new PopupWithForm('#popup-avatar', handleAvatarFormSubmit);
const popupConfirm = new PopupConfirm('#popup-confirm');

const popupProfileFormValidator = new FormValidator(validationConfig, popupProfile);
const popupCardFormValidator = new FormValidator(validationConfig, popupCard);
const popupAvatarFormValidator = new FormValidator(validationConfig, popupAvatar);

let userId;

const api = new API({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-71',
    headers: {
        authorization: '9c1cf152-056e-4431-8276-6546daba52e3',
        'Content-Type': 'application/json'
    }
});

const userInfo = new UserInfo('.profile__name', '.profile__job', '.profile__avatar');
const cardsSection = new Section({
    renderer: (item) => {
        const card = createCard(item);
        const cardElement = card.generateCard();
        cardsSection.appendItem(cardElement);
    }
}, '.elements');

function openPopupProfile() {
    popupWithProfile.open();
    popupProfileFormValidator.disableSaveButton();
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
    popupAvatarFormValidator.disableSaveButton();
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
                        card.setLikesCount(res.likes);
                        card.setLikeClass();
                    })
                    .catch((err) => console.log(err));
            },
            dislike: (id) => {
                api.dislikeCard(id)
                    .then((res) => {
                        card.setLikesCount(res.likes);
                        card.removeLikeClass();
                    })
                    .catch((err) => console.log(err));
            },
            deleteCard: (id) => {
                popupConfirm.setConfirmCallback(() => {
                    api.deleteCard(id)
                        .then(() => {
                            popupConfirm.close();
                            card.delete();
                        })
                        .catch((err) => console.log(err));
                });
                popupConfirm.open();
            }
        }
    );
    return card;
}

function handleCardFormSubmit(data) {
    popupWithCard.setLoading();
    const { place, link } = data;
    api.addCard({ name: place, link })
        .then((newCardData) => {
            const newCard = createCard(newCardData);
            const newCardElement = newCard.generateCard();
            cardsSection.prependItem(newCardElement);
            popupWithCard.close();
        })
        .catch((err) => console.log(err))
        .finally(() => popupWithCard.unsetLoading());
}

function handleAvatarFormSubmit(data) {
    popupWithAvatar.setLoading();
    api.changeAvatar(data)
        .then((res) => {
            userInfo.setUserAvatar(res.avatar);
            popupWithAvatar.close();
        })
        .catch((err) => console.log(err))
        .finally(() => popupWithAvatar.unsetLoading());
}

function handleProfileFormSubmit(formValues) {
    popupWithProfile.setLoading();
    const { name, job } = formValues;
    api.editProfile({ name, job })
        .then(() => {
            userInfo.setUserInfo({ name, job });
            popupWithProfile.close();
        })
        .catch((err) => console.log(err))
        .finally(() => {
            popupWithProfile.unsetLoading();
        });
}

Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, initialCards]) => {
        userInfo.setUserInfo({ name: userData.name, job: userData.about, avatar: userData.avatar });
        userInfo.setUserAvatar(userData.avatar);
        userId = userData._id;
        cardsSection.render(initialCards);
    })
    .catch((err) => console.log(err));

popupProfileFormValidator.enableValidation();
popupCardFormValidator.enableValidation();
popupAvatarFormValidator.enableValidation();

profileEditButton.addEventListener('click', openPopupProfile);
profileAddButton.addEventListener('click', openPopupCard);
profileAvatarButton.addEventListener('click', openPopupAvatar);
popupWithPhoto.setEventListeners();
popupWithCard.setEventListeners();
popupWithProfile.setEventListeners();
popupWithAvatar.setEventListeners();
popupConfirm.setEventListeners();