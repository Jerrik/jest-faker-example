import { extractDelta } from './trackSearchResult';

describe('Track Search Results', () => {
	const current = ['1', '2', '4'];
	const historic = ['1', '3'];

	test('Difference', () => {
		const difference = extractDelta(historic, current) ?? [];
		// 1 : avail
		// 2 : avail
		// 3 : unavail
		// 4: avail

		expect(difference[0]).toEqual('3');
	});

	test('No Difference', () => {
		const current = historic;
		const difference = extractDelta(historic, current) ?? [];

		expect(difference.length).toEqual(0);
	});

});
