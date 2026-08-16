// Role-based permission helpers for mock users
import users from '../data/mockUserData.json';
import { getCurrentUser } from './userStore';

const ROLE_PERMISSIONS = {
	READ_ONLY: ['read'],
	READ_WRITE: ['read', 'write'],
};

// Find a mock user object by email (case-insensitive)
function findUserByEmail(email) {
	if (!email) return null;
	return users.find((u) => (u.email || '').toLowerCase() === email.toLowerCase()) || null;
}

// Check whether the given (or current) user has a specific permission
export function hasPermission(permission, email) {
	if (!permission) return false;

	let targetEmail = email;
	if (!targetEmail) {
		const current = getCurrentUser();
		targetEmail = current?.email;
	}

	if (!targetEmail) return false;
	const user = findUserByEmail(targetEmail);
	if (!user) return false;

	const perms = ROLE_PERMISSIONS[user.role] || [];
	return perms.includes(permission);
}

export function canRead(email) {
	return hasPermission('read', email);
}

export function canWrite(email) {
	return hasPermission('write', email);
}

export default {
	hasPermission,
	canRead,
	canWrite,
};