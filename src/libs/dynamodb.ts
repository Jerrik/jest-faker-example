import AWS from 'aws-sdk';

let options = {};

// connect to local DB if running offline
if (process.env.IS_OFFLINE || process.env.JEST_WORKER_ID) {
	options = {
		region: 'localhost',
		endpoint: 'http://localhost:8000'
	};
}

export const dynamodb = new AWS.DynamoDB.DocumentClient(options);
