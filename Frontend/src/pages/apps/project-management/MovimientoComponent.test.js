import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import MovimientoComponent from './MovimientoComponent'; // Adjust the path as needed
import { AuthProvider } from 'providers/AuthProvider'; // Adjust the path as needed
import axios from 'axios';

// Mock axios to prevent actual API calls
jest.mock('axios');

describe('MovimientoComponent', () => {
  it('renders without crashing', () => {
    // Mock the axios GET requests
    axios.get.mockImplementation((url) => {
      if (url.includes('/mtos/id/')) {
        return Promise.resolve({ data: { Proc: { ACTO: '', DEMA: '', TPRO: '' } } });
      }
      if (url.includes('/tMtos')) {
        return Promise.resolve({ data: [] });
      }
      return Promise.resolve({ data: {} });
    });

    // Render the component wrapped in necessary providers and router
    render(
      <AuthProvider>
        <MemoryRouter initialEntries={['/movimiento/1']}>
          <Routes>
            <Route path="/movimiento/:id" element={<MovimientoComponent />} />
          </Routes>
        </MemoryRouter>
      </AuthProvider>
    );

    // Check if the component renders by looking for the heading
    expect(screen.getByText(/Movimiento en/)).toBeInTheDocument();
  });
}); 