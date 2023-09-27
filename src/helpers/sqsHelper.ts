import { SQSEvent } from 'aws-lambda';
import { IConnection } from '../providers/loadboards/CommonTypes';

export const extractSQSData = (event: SQSEvent): IConnection => {
	const body = JSON.stringify(event);
	const records = JSON.parse(body).Records;
	const data = JSON.parse(records[0].body);

	return data;
};
