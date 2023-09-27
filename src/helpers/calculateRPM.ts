/**
 *
 * @param amount number - Currency amount
 * @param distance number - Distance value
 * @returns number - the amount per distance unit
 */
const calculateRPM = (amount: number, distance: number): number => {
	let result = 0;

	if (amount > 0 && distance > 0) {
		result = amount / distance;
	}

	return result;
};

export default calculateRPM;
