import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../paginas/Principal/App';
import { buscaTransacoes } from './transacoes';

describe('Requests to API', () => {
  test('Must render a transation list', async () => {
    const transations = await buscaTransacoes();
    expect(transations).toHaveLength(3);

    render(<App />, { wrapper: BrowserRouter });
    const transactionList = await screen.findAllByText('Novembro');
    transactionList.forEach(currentTransaction => expect(currentTransaction).toBeInTheDocument());
  });
})
