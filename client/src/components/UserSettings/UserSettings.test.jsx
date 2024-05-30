import { renderWithRouter, screen } from '../../test-utils';
import UserSettings from './index';
import '@testing-library/jest-dom';
import { describe, expect } from 'vitest';

describe('UserSettings', () => {
    test('should render', () => {
        renderWithRouter(<UserSettings />);
        expect(screen.getByText('Atualizar Dados')).toBeInTheDocument();
        expect(screen.getByText('E-mail:')).toBeInTheDocument();
        expect(screen.getByText('Nome:')).toBeInTheDocument();
        expect(screen.getByText('Senha:')).toBeInTheDocument();
    });

    test('should render the same number of inputs as the number of fields', () => {
        renderWithRouter(<UserSettings />);
        const inputs = screen.getAllByRole('textbox');
        expect(inputs.length).toBe(3);
    });

    test('should render the same number of buttons as the number of fields', () => {
        renderWithRouter(<UserSettings />);
        expect(screen.getByText('Atualizar')).toBeInTheDocument();
    });

})
