// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Suppress specific React 18 warnings
const originalError = console.error;
console.error = (...args) => {
    // Suppress React 18 "Circular reference" warning
    if (
        args.length > 0 &&
        typeof args[0] === 'string' &&
        args[0].includes('Circular reference')
    ) {
        return;
    }
    originalError.apply(this, args);
};
