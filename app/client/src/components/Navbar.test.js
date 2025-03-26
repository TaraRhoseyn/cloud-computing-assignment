import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar'; // Adjust the import path if needed

describe('Navbar Component', () => {
  test('renders the navbar component', () => {
    // Render the Navbar within a MemoryRouter
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    
    // Simply check that the nav element exists
    const navElement = document.querySelector('nav');
    expect(navElement).toBeInTheDocument();
  });

  test('renders navigation links', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    
    // Check for the presence of links without specific attributes
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
  });

  test('renders tooltip elements', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    
    // Check that tooltip elements exist
    const tooltipElements = document.querySelectorAll('.tooltip');
    expect(tooltipElements.length).toBeGreaterThan(0);
  });
});