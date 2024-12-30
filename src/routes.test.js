import { render, screen } from '@testing-library/react';
import App from './paginas/Principal/App';
import { BrowserRouter } from 'react-router-dom';

describe('Routes', () => {
  test('Must render the main route', () => {
    render(<App />, {wrapper: BrowserRouter}); // Render App with BrowserRouter.
    const user = screen.getByText('Olá, Joana :)!');
    expect(user).toBeInTheDocument();
  });
});
