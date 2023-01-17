import './mocks/fetchSimulator';
import { fetchProduct } from '../helpers/fetchFunctions';
import product from './mocks/product';

// implemente seus testes aqui
describe('Teste a função fetchProduct', () => {
  it('fetchProduct é uma função', () => {
    expect(typeof fetchProduct).toBe('function');
  });

  it('fetch é chamado ao executar fetchProduct', async () => {
    await fetchProduct('MLB1405519561');
    expect(fetch).toHaveBeenCalled();
  });

  it('fetch é chamado com o endpoint correto ao executar fetchProduct', async () => {
    await fetchProduct('MLB1405519561');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1405519561');
  });

  it('o retorno da função fetchProduct é uma estrutura de dados igual ao objeto produto', async () => {
    expect(await fetchProduct('MLB1405519561')).toEqual(product);
  });

  it('chamar a função fetchProduct sem argumento, retorna um erro com a mensagem', async () => {
    await expect(fetchProduct()).rejects.toThrow(new Error('ID não informado')
)});
});

