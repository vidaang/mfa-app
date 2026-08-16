// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Polyfills for TextEncoder/TextDecoder used by some dependencies (MUI/data-grid)
try {
	if (typeof TextEncoder === 'undefined') {
		// Node.js provides util.TextEncoder in newer versions
		// eslint-disable-next-line global-require
		const { TextEncoder, TextDecoder } = require('util');
		global.TextEncoder = TextEncoder;
		global.TextDecoder = TextDecoder;
	}
} catch (e) {
	// ignore
}
