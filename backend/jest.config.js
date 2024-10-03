import { compilerOptions } from './tsconfig.paths.json';

/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  clearMocks: true,
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  roots: ['<rootDir>'],
  testEnvironment: 'node',
  transform: {
    '^.+.tsx?$': ['ts-jest', {}]
  }
};
