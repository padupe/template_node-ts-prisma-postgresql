import { pathsToModuleNameMapper } from 'ts-jest/utils';
import { compilerOptions } from './tsconfig.json';

export default {
  // Automatically clear mock calls, instances and results before every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  // TODO - change to 'true'
  collectCoverage: false,

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: ['<rootDir>/src/modules/**/useCases/**/*.ts'],

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "v8",

  // A list of reporter names that Jest uses when writing coverage reports
  coverageReporters: [
    "text-summary",
    "lcov"
  ],

  // An array of directory names to be searched recursively up from the requiring module's location
  moduleDirectories: [
    "node_modules"
  ],

  // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {prefix: "<rootDir>/src"}),

  // A preset that is used as a base for Jest's configuration
  preset: "ts-jest",

  // The glob patterns Jest uses to detect test files
  testMatch: [ "**/*.spec.ts" ],

  // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  testPathIgnorePatterns: [
    "/node_modules/"
  ]
};