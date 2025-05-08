import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import MovimientoComponent from './MovimientoComponent'; // Adjust path as needed
import { AuthProvider } from 'providers/AuthProvider'; // Adjust path as needed
import axios from 'axios';

// Mock axios
jest.mock('axios');

// Mock AuthProvider to avoid context issues
jest.mock('providers/AuthProvider', () => ({
  AuthProvider: ({ children }) => <div>{children}</div>,
  useAuth: () => ({
    user: { iniciales: 'TEST' },
    loading: false,
    logout: jest.fn()
  })
}));

// Mock other components to avoid rendering issues
jest.mock('components/Cap/TextEditor', () => () => (
  <div>Mocked TextEditor</div>
));
jest.mock('components/base/DatePicker', () => () => <input type="date" />);
jest.mock('components/base/Button', () => () => <button>Mocked Button</button>);

describe('MovimientoComponent', () => {
  it('renders without crashing', async () => {
    // Mock axios GET requests
    axios.get.mockImplementation(url => {
      if (url.includes('/mtos/id/')) {
        return Promise.resolve({
          data: {
            mtoId: 1,
            Proc: { ACTO: 'Test Acto', DEMA: 'Test Dema', TPRO: 'Test Tpro' },
            texto: '',
            fechaDeRealizacion: new Date(),
            tipoDeMovimiento: '',
            cobros_fk: 0,
            descripcion: '',
            proc: {}
          }
        });
      }
      if (url.includes('/tMtos')) {
        return Promise.resolve({ data: [] });
      }
      if (url.includes('/cobros/id/')) {
        return Promise.resolve({
          data: { monto: 0, quien_cobra: '', estado: '' }
        });
      }
      return Promise.resolve({ data: {} });
    });

    render(
      <AuthProvider>
        <MemoryRouter initialEntries={['/movimiento/1']}>
          <Routes>
            <Route path="/movimiento/:id" element={<MovimientoComponent />} />
          </Routes>
        </MemoryRouter>
      </AuthProvider>
    );

    // Wait for the heading to appear (handles async useEffect)
    expect(await screen.findByText(/Movimiento en/)).toBeInTheDocument();
  });
});
