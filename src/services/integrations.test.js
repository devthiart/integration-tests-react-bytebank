import api from './api';
import { buscaTransacoes } from './transacoes';
import { buscaSaldo } from './saldo';

jest.mock('./api');

const mockData = {
  "transacoes": [
    {
      id: 1,
      transacao: 'Depósito',
      valor: '100',
      data: '22/11/2022',
      mes: 'Novembro',
    },
  ],
  "saldo": {
    valor: 2000
  }
}

const mockRequest = (response) => {
  return new Promise ((resolve) => {
    setTimeout(() => {
      resolve({data: response});
    }, 200)
  });
}

const mockErrorRequest = () => {
  return new Promise ((_, reject) => {
    setTimeout(() => {
      reject();
    }, 200);
  });
}

describe('Requests to API', () => {
  test('Must render a transaction list.', async () => {
    api.get.mockImplementation(() => mockRequest(mockData.transacoes));

    const transactions = await buscaTransacoes();
    expect(transactions).toEqual(mockData.transacoes);
    expect(api.get).toHaveBeenCalledWith('/transacoes');
  });

  test('Must render a empty list when the request fails.', async () => {
    api.get.mockImplementation(() => mockErrorRequest());

    const transactions = await buscaTransacoes();

    expect(transactions).toEqual([]);
    expect(api.get).toHaveBeenCalledWith('/transacoes');
  });

  test('Must render the balance value.', async () => {
    api.get.mockImplementation(() => mockRequest(mockData.saldo));

    const balance = await buscaSaldo();

    expect(balance).toEqual(mockData.saldo.valor);
    expect(api.get).toHaveBeenCalledWith('/saldo');
  });

  test('Must render a empty balance value when the request fails.', async () => {
    api.get.mockImplementation(mockErrorRequest());

    const balance = await buscaSaldo();

    // In case of error, buscaSaldo() return the value 1000
    expect(balance).toEqual(1000);
    expect(api.get).toHaveBeenCalledWith('/saldo');
  });
});
