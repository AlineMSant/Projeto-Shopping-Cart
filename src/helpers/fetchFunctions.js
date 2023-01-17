export const fetchProduct = async (id) => {
  if (!id) throw new Error('ID não informado');
  // não usa try catch de acordo com mentoria de projeto, 17/jan pois não conseguia fazer 100% de cobertura do catch.
  const response = await fetch(`https://api.mercadolibre.com/items/${id}`);
  const data = await response.json();
  return data;
};

export const fetchProductsList = async (query) => {
  if (!query) throw new Error('Termo de busca não informado');
  // fora do try catch de acordo com mentoria de projeto, 17/jan pois não conseguia fazer 100% de cobertura do catch.
  const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`);
  const data = await response.json();
  return data.results;
};
