export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

export const popupProfile = document.querySelector('#popup-profile');
export const popupCard = document.querySelector('#popup-card');
export const popupAvatar = document.querySelector('#popup-avatar');

export const profileEditButton = document.querySelector('.profile__edit-button');
export const profileAddButton = document.querySelector('.profile__add-button');
export const profileAvatarButton = document.querySelector('.profile__avatar-button');

export const nameInput = document.querySelector('#input-name');
export const jobInput = document.querySelector('#input-job');