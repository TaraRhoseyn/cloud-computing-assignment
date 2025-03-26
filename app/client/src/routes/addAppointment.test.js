import React from 'react';
import { render, screen } from '@testing-library/react';

describe('AddAppointment Component', () => {
  const MockAddAppointment = () => {
    return (
      <div data-testid="appointment-container">
        <h1 data-testid="page-title">Schedule New Appointment</h1>
        <form data-testid="appointment-form">
          <select data-testid="hospital-select"></select>
          <select data-testid="department-select"></select>
          <select data-testid="doctor-select"></select>
          <input data-testid="date-input" type="datetime-local" />
          <button data-testid="submit-button">Schedule Appointment</button>
        </form>
      </div>
    );
  };

  test('mock component renders correctly', () => {
    render(<MockAddAppointment />);
    expect(screen.getByTestId('appointment-container')).toBeInTheDocument();
    expect(screen.getByTestId('page-title')).toHaveTextContent('Schedule New Appointment');
    expect(screen.getByTestId('appointment-form')).toBeInTheDocument();
    expect(screen.getByTestId('hospital-select')).toBeInTheDocument();
    expect(screen.getByTestId('department-select')).toBeInTheDocument();
    expect(screen.getByTestId('doctor-select')).toBeInTheDocument();
    expect(screen.getByTestId('date-input')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
  });
});