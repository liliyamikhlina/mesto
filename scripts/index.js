let popup = document.querySelector('.popup');
let popupContainer = popup.querySelector('.popup__container');
let profile = document.querySelector('.profile');
let profileEditButton = profile.querySelector('.profile__edit-button');
let popupCloseButton =  popup.querySelector('.popup__close-button');

function popupOpen() {
    popup.classList.add('popup_active');
    nameInput.setAttribute('value', nameProfile.textContent);
    jobInput.setAttribute('value', aboutProfile.textContent);
}

profileEditButton.addEventListener('click', popupOpen);


function popupClose() {
    popup.classList.remove('popup_active');
}

popupCloseButton.addEventListener('click', popupClose);

let formElement =  popup.querySelector('.popup__form');
let nameInput = popup.querySelector('.popup__input_name');
let jobInput = popup.querySelector('.popup__input_job');
let nameProfile = profile.querySelector('.profile__name');
let aboutProfile = profile.querySelector('.profile__job');

function handleFormSubmit(evt) {
    evt.preventDefault();
    nameProfile.textContent = nameInput.value;
    aboutProfile.textContent = jobInput.value;
    popupClose()
}

formElement.addEventListener('submit', handleFormSubmit);