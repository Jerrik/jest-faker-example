import path from 'path';
import { pino } from 'pino';

const formatters: pino.LoggerOptions['formatters'] = {
	level(label) {
		return { level: label.toUpperCase() };
	},
	bindings() {
		return {};
	}
};

const options: pino.LoggerOptions = {
	level: process.env.LOG_LEVEL || 'info',
	timestamp: false,
	formatters: formatters,
	nestedKey: 'values'
};

export const log = pino(options);

export const getFormattedLocation = (loc) => {
	return `${path.dirname(loc).split(path.sep).pop()}/${path.parse(loc).name}`;
};
