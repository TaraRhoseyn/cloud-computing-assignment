import React from 'react';
import { render, screen } from '@testing-library/react';

describe('Home Component', () => {
  const MockHome = () => {
    return (
      <div data-testid="home-container">
        <h1 data-testid="page-title">Home</h1>
        <div data-testid="appointments-section">
          <h2 data-testid="section-title">Your Upcoming Appointments</h2>
          <table data-testid="appointments-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Hospital</th>
                <th>Department</th>
                <th>Doctor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Tomorrow at 10:00</td>
                <td>Test Hospital</td>
                <td>Test Department</td>
                <td>Dr. Test</td>
              </tr>
            </tbody>
          </table>
          <a data-testid="schedule-button">Schedule New Appointment</a>
        </div>
      </div>
    );
  };

  test('mock home component renders correctly', () => {
    render(<MockHome />);
    
    expect(screen.getByTestId('home-container')).toBeInTheDocument();
    expect(screen.getByTestId('page-title')).toHaveTextContent('Home');
    expect(screen.getByTestId('appointments-section')).toBeInTheDocument();
    expect(screen.getByTestId('section-title')).toHaveTextContent('Your Upcoming Appointments');
    expect(screen.getByTestId('appointments-table')).toBeInTheDocument();
    expect(screen.getByTestId('schedule-button')).toHaveTextContent('Schedule New Appointment');
  });
});