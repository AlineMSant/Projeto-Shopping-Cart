import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';

document.querySelector('.cep-button').addEventListener('click', searchCep);
const sectionProducts = document.querySelector('.products');

const loading = () => {
  const newElement = document.createElement('p');
  newElement.innerHTML = 'carregando...';
  newElement.className = 'loading';
  sectionProducts.appendChild(newElement);
};

const addProducts = async () => {
  loading();
  const arrayProducts = await fetchProductsList('computador');
  // removendo elemento sem usar .innerHTML='' https://pt.stackoverflow.com/questions/4605/remover-elemento-da-p%C3%A1gina-com-javascript
  document.querySelector('.loading').remove();
  arrayProducts.forEach((element) => sectionProducts
    .appendChild(createProductElement(element)));
};

addProducts();
