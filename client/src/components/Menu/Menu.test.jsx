import { expect } from 'vitest';
import { renderWithRouter, screen, fireEvent } from '../../test-utils';
import Menu from './index';
import '@testing-library/jest-dom';

describe('Menu', () => {
  test('renders Menu and toggles menu', async () => {
    renderWithRouter(<Menu />);
    
    // Verify the profile icon button is present
    const profileButton = screen.getByLabelText('Open menu');
    expect(profileButton).toBeInTheDocument();

    // Click to open the menu
    fireEvent.click(profileButton);

    // Verify the menu is opened
    const profileIcon = await screen.findByLabelText('Profile icon');
    const closeButton = screen.getByLabelText('Close menu');
    expect(profileIcon).toBeInTheDocument();
    expect(closeButton).toBeInTheDocument();

    // Click to close the menu
    fireEvent.click(closeButton);

  });

  test('renders menu items', async () => {
    renderWithRouter(<Menu />);
    
    // Open the menu
    const profileButton = screen.getByLabelText('Open menu');
    fireEvent.click(profileButton);
    
    // Check menu items
    expect(await screen.findByText('Perfil')).toBeInTheDocument();
    expect(screen.getByText('Favoritos')).toBeInTheDocument();
    expect(screen.getByText('Configurações')).toBeInTheDocument();
    expect(screen.getByText('Login/out')).toBeInTheDocument();
  });

  test('render user name', () => {
    renderWithRouter(<Menu />);
    expect(screen.getByText('No access')).toBeInTheDocument();
  })

});
