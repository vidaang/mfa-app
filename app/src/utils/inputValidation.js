import users from '../data/mockUserData.json';
import mfaCodes from '../data/mockMfaData.json';

export function validateEmail(email) {
	if (!email || !/\S+@\S+\.\S+/.test(email)) {
		return { valid: false, message: 'Please enter a valid email address.' };
	}
	return { valid: true, message: '' };
}

export function validatePassword(password) {
	if (!password || password.length < 6) {
		return { valid: false, message: 'Password must be at least 6 characters long.' };
	}
	return { valid: true, message: '' };
}

export function validateName(name) {
	if (!name || name.trim().length < 1) {
		return { valid: false, message: 'Name is required.' };
	}
	return { valid: true, message: '' };
}

export function validateSignIn(email, password) {
	const emailVal = (email || '').toLowerCase();
	const user = users.find((u) => (u.email || '').toLowerCase() === emailVal);
	if (!user) {
		return { valid: false, message: 'No account found with that email.', field: 'email' };
	}
	if (user.password !== password) {
		return { valid: false, message: 'Incorrect password.', field: 'password' };
	}
	return { valid: true, message: '', user };
}

export function validateMfa(mfa) {
	if (!mfa || mfa.trim().length !== 6 || !/^\d+$/.test(mfa)) {
		return { valid: false, message: 'MFA code must be 6 digits.' };
	}
    
    const validMfa = mfaCodes.find((code) => code.mfa === parseInt(mfa, 10));
    if (!validMfa) {
        return { valid: false, message: 'Invalid MFA code.' };
    }
	return { valid: true, message: '' };
}
