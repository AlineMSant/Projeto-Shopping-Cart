import './mocks/fetchSimulator';
import { fetchProductsList } from '../helpers/fetchFunctions';
import computadorSearch from './mocks/search';

// implemente seus testes aqui
describe('Teste a função fetchProductsList', () => {
  it('fetchProductsList é uma função', () => {
     expect(typeof fetchProductsList).toBe('function');
  });

  it('fetch é chamado ao executar fetchProductsList', async () => {
    await fetchProductsList('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it('fetch é chamado com o endpoint correto ao executar fetchProductsList', async () => {
    await fetchProductsList('computador')
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador')
  });

  it('retorno da função fetchProductsList é uma estrutura de dados igual ao objeto computadorSearch', async () => {
    expect(await fetchProductsList('computador')).toEqual(computadorSearch)
  });

  // matcher é toEqual pois não esta usando try catch de acordo com mentoria de projeto, 17/jan pois não conseguia fazer 100% de cobertura
  it('chamar a função fetchProductsList sem argumento, retorna um erro com a mensagem', async () => {
    await expect(fetchProductsList()).rejects.toEqual(new Error('Termo de busca não informado')
)});
});
