import { getFormattedLocation, log as logger } from '../libs/logger';

const log = logger.child({
	name: getFormattedLocation(__filename)
});

const BUCKET_NAME = `${process.env.HISTORY_BUCKET_PREFIX}-${process.env.PROVIDER_ID}`;

const trackSearchResult = async (connectionId: string, newLoads: string[]) => {
	try {
		const history = [];
		log.debug(`Fetched HISTORY: ${history.length ?? 'x'}`);
		const delta = (await extractDelta(history, newLoads)) ?? [];
		log.debug(`Calculated DELTA: ${delta.length ?? 'x'}`);
		await updateData(connectionId, newLoads, delta);
		return delta;
	} catch (error) {
		log.error(error, 'Failed to track search results');
	}
};

export const extractDelta = (historic: string[] = [], current: string[] = []): string[] | undefined => {
	let difference;
	try {
		if (Array.isArray(historic) && historic.length > 0) {
			difference = historic.filter((x) => !current.includes(x));
		} else {
			difference = [];
			log.debug(historic, 'No historic data found');
		}

		return difference;
	} catch (error) {
		log.error(error, 'Failed to extract DELTA');
	}
};

const fetchData = async (connectionId: string) => {
	const HISTORY_KEY = `${connectionId}-history.json`;
	const params = {
		Bucket: BUCKET_NAME,
		Key: HISTORY_KEY
	};

	try {
		const history = ['historic data']
		return history;
	} catch (error) {
		log.error(error, 'Failed to fetch historic data');
	}
};

export const updateData = async (connectionId: string, newLoads: string[], delta: string[]) => {
	const paramsHistory = {
		Bucket: BUCKET_NAME,
		Key: `${connectionId}-history.json`,
		ContentType: 'application/json',
		Body: Buffer.from(JSON.stringify(newLoads))
	};

	const paramsDelta = {
		Bucket: BUCKET_NAME,
		Key: `${connectionId}-delta.json`,
		ContentType: 'application/json',
		Body: Buffer.from(JSON.stringify(delta))
	};
};

export default trackSearchResult;
