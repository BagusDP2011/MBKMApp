import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignIn from '../../pages/auth/SignIn'; // Sesuaikan path
import { AuthContext } from '../../service/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';


jest.mock("../../assets/img/backround.png", () => "mock-image");

// Mock semua service eksternal
jest.mock('../../service/Auth.Service', () => ({
  login: jest.fn(),
}));
jest.mock('../../service/Static.Service', () => ({
  getRedirectMenu: jest.fn(() => Promise.resolve({ Path: '/menu/mbkm/informasi' })),
}));
jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));

const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

describe('SignIn Page', () => {
  const mockLoginContext = jest.fn();

  const renderWithContext = () =>
    render(
      <AuthContext.Provider value={{ loginContext: mockLoginContext }}>
        <BrowserRouter>
          <SignIn />
        </BrowserRouter>
      </AuthContext.Provider>
    );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('user bisa mengetik email dan password lalu submit', async () => {
    const { login } = require('../../service/Auth.Service');

    login.mockResolvedValue('fake-token');

    renderWithContext();

    fireEvent.change(screen.getByPlaceholderText('your@email.com'), {
      target: { value: 'bagusdp2011@gmail.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('••••••'), {
      target: { value: '123456' },
    });

    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(login).toHaveBeenCalledWith({
        user: 'bagusdp2011@gmail.com',
        password: '123456',
      });
    });

    expect(mockLoginContext).toHaveBeenCalledWith('fake-token');
    expect(mockedNavigate).toHaveBeenCalledWith('/menu/mbkm/informasi');
  });

  test('menampilkan error jika email tidak valid', () => {
    renderWithContext();

    fireEvent.change(screen.getByPlaceholderText('your@email.com'), {
      target: { value: 'invalidemail' },
    });
    fireEvent.change(screen.getByPlaceholderText('••••••'), {
      target: { value: 'pass' },
    });

    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    expect(
      screen.getByText(/Please enter a valid email address/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Password must be at least 6 characters long/i)
    ).toBeInTheDocument();
  });
});
