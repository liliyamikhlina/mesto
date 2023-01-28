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


