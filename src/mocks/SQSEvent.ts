import { SQSEvent } from 'aws-lambda';
import { v4 as uuidv4 } from 'uuid';
import { IConnection } from '../providers/loadboards/CommonTypes';

export const SQSEventData = (connection: IConnection) => {
	const data: SQSEvent = {
		Records: [
			{
				attributes: {
					MessageGroupId: uuidv4(),
					ApproximateReceiveCount: '1',
					SentTimestamp: new Date().getTime().toString(),
					SenderId: uuidv4(),
					ApproximateFirstReceiveTimestamp: new Date().getTime().toString()
				},
				messageId: uuidv4(),
				body: JSON.stringify(connection),
				awsRegion: 'us-east-1',
				eventSource: 'test',
				eventSourceARN: 'aws:::test::resource',
				md5OfBody: '1234567890',
				messageAttributes: {},
				receiptHandle: 'test'
			}
		]
	};

	return data;
};
