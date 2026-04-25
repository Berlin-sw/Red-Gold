
import '@testing-library/jest-dom';


const originalError = console.error;
console.error = (...args) => {
    if (
        args.length > 0 &&
        typeof args[0] === 'string' &&
        args[0].includes('Circular reference')
    ) {
        return;
    }
    originalError.apply(this, args);
};
