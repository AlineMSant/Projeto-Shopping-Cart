import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { fetchProduct, fetchProductsList } from './helpers/fetchFunctions';
import { createCartProductElement, createProductElement } from './helpers/shopFunctions';
import { getSavedCartIDs, saveCartID } from './helpers/cartFunctions';

document.querySelector('.cep-button').addEventListener('click', searchCep);
const sectionProducts = document.querySelector('.products');
const elementOl = document.querySelector('.cart__products');
const totalPriceElement = document.getElementsByClassName('total-price');

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
sectionProducts.addEventListener('click', async (event) => {
  if (event.target.className === 'product__add') {
    const parenteEventElement = event.target.parentNode;
    const elementId = parenteEventElement.firstChild;
    const id = elementId.innerHTML;

    saveCartID(id);
    const elementObj = await fetchProduct(id);
    elementOl.appendChild(createCartProductElement(elementObj));

    // soma valores no evento de click, mesma lógica de window.onload
    const elementObjCart = getSavedCartIDs().map(async (element) => {
      const fetchElementObjCart = await fetchProduct(element);
      return fetchElementObjCart;
    });
    Promise.all(
      elementObjCart,
    ).then((result) => {
      let total = 0;
      for (let i = 0; i < result.length; i += 1) {
        total += result[i].price;
      }
      // inclui valor total na classe total-price para vizualizar no browser;
      totalPriceElement[0].innerHTML = total.toFixed(2);
    });
  }
});

elementOl.addEventListener('click', (event) => {
  if (event.target.innerHTML === 'delete') {
    console.log('oi');
  }
});

// const arrayCartProduct = document.getElementsByClassName('cart__products')[0].children;
// console.log(arrayCartProduct);
