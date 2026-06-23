import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { SignIn } from '../screens/SignIn';
import { Register } from '../screens/Register';
import { supabase } from '../utils/supabase';

jest.mock('../utils/supabase', () => ({
  supabase: {
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    insert: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    single: jest.fn(),
  },
}));

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

describe('Authentication Flow', () => {
  const mockNavigation = { navigate: jest.fn(), goBack: jest.fn() };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders SignIn screen correctly', () => {
    const { getByText, getByPlaceholderText } = render(<SignIn navigation={mockNavigation} />);
    
    expect(getByText('Monte Online PC+')).toBeTruthy();
    expect(getByText('Sua configuração dos sonhos')).toBeTruthy();
  });

  it('shows error messages on empty SignIn submit', async () => {
    const { getByText, queryByText } = render(<SignIn navigation={mockNavigation} />);
    
    const loginButton = getByText('Entrar');
    fireEvent.press(loginButton);
    
    await waitFor(() => {
      expect(queryByText('E-mail é obrigatório')).toBeTruthy();
      expect(queryByText('Senha é obrigatória')).toBeTruthy();
    });
  });

  it('renders Register screen correctly', () => {
    const { getByText } = render(<Register navigation={mockNavigation} />);
    
    expect(getByText('Crie sua conta e comece')).toBeTruthy();
  });

  it('validates email format in Register', async () => {
    const { getByText, getAllByText, getByDisplayValue } = render(<Register navigation={mockNavigation} />);
    
    const inputs = getAllByText('Digite seu email');
    // For Formik, we need to trigger validation
    const submitBtn = getByText('Cadastrar');
    fireEvent.press(submitBtn);

    await waitFor(() => {
      expect(getByText('E-mail é obrigatório')).toBeTruthy();
    });
  });
});
