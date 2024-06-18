import React from 'react';
import { renderWithRouter, screen } from '../../test-utils';
import Profile from './Profile';
import '@testing-library/jest-dom';

describe('Profile Component', () => {
  test('renders Profile component', () => {
    renderWithRouter(<Profile />);
    expect(screen.getByText('Perfil')).toBeInTheDocument();
  });

  test('renders user name', () => {
    renderWithRouter(<Profile />);
    expect(screen.getByText('Usuário')).toBeInTheDocument();
    expect(screen.getByText('Nome do Usuário')).toBeInTheDocument();
    expect(screen.getByText('Comentários')).toBeInTheDocument();
  });

  test('renders favorite items', () => {
    renderWithRouter(<Profile />);
    const favoriteItems = screen.getAllByRole('listitem');
    expect(favoriteItems).toHaveLength(6);
  });

  test('renders user comments', () => {
    renderWithRouter(<Profile />);
    expect(screen.getByText('One Piece 3D2Y')).toBeInTheDocument();
    expect(screen.getByText('Muito bom')).toBeInTheDocument();
    expect(screen.getByText('Test!')).toBeInTheDocument();
  });
});