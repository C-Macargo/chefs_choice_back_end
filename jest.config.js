const config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  transform: {
    "^.+\\.tsx?$": "babel-jest"
  },
  testMatch: [
    "<rootDir>/test/**/*.spec.ts"
  ],
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/dist/$1"
  }
};

module.exports = config;
