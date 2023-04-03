const popupProfile = document.querySelector('#popup-profile'); 
const popupContainer = document.querySelector('.popup__container'); 
const profile = document.querySelector('.profile'); 
const profileEditButton = document.querySelector('.profile__edit-button'); 
const popupProfileCloseButton = popupProfile.querySelector('.popup__close-button'); 


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

const formElement =  document.querySelector('.popup__form'); 
const nameInput = document.querySelector('.popup__input_type_name'); 
const jobInput = document.querySelector('.popup__input_type_job'); 
const nameProfile = document.querySelector('.profile__name'); 
const aboutProfile = document.querySelector('.profile__job'); 
 

function handleFormSubmit(evt) { 
    evt.preventDefault(); 
    nameProfile.textContent = nameInput.value; 
    aboutProfile.textContent = jobInput.value; 
    popupProfileClose() 
} 

formElement.addEventListener('submit', handleFormSubmit); 

const popupCard = document.querySelector('#popup-card');
const popupCardCloseButton = popupCard.querySelector('.popup__close-button'); 
const profileAddButton = document.querySelector('.profile__add-button');
const placeInput = document.querySelector('.popup__input_type_place');
const linkInput = document.querySelector('.popup__input_type_link');

function popupCardOpen() { 
    popupCard.classList.add('popup_active');
} 

profileAddButton.addEventListener('click', popupCardOpen);

function popupCardClose() { 
    popupCard.classList.remove('popup_active');
} 

function likeCard() {
    likeButton.classList.toggle('card__like_active');
}

function deleteCard() {
    card.remove();
}

const cardTemplate = document.querySelector('.cards');

function createCard(data) {
    const card = document.querySelector('.card');
    const cardImage = card.querySelector('.card__image');
    const likeButton = card.querySelector('.card__like');
    const cardTitle = card.querySelector('.card__title');
    const cardTrash = card.querySelector('.card__trash');

    card.cloneNode(true);
    cardImage.src = data.link;
    cardImage.alt= data.name;
    cardTitle.textContent = data.name;

    likeButton.addEventListener('click', likeCard);
    cardTrash.addEventListener('click', deleteCard);
    return card;
};

function popupPhotoOpen(data) {
    cardImage.src = data;
}



function renderCard (data, cardsContainer) {
    const cardElement = createCard(data);
    // Помещаем ее в контейнер карточек
    cardsContainer.prepend(cardElement);
}

initialCards.forEach(function (item) {
    const title = item.name;
    const link = item.link;

    addPlace(title, link);
});

function submitForm() {
    evt.preventDefault();
    renderCard();

}