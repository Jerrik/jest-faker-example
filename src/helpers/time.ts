export const getUTCOffsetHHMM = (timeZone) => {
	const date = new Date ();
	const options = { timeZoneName: 'longOffset', timeZone };
	const fmt = date.toLocaleString('ia', options);
	return fmt.replace(/^.*? GMT/, '');
};

export const getUTCOffsetMinutes = (date, timeZone) => {
	const hhmm = getUTCOffsetHHMM(date, timeZone);
	return parseHHMM(hhmm);
};

const parseHHMM = (hhmm) => {
	const [h, m] = hhmm.split(':').map(Number);
	return h * 60 + (m || 0) * (h < 0 ? -1 : +1);
};
