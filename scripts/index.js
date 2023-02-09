let popupProfile = document.querySelector('#popup-profile'); 
let popupContainer = document.querySelector('.popup__container'); 
let profile = document.querySelector('.profile'); 
let profileEditButton = document.querySelector('.profile__edit-button'); 
let popupProfileCloseButton = popupProfile.querySelector('.popup__close-button'); 


function popupProfileOpen() { 
    popupProfile.classList.add('popup_active');
    nameInput.value = nameProfile.textContent;
    jobInput.value = aboutProfile.textContent;
} 

profileEditButton.addEventListener('click', popupProfileOpen); 

function popupProfileClose() { 
    popupProfile.classList.remove('popup_active'); 
} 

popupProfileCloseButton.addEventListener('click', popupProfileClose); 

let formElement =  document.querySelector('.popup__form'); 
let nameInput = document.querySelector('.popup__input_type_name'); 
let jobInput = document.querySelector('.popup__input_type_job'); 
let nameProfile = document.querySelector('.profile__name'); 
let aboutProfile = document.querySelector('.profile__job'); 
 

function handleFormSubmit(evt) { 
    evt.preventDefault(); 
    nameProfile.textContent = nameInput.value; 
    aboutProfile.textContent = jobInput.value; 
    popupProfileClose() 
} 

formElement.addEventListener('submit', handleFormSubmit); 

let popupCard = document.querySelector('#popup-card');
let popupCardCloseButton = popupCard.querySelector('.popup__close-button'); 
let profileAddButton = document.querySelector('.profile__add-button');
let placeInput = document.querySelector('.popup__input_type_place');
let linkInput = document.querySelector('.popup__input_type_link');

function popupCardOpen() { 
    popupCard.classList.add('popup_active');
} 

profileAddButton.addEventListener('click', popupCardOpen);

function popupCardClose() { 
    popupCard.classList.remove('popup_active');
} 

popupCardCloseButton.addEventListener('click', popupCardClose);