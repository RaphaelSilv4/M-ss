import { renderWithRouter, screen } from '../../test-utils';
import Home from './index';
import '@testing-library/jest-dom';
import { describe, expect } from 'vitest';

describe('Home', () => {
    test('renders text', () => {
        renderWithRouter(<Home />);
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
})
