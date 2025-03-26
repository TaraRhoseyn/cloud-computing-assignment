import React from 'react';
import { render, screen } from '@testing-library/react';
import LoadingSpinner from './LoadingSpinner'; // Adjust the import path if needed

// Mock the react-loader-spinner module
jest.mock('react-loader-spinner', () => ({
  Oval: () => <div data-testid="mock-oval-spinner">Mocked Oval Spinner</div>
}));

describe('LoadingSpinner Component', () => {
  test('renders the loading text', () => {
    // Arrange & Act
    render(<LoadingSpinner />);
    
    // Assert
    const loadingText = screen.getByText('Loading...');
    expect(loadingText).toBeInTheDocument();
    expect(loadingText.tagName).toBe('P');
    expect(loadingText).toHaveClass('my-5');
    expect(loadingText).toHaveClass('text-center');
    expect(loadingText).toHaveClass('text-white');
  });

  test('renders the Oval spinner component', () => {
    // Arrange & Act
    render(<LoadingSpinner />);
    
    // Assert
    const ovalSpinner = screen.getByTestId('mock-oval-spinner');
    expect(ovalSpinner).toBeInTheDocument();
  });

  test('renders both text and spinner together', () => {
    // Arrange & Act
    const { container } = render(<LoadingSpinner />);
    
    // Assert
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.getByTestId('mock-oval-spinner')).toBeInTheDocument();
    expect(container.firstChild).not.toBeNull();
  });
});