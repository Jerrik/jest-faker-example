import AWS from 'aws-sdk';
import { kmsClient } from '../libs/kms';
import { getFormattedLocation, log as logger } from '../libs/logger';

const log = logger.child({
	name: getFormattedLocation(__filename)
});

/**
 * Uses AWS Secrets Manager to retrieve a secret
 */
export const getSecret = async (secretName) => {
	const config = { region: 'us-east-2' };
	let secret, decodedBinarySecret, secretVal, secretObj;
	const secretsManager = new AWS.SecretsManager(config);
	try {
		const secretValue = await secretsManager.getSecretValue({ SecretId: secretName }).promise();
		if ('SecretString' in secretValue) {
			secret = secretValue.SecretString;
			secretObj = JSON.parse(secret);
			secretVal = Object.values(secretObj)[0];
			return secretVal;
		} else {
			const buff = new Buffer(secretValue.SecretBinary, 'base64');
			return (decodedBinarySecret = buff.toString('ascii'));
		}
	} catch (err) {
		if (err.code === 'DecryptionFailureException')
			// Secrets Manager can't decrypt the protected secret text using the provided KMS key.
			// Deal with the exception here, and/or rethrow at your discretion.
			throw err;
		else if (err.code === 'InternalServiceErrorException')
			// An error occurred on the server side.
			// Deal with the exception here, and/or rethrow at your discretion.
			throw err;
		else if (err.code === 'InvalidParameterException')
			// You provided an invalid value for a parameter.
			// Deal with the exception here, and/or rethrow at your discretion.
			throw err;
		else if (err.code === 'InvalidRequestException')
			// You provided a parameter value that is not valid for the current state of the resource.
			// Deal with the exception here, and/or rethrow at your discretion.
			throw err;
		else if (err.code === 'ResourceNotFoundException')
			// We can't find the resource that you asked for.
			// Deal with the exception here, and/or rethrow at your discretion.
			throw err;
	}
};

export const encrypt = async (source: string) => {
	try {
		const params = {
			KeyId: 'alias/pims-refreshToken',
			Plaintext: source
		};

		const { CiphertextBlob } = await kmsClient.encrypt(params).promise();

		// store encrypted data as base64 encoded string
		return CiphertextBlob?.toString('base64');
	} catch (err) {
		log.debug(err, 'Error');
	}
};

export const decrypt = async (source: string) => {
	try {
		const params = {
			CiphertextBlob: Buffer.from(source, 'base64')
		};

		const { Plaintext } = await kmsClient.decrypt(params).promise();
		return Plaintext?.toString();
	} catch (err) {
		log.debug(err, 'Error');
	}
};
