import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { fetchProduct, fetchProductsList } from './helpers/fetchFunctions';
import {
  createCartProductElement,
  createProductElement,
  totalPrice } from './helpers/shopFunctions';
import { getSavedCartIDs, saveCartID } from './helpers/cartFunctions';

document.querySelector('.cep-button').addEventListener('click', searchCep);
const sectionProducts = document.querySelector('.products');
const elementOl = document.querySelector('.cart__products');
const totalPriceElement = document.getElementsByClassName('total-price');

// faz com que ao recarregar a págica os itens do carrigo sejam mantidos e gera total de preço por esses itens;
// pesquisa utilizada para o requisito usando promise.all https://dev.to/jamesliudotcc/how-to-use-async-await-with-map-and-promise-all-1gb5 e MENTORIA
window.onload = () => {
  // pega ids do carrinho e com o map procura retorna obj com fecthProduct e adiciona como elemento filho de Ol
  const result = getSavedCartIDs().map(async (id) => {
    const fetch = await fetchProduct(id);
    elementOl.appendChild(createCartProductElement(await fetchProduct(id)));
    return fetch;
  });
  // a promise.all trata o retorno de result que é uma array, para retornar itens na ordem certa
  Promise.all(
    result,
  ).then((response) => { // .then pega o retorno de promise.all, que é uma array de objetos, para que possa ser utilizado para somar os valores e gerar o valor total.
    let total = 0;
    for (let i = 0; i < response.length; i += 1) {
      total += response[i].price;
    }
    // inclui valor total na classe total-price para vizualizar no browser;
    totalPriceElement[0].innerHTML = total.toFixed(2);
  });
};

// cria elemento de carregamento..
const loading = () => {
  const newElement = document.createElement('p');
  newElement.innerHTML = 'carregando...';
  newElement.className = 'loading';
  sectionProducts.appendChild(newElement);
};

// gera erro de API caso algo de errado, função utilizada em addProducts para catch
const errorAPI = () => {
  const newElementError = document.createElement('p');
  newElementError.innerHTML = 'Algum erro ocorreu, recarregue a página e tente novamente';
  newElementError.className = 'error';
  sectionProducts.appendChild(newElementError);
};

// enquanto não retorna API e adiciona elementos na pagina de compras, utiliza função loading e errorAPI
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

// cria elementos no carrinho e faz toma total do valor com evento de click em adicionar
// link de pesquisa sobre parentNode https://horadecodar.com.br/2021/02/08/como-pegar-atributos-da-div-pai-atraves-do-elemento-filho/
sectionProducts.addEventListener('click', async (event) => {
  if (event.target.className === 'product__add') {
    const parenteEventElement = event.target.parentNode;
    const elementId = parenteEventElement.firstChild;
    const id = elementId.innerHTML;

    saveCartID(id);
    const elementObj = await fetchProduct(id);
    elementOl.appendChild(createCartProductElement(elementObj));
    totalPrice();
  }
});

// remove valor do evento no preço total do carrinho
// elementOl.addEventListener('click', (event) => {
//   if (event.target.innerHTML === 'delete') {
//     totalPrice();
//   }
// });
