import { renderWithRouter, screen } from '../../test-utils';
import Login from './Login';
import '@testing-library/jest-dom';
import { describe, expect } from 'vitest';

describe('Login', () => {
    test('should render', () => {
    renderWithRouter(<Login />);
    expect(screen.getByText('M & S')).toBeInTheDocument();
    expect(screen.getByText('Seja Bem-vindo!')).toBeInTheDocument();
    expect(screen.getByText('Faça Seu Login')).toBeInTheDocument();
    expect(screen.getByText('Cadastrar')).toBeInTheDocument();
  });

  test('has a input', () => {
    renderWithRouter(<Login />);
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Senha')).toBeInTheDocument();
  })

  test('has a button', () => {
    renderWithRouter(<Login />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  })

});
