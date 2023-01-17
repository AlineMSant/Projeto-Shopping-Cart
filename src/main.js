import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { fetchProduct, fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';
import { saveCartID } from './helpers/cartFunctions';

document.querySelector('.cep-button').addEventListener('click', searchCep);
const sectionProducts = document.querySelector('.products');

const loading = () => {
  const newElement = document.createElement('p');
  newElement.innerHTML = 'carregando...';
  newElement.className = 'loading';
  sectionProducts.appendChild(newElement);
};

const errorAPI = () => {
  const newElementError = document.createElement('p');
  newElementError.innerHTML = 'Algum erro ocorreu, recarregue a página e tente novamente';
  newElementError.className = 'error';
  sectionProducts.appendChild(newElementError);
};

const addProducts = async () => {
  try {
    loading();
    const arrayProducts = await fetchProductsList('computador');
    // removendo elemento sem usar .innerHTML='' https://pt.stackoverflow.com/questions/4605/remover-elemento-da-p%C3%A1gina-com-javascript
    document.querySelector('.loading').remove();
    arrayProducts.forEach((element) => sectionProducts
      .appendChild(createProductElement(element)));
  } catch {
    errorAPI();
  }
};

addProducts();

// link de pesquisa sobre parentNode https://horadecodar.com.br/2021/02/08/como-pegar-atributos-da-div-pai-atraves-do-elemento-filho/
sectionProducts.addEventListener('click', (event) => {
  if (event.target.className === 'product__add') {
    const parenteEventElement = event.target.parentNode;
    const elementId = parenteEventElement.firstChild;
    const id = elementId.innerHTML;

    saveCartID(id);
    fetchProduct(id);
  }
});
