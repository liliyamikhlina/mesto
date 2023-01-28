let popup = document.querySelector('.popup');
let popupContainer = popup.querySelector('.popup__container');
let profile = document.querySelector('.profile');
let profileEditButton = profile.querySelector('.profile__edit-button');
let popupCloseButton =  popup.querySelector('.popup__close-button');

function popupOpen() {
    popup.classList.add('popup_active');
}

profileEditButton.addEventListener('click', popupOpen);


function popupClose() {
    popup.classList.remove('popup_active');
}

popupCloseButton.addEventListener('click', popupClose);

let formElement =  popup.querySelector('.popup__form');
let nameInput = popup.querySelector('.popup__input_name');
let aboutInput = popup.querySelector('.popup__input_job');
let nameProfile = profile.querySelector('.profile__name');
let aboutProfile = profile.querySelector('.profile__job');

function handleFormSubmit(evt) {
    evt.preventDefault();
    nameProfile.textContent = `${nameInput.value}`;
    aboutProfile.textContent = `${aboutInput.value}`;
    popupClose()
}

formElement.addEventListener('submit', handleFormSubmit);