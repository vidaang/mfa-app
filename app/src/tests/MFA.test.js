import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return { ...actual, useNavigate: () => mockNavigate };
});

import MultiFactor from '../pages/MultiFactorAuth/MultiFactorAuthPage';

describe('MFA page validation', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    mockNavigate.mockClear();
    if (!global._origFormSubmit) global._origFormSubmit = HTMLFormElement.prototype.submit;
    HTMLFormElement.prototype.submit = () => {};
  });
  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    HTMLFormElement.prototype.submit = global._origFormSubmit;
  });

  test('invalid and valid MFA codes', async () => {
    const { container } = render(<MultiFactor />);
    const input = screen.getByLabelText(/enter code/i);
    const form = container.querySelector('form');

    // empty
    act(() => {
      fireEvent.submit(form);
      jest.runAllTimers();
    });
    expect(await screen.findByText('MFA code must be 6 digits.')).toBeInTheDocument();

    // invalid code
    fireEvent.change(input, { target: { value: '000000' } });
    act(() => {
      fireEvent.submit(form);
      jest.runAllTimers();
    });
    expect(await screen.findByText('Invalid MFA code.')).toBeInTheDocument();

    // valid
    fireEvent.change(input, { target: { value: '123456' } });
    act(() => {
      fireEvent.submit(form);
      jest.runAllTimers();
    });
    // on valid code, no MFA error should be present
    const { waitFor } = require('@testing-library/react');
    await waitFor(() => expect(screen.queryByText('Invalid MFA code.')).toBeNull());
  });
});
