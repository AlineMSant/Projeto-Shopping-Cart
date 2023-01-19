const cartAddress = document.getElementsByClassName('cart__address')[0];

export const getAddress = async (cep) => {
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
};

export const searchCep = () => { // já tem addEvent na main
  getAddress('09771211');
};

// console.log(searchCep());
