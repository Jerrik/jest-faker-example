export const generatePickupDates = (days = 0): string[] => {
	const pickupDates: string[] = [];
	const startDate = new Date(Date.now());

	if (days > 0) {
		pickupDates.push(startDate.toUTCString());
		for (let i = 1; i < days; i++) {
			pickupDates.push(new Date(startDate.setDate(startDate.getDate() + 1)).toUTCString());
		}
	}

	return pickupDates;
};
