import { findByText, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from './App';
import AppRoutes from '../../routes';

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

  test('Must navigate to the page of the clicked link', async () => {
    render(<AppRoutes />, {wrapper: BrowserRouter});

    const linkCardPage = screen.getByText('Cartões');
    expect(linkCardPage).toBeInTheDocument();

    userEvent.click(linkCardPage);

    const cardPageTitle = await screen.findByText('Meus cartões'); // find because is async.

    expect(cardPageTitle).toBeInTheDocument();
  });

  test('Must navigate to the page of investments', async () => {
    render(<AppRoutes />, {wrapper: BrowserRouter});

    const linkInvestmentPage = screen.getByText('Investimentos');
    expect(linkInvestmentPage).toBeInTheDocument();

    userEvent.click(linkInvestmentPage);

    const investmentPageTitle = await screen.findByTestId('investimentos');
    expect(investmentPageTitle).toBeInTheDocument();
  });
});
