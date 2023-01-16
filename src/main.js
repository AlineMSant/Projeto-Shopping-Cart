import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';

document.querySelector('.cep-button').addEventListener('click', searchCep);
const sectionProducts = document.querySelector('.products');

const addProducts = async () => {
  const arrayProducts = await fetchProductsList('computador');
  arrayProducts.forEach((element) => sectionProducts
    .appendChild(createProductElement(element)));
};

addProducts();
