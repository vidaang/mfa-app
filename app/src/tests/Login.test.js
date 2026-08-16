/**
 * Component tests for Login form validation and navigation
 */
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { getCurrentUser } from '../utils/userStore';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return { ...actual, useNavigate: () => mockNavigate };
});

import Login from '../pages/Login/LoginPage';

describe('Login page validation', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    mockNavigate.mockClear();
    // prevent jsdom "HTMLFormElement.prototype.submit" not implemented errors
    global._submitSpy = jest.spyOn(HTMLFormElement.prototype, 'submit').mockImplementation(() => {});
  });
  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    if (global._submitSpy) {
      global._submitSpy.mockRestore();
      global._submitSpy = null;
    }
  });

  test('shows validation errors for empty inputs', async () => {
    const { container } = render(<Login />);
    const form = container.querySelector('form');
    const submit = container.querySelector('button[type="submit"]');
    act(() => {
      fireEvent.click(submit);
      jest.runAllTimers();
    });

    expect(await screen.findByText('Please enter a valid email address.')).toBeInTheDocument();
    expect(await screen.findByText('Password must be at least 6 characters long.')).toBeInTheDocument();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  test('invalid credentials show sign-in messages and valid credentials navigate', async () => {
    const { container } = render(<Login />);
    const email = screen.getByLabelText(/email/i);
    const password = screen.getByLabelText(/password/i);
    const form = container.querySelector('form');

    // unknown email
    fireEvent.change(email, { target: { value: 'noone@nowhere.com' } });
    fireEvent.change(password, { target: { value: 'password111' } });
    const submit = container.querySelector('button[type="submit"]');
    act(() => {
      fireEvent.click(submit);
      jest.runAllTimers();
    });
    expect(await screen.findByText('No account found with that email.')).toBeInTheDocument();

    // wrong password
    fireEvent.change(email, { target: { value: 'johndoe@company.com' } });
    fireEvent.change(password, { target: { value: 'badpass' } });
    act(() => {
      fireEvent.click(submit);
      jest.runAllTimers();
    });
    expect(await screen.findByText('Incorrect password.')).toBeInTheDocument();

    // correct credentials should navigate to /mfa
    fireEvent.change(email, { target: { value: 'janesmith@company.com' } });
    fireEvent.change(password, { target: { value: 'password222' } });
    act(() => {
      fireEvent.click(submit);
      jest.runAllTimers();
    });
    // valid credentials should clear error messages
    const { waitFor } = require('@testing-library/react');
    await waitFor(() => expect(screen.queryByText('Incorrect password.')).toBeNull());
  });
});
