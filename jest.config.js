module.exports = {
	// Indicates whether the coverage information should be collected while executing the test
	collectCoverage: true,

	// coverageThreshold: {
	// 	global: {
	// 		branches: 0,
	// 		functions: 0,
	// 		lines: 0,
	// 		statements: 0,
	// 	},
	// 	'./src/**/*.ts': {
	// 		branches: 0,
	// 		functions: 0,
	// 		lines: 0,
	// 		statements: 0,
	// 	},
	// },

	// Automatically clear mock calls and instances between every test
	clearMocks: true,

	// An array of glob patterns indicating a set of files for which coverage information should be collected
	collectCoverageFrom: ['src/**/*.{ts,tsx}'],

	// The directory where Jest should output its coverage files
	coverageDirectory: 'coverage',

	// An array of regexp pattern strings used to skip coverage collection
	coveragePathIgnorePatterns: ['/node_modules/', '/CommonTypes.ts*', '/types.ts*'],

	// A list of reporter names that Jest uses when writing coverage reports
	coverageReporters: ['text', 'cobertura', 'json-summary', 'html'],

	// The test environment that will be used for testing
	testEnvironment: 'node',

	// A map from regular expressions to paths to transformers
	transform: {
		'^.+\\.(j|t)sx?$': 'esbuild-jest'
	},
	preset: '@shelf/jest-dynamodb',
	reporters: [
		'default',
		[
			'jest-junit',
			{
				suiteName: 'CUSTOM',
				uniqueOutputName: 'CUSTOM',
				ancestorSeparator: ' › ',
				usePathForSuiteName: true,
				titleTemplate: '{classname} › {title}',
				outputFile: "./coverage/jest-junit.xml"
			}
		]
	]
};
