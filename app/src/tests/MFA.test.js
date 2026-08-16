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

  test('invalid and valid MFA codes', async () => {
    const { container } = render(<MultiFactor />);
    const input = screen.getByLabelText(/enter code/i);
    const form = container.querySelector('form');

    // empty
    const submit = container.querySelector('button[type="submit"]');
    act(() => {
      fireEvent.click(submit);
      jest.runAllTimers();
    });
    expect(await screen.findByText('MFA code must be 6 digits.')).toBeInTheDocument();

    // invalid code
    fireEvent.change(input, { target: { value: '000000' } });
    act(() => {
      fireEvent.click(submit);
      jest.runAllTimers();
    });
    expect(await screen.findByText('Invalid MFA code.')).toBeInTheDocument();

    // valid
    fireEvent.change(input, { target: { value: '123456' } });
    act(() => {
      fireEvent.click(submit);
      jest.runAllTimers();
    });
    // on valid code, no MFA error should be present
    const { waitFor } = require('@testing-library/react');
    await waitFor(() => expect(screen.queryByText('Invalid MFA code.')).toBeNull());
  });
});
