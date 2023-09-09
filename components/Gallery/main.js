import { MOCK_CARDS } from './constants';
import './styles.css';

// Setup

const mainElement = document.querySelector('#gallery-container');

const getModalTemplate = () => `
  <div id="rtc-modal" class="rtc-modal">
    <div class="modal-header">
      <h2 id="modal-title"></h2>
      <button id="modal-close">✖️</button>
    </div>
    <div class="modal-body"></div>
  </div>
`;

const getContainerTemplate = () => `
  <div id="rtc-gallery" class="rtc-gallery">
  </div>
`;

mainElement.innerHTML += getContainerTemplate();
mainElement.innerHTML += getModalTemplate();

// Logic

const modalElement = document.querySelector('.rtc-modal');
const modalTitle = document.querySelector('#modal-title');
const modalBody = document.querySelector('.modal-body');
const galleryElement = document.querySelector('#rtc-gallery');

let currentCard;

const setupStars = (score) => {

  if (!score) {
    return `<p class="no-rating">No ratings</p>`;
  }

  let starContainer = [];

  for (let i = 1; i <= score; i++) {
    starContainer.push(`<span class="star">⭐️</span>`);
  }

  return starContainer.join(' ');
};

const getCardTemplate = (card) => `
  <div class="card" role="button" id="${card._id}">
    <h3>${card.name}</h3>
    <div class="image-container">
      <img src="${card.logo}" alt="${card.name}" />
    </div>
    <div class="score-container">${setupStars(Math.round(card.score))}</div>
  </div>
`;

const setupCards = () => {
  MOCK_CARDS.forEach((card) => {
    const template = getCardTemplate(card);
    galleryElement.innerHTML += template;
  });
};

const getModalBodyTemplate = (cardData) => {
  if (cardData.reviews === 0) {
    return `
      <img src="${cardData.logo}" alt="${cardData.name}" />
      <div class="review-container">
        ${setupStars(Math.round(cardData.score))}
      </div>
    `;
  } else {
    return `
      <img src="${cardData.logo}" alt="${cardData.name}" />
      <h3>Valoración de ${cardData.score.toFixed(2)} con ${cardData.reviews} reviews</h3>
      <div class="review-container">
        ${setupStars(Math.round(cardData.score))}
      </div>
    `;
  }
};

const setupModalData = (cardData) => {
  currentCard = cardData;
  modalTitle.innerText = cardData.name;
  modalBody.innerHTML = getModalBodyTemplate(cardData);
};

const handleOpenModal = (event) => {
  const cardId = event.target.id;
  const cardData = MOCK_CARDS.find((card) => card._id === cardId);
  setupModalData(cardData);
  modalElement.style.display = 'block';
};

const addEventListenersToCards = () => {
  const cards = document.querySelectorAll('#rtc-gallery .card');
  cards.forEach((card) => card.addEventListener('click', handleOpenModal));
};

const handleCloseModal = () => {
  modalElement.style.display = 'none';
};

const addModalListeners = () => {
  const closeButton = document.querySelector('#rtc-modal #modal-close');
  closeButton.addEventListener('click', handleCloseModal)
};

setupCards();
addEventListenersToCards();
addModalListeners();