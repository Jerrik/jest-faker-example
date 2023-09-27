/**
 * Creates a time window
 *
 * @param time Date - The only time known
 * @param adjustment Number - The number of minutes to add
 * @param position Number - The position that the created date should take place
 * @returns Object - "open" and "close" properties in UNIX timestamp
 */

type TWindow = { open: Date; close: Date };

export const createTimeWindow = (time: Date, adjustment: number, position: number): TWindow => {
	const windowResult = <TWindow>{};
	const givenTime = new Date(time).getTime();
	const toMinutes = 60000;

	if (position === 1) {
		const calculatedTime = givenTime - adjustment * toMinutes;
		windowResult.open = new Date(calculatedTime);
		windowResult.close = new Date(givenTime);
	} else {
		const calculatedTime = givenTime + adjustment * toMinutes;
		windowResult.open = new Date(givenTime);
		windowResult.close = new Date(calculatedTime);
	}
	return windowResult;
};
