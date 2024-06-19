import { renderWithRouter, screen } from '../../test-utils';
import Register from './Register';
import '@testing-library/jest-dom';
import { describe, expect } from 'vitest';

describe('Register', () => {
    test('should render', () => {
    renderWithRouter(<Register />);
    expect(screen.getByText('M & S')).toBeInTheDocument();
    expect(screen.getByText('Bem-vindo de volta!')).toBeInTheDocument();
    expect(screen.getByText('Acesse sua conta')).toBeInTheDocument();
    expect(screen.getByText('Cadastre-se com seu email')).toBeInTheDocument();
    expect(screen.getByText('Criar Conta')).toBeInTheDocument();
    expect(screen.getByText('Entrar')).toBeInTheDocument();
  });

  test('has a input', () => {
    renderWithRouter(<Register />);
    expect(screen.getByPlaceholderText('Nome')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Senha')).toBeInTheDocument();
  })

  test('has a button', () => {
    renderWithRouter(<Register />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  })

});
