import api from './api';
import { buscaTransacoes } from './transacoes';

jest.mock('./api');

const mockTransactions = [
  {
    id: 1,
    transacao: 'Depósito',
    valor: '100',
    data: '22/11/2022',
    mes: 'Novembro',
  },
];

const mockRequest = (response) => {
  return new Promise ((resolve) => {
    setTimeout(() => {
      resolve({data: response});
    }, 200)
  })
}

describe('Requests to API', () => {
  test('Must render a transaction list.', async () => {
    api.get.mockImplementation(() => mockRequest(mockTransactions));

    const transactions = await buscaTransacoes();
    expect(transactions).toEqual(mockTransactions);
    expect(api.get).toHaveBeenCalledWith('/transacoes');
  })
})
