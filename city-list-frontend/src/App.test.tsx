import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders City List App', () => {
  render(<App />);
  const linkElement = screen.getByText(/City List App/i);
  expect(linkElement).toBeInTheDocument();
});
