// jest.config.js
module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    setupFilesAfterEnv: ['./tests/jest.setup.js'],
    transform: {
        '^.+\\.js$': 'babel-jest',
    },
};
