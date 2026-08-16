import {
  validateEmail,
  validatePassword,
  validateSignIn,
  validateMfa,
} from '../utils/inputValidation';

describe('input validation utils', () => {
  test('validateEmail returns invalid for empty or malformed emails', () => {
    expect(validateEmail('')).toEqual({ valid: false, message: 'Please enter a valid email address.' });
    expect(validateEmail('bademail')).toEqual({ valid: false, message: 'Please enter a valid email address.' });
    expect(validateEmail('ok@test.com').valid).toBe(true);
  });

  test('validatePassword enforces length', () => {
    expect(validatePassword('')).toEqual({ valid: false, message: 'Password must be at least 6 characters long.' });
    expect(validatePassword('12345')).toEqual({ valid: false, message: 'Password must be at least 6 characters long.' });
    expect(validatePassword('123456').valid).toBe(true);
  });

  test('validateSignIn returns correct messages for missing user / wrong password', () => {
    const noUser = validateSignIn('noone@nowhere.com', 'whatever');
    expect(noUser.valid).toBe(false);
    expect(noUser.field).toBe('email');

    const badPass = validateSignIn('johndoe@company.com', 'wrongpass');
    expect(badPass.valid).toBe(false);
    expect(badPass.field).toBe('password');

    const ok = validateSignIn('janesmith@company.com', 'password222');
    expect(ok.valid).toBe(true);
    expect(ok.user).toBeDefined();
  });

  test('validateMfa accepts known 6-digit code and rejects invalid', () => {
    expect(validateMfa('')).toEqual({ valid: false, message: 'MFA code must be 6 digits.' });
    expect(validateMfa('abcdef')).toEqual({ valid: false, message: 'MFA code must be 6 digits.' });
    expect(validateMfa('000000')).toEqual({ valid: false, message: 'Invalid MFA code.' });
    expect(validateMfa('123456').valid).toBe(true);
  });
});
