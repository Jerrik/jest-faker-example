import AWS from 'aws-sdk';

let config = {};
if (process.env.IS_OFFLINE || process.env.JEST_WORKER_ID) {
	config = { region: 'us-east-1' };
}

export const kmsClient = new AWS.KMS(config);
