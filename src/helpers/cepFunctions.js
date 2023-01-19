const cartAddress = document.getElementsByClassName('cart__address')[0];
const inputAddress = document.getElementsByClassName('cep-input')[0];

const errorCEP = () => {
  cartAddress.innerHTML = 'CEP não encontrado';
};

export const getAddress = async (cep) => {
  try {
    Promise.any([
      await fetch(`https://cep.awesomeapi.com.br/json/${cep}`),
      await fetch(`https://brasilapi.com.br/api/cep/v2/${cep}`),
    ]).then(async (response) => {
      const objAddress = await response.json();

      if (!objAddress.address) {
        cartAddress.innerHTML = `${objAddress.street} - ${objAddress.neighborhood} - \
  ${objAddress.city} - ${objAddress.state}`;
      } else {
        cartAddress.innerHTML = `${objAddress.address} - ${objAddress.district} - \
  ${objAddress.city} - ${objAddress.state}`;
      }
    });
  } catch {
    errorCEP();
  }
};

export const searchCep = () => { // já tem addEvent na main
  getAddress(inputAddress.value);
};
