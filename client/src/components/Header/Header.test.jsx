// src/components/Header/Header.test.jsx
import React from 'react';
import { renderWithRouter, screen } from '../../test-utils';
import Header from './Header';
import '@testing-library/jest-dom';
import { expect } from 'vitest';

describe('Header Component', () => {
  test('renders Header component', () => {
    renderWithRouter(<Header />);
    expect(screen.getByText('M&S')).toBeInTheDocument();
  });

  test('has a search bar', () => {
    renderWithRouter(<Header />);
    expect(screen.getByPlaceholderText('Pesquisar...')).toBeInTheDocument();
  });

  test('has a text', () => {
    renderWithRouter(<Header />);
    expect(screen.getByText('Gênero')).toBeInTheDocument();
    expect(screen.getByText('Filmes')).toBeInTheDocument();
    expect(screen.getByText('Series')).toBeInTheDocument();
  })

  test('has a icon', () => {
    renderWithRouter(<Header />);
    expect(screen.getByLabelText('Search icon')).toBeInTheDocument();
  })

});

