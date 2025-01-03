import { render, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter, Routes, Route } from 'react-router-dom';
import App from './paginas/Principal/App';
import AppRoutes from './routes';
import Cartoes from './componentes/Cartoes';

describe('Routes', () => {
  test('Must render the main route', () => {
    render(<App />, {wrapper: BrowserRouter}); // Render App with BrowserRouter.
    const user = screen.getByText('Olá, Joana :)!');
    expect(user).toBeInTheDocument();
  });

  test('Must render card routes', () => {
    const initialRoute = '/cartoes';
    render(
      <MemoryRouter initialEntries={[initialRoute]}>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='cartoes' element={<Cartoes />} />
        </Routes>
      </MemoryRouter>
    );

    const myCards = screen.getByText('Meus cartões');
    expect(myCards).toHaveTextContent('Meus cartões');
  });

  test('Must render the current route location', () => {
    const currentRoute = '/cartões';
    render(
      <MemoryRouter initialEntries={[currentRoute]}>
        <App />
      </MemoryRouter>
    );

    const currentLocation = screen.getByTestId('location');
    expect(currentLocation).toHaveTextContent(currentRoute);
  });

  test('Must render the 404 page', () => {
    const currentRoute = '/extrato';

    render(
      <MemoryRouter initialEntries={[currentRoute]}>
        <AppRoutes />
      </MemoryRouter>
    );

    const error404page = screen.getByTestId('pagina-404');

    expect(error404page).toContainHTML('<h1>Ops! Não encontramos a página</h1>');
  });
});
