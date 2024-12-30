import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('<App /> Component', () =>{
  test('Must allow adding a transaction to a statement', () => {
    render(<App />, {wrapper: BrowserRouter});

    const select = screen.getByRole('combobox');
    const valueField = screen.getByPlaceholderText('Digite um valor');
    const button = screen.getByRole('button');

    userEvent.selectOptions(select, ['Depósito']);
    userEvent.type(valueField, '100');
    userEvent.click(button);

    const newTransaction = screen.getByTestId('lista-transacoes');
    const itemExtrato = screen.getByRole('listitem');

    expect(newTransaction).toContainElement(itemExtrato);
  });
});
