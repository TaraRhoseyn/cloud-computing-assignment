import React from 'react';
import { render, screen } from '@testing-library/react';
import Heading1 from './Heading1'; // Adjust the import path if needed

describe('Heading1 Component', () => {
  test('renders the heading with correct text', () => {
    // Arrange
    const testText = 'Test Heading';
    
    // Act
    render(<Heading1>{testText}</Heading1>);
    
    // Assert
    const headingElement = screen.getByText(testText);
    expect(headingElement).toBeInTheDocument();
    expect(headingElement.tagName).toBe('H1');
  });

  test('applies the correct CSS classes', () => {
    const testText = 'Styled Heading';
    render(<Heading1>{testText}</Heading1>);
    const headingElement = screen.getByText(testText);
    expect(headingElement).toHaveClass('text-center');
    expect(headingElement).toHaveClass('mb-2');
    expect(headingElement).toHaveClass('text-4xl');
    expect(headingElement).toHaveClass('font-extrabold');
    expect(headingElement).toHaveClass('text-white');
    expect(headingElement).toHaveClass('md:text-5xl');
    expect(headingElement).toHaveClass('lg:text-5xl');
    expect(headingElement).toHaveClass('mt-3');
  });

  test('renders children correctly', () => {
    const complexChildren = (
      <>
        <span>First part</span>
        <strong>Important part</strong>
      </>
    );
    render(<Heading1>{complexChildren}</Heading1>);
    expect(screen.getByText('First part')).toBeInTheDocument();
    expect(screen.getByText('Important part')).toBeInTheDocument();
  });
});