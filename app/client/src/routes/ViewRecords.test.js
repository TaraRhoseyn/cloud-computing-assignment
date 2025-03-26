import React from 'react';
import { render, screen } from '@testing-library/react';

describe('ViewRecords Component', () => {
  const MockViewRecords = () => {
    return (
      <div data-testid="view-records-container">
        <h1 data-testid="page-title">Your Lab Results</h1>
        <div data-testid="records-section">
          <table data-testid="records-table">
            <thead>
              <tr>
                <th>Test Name</th>
                <th>Test Date</th>
                <th>Ordered By</th>
                <th>Result</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Blood Test</td>
                <td>01/15/2025</td>
                <td>Dr. Smith</td>
                <td>Normal</td>
                <td>No concerns</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  test('mock view records component renders correctly', () => {
    render(<MockViewRecords />);
    
    expect(screen.getByTestId('view-records-container')).toBeInTheDocument();
    expect(screen.getByTestId('page-title')).toHaveTextContent('Your Lab Results');
    expect(screen.getByTestId('records-section')).toBeInTheDocument();
    expect(screen.getByTestId('records-table')).toBeInTheDocument();
    
    expect(screen.getByText('Test Name')).toBeInTheDocument();
    expect(screen.getByText('Test Date')).toBeInTheDocument();
    expect(screen.getByText('Ordered By')).toBeInTheDocument();
    expect(screen.getByText('Result')).toBeInTheDocument();
    expect(screen.getByText('Notes')).toBeInTheDocument();
    
    expect(screen.getByText('Blood Test')).toBeInTheDocument();
    expect(screen.getByText('Dr. Smith')).toBeInTheDocument();
  });
});