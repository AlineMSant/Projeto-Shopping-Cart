export const fetchProduct = async (id) => {
  const response = await fetch(`https://api.mercadolibre.com/items/${id}`);
  const data = await response.json();
  console.log(data);
};

fetchProduct('MLB1341706310');

export const fetchProductsList = async (query) => {
  if (!query) throw new Error('Termo de busca não informado');

  try {
    const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    return error.message;
  }
};
