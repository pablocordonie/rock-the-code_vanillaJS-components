import './styles.css';
import { DOCUMENTATION } from './constants';

const favoritesListElement = document.querySelector('#menu-content > .favorites');
const inputSearch = document.querySelector('#menu-search');
const menuContentElement = document.querySelector('#menu-content');
const searchBlockElement = document.querySelector('.menu-content > .search');
const toggleButton = document.querySelector('#menu-toggle');

const getDocumentationTemplate = (title, url) => {
  return `
  <li class="favorite-element">
    <a href="${url}" target="__blank">${title}</a>
  </li>
  `;
};

const generateList = (listId, elements) => {
  const ulElement = document.createElement('ul');
  ulElement.id = listId;

  elements.forEach((element) => {
    const docTemplate = getDocumentationTemplate(element.title, element.url);
    ulElement.innerHTML += docTemplate;
  });

  return ulElement;
};

const setupFavoritesList = () => {
  const favorites = DOCUMENTATION.filter((doc) => doc.favorite);
  const favoritesUl = generateList('favorites-list', favorites);
  favoritesListElement.append(favoritesUl);
};

const normalizeText = (text) => text.trim().toLowerCase();

const toggleOpenMenu = () => {
  menuContentElement.classList.toggle('menu-content--open');
};

const handleSearch = (event) => {
  const { value } = event.target;
  const normalizedValue = normalizeText(value);

  const filteredDocumentation = DOCUMENTATION.filter((doc) => {
    const normalizedTitle = normalizeText(doc.title);
    return normalizedTitle.includes(normalizedValue);
  });

  const searchUl = generateList('search-list', filteredDocumentation);

  const previousUl = document.querySelector('#search-list');
  if (previousUl) {
    previousUl.remove();
  }
  searchBlockElement.append(searchUl);
};

toggleButton.addEventListener('click', toggleOpenMenu);
inputSearch.addEventListener('input', handleSearch);

setupFavoritesList();