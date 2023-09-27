import { dynamodb } from '../libs/dynamodb';
import { getFormattedLocation, log as logger } from '../libs/logger';

const log = logger.child({
	name: getFormattedLocation(__filename)
});

export const getConsumerDetail = async (consumerId: string) => {
	try {
		const params = {
			TableName: process.env.CONSUMERS_TABLE ?? '',
			Key: {
				id: consumerId
			}
		};

		const consumerDetail = await dynamodb
			.get(params)
			.promise()
			.then(async (result) => {
				if (result.Item) {
					return {
						statusCode: 200,
						body: JSON.stringify(result.Item)
					};
				}
			})
			.catch((err) => {
				return {
					statusCode: err.statusCode || 501,
					body: 'Could not fetch the consumer.' + err.message
				};
			});
		return consumerDetail;
	} catch (err) {
		log.error(err, 'Error');
		return {
			statusCode: err.statusCode || 501,
			body: 'Could not fetch the consumer.' + err.message
		};
	}
};

export const getConsumersList = async () => {
	try {
		const params = {
			TableName: process.env.CONSUMERS_TABLE ?? ''
		};
		const consumersList = await dynamodb
			.scan(params)
			.promise()
			.then((result) => {
				return {
					statusCode: 200,
					body: JSON.stringify(result.Items)
				};
			})
			.catch((err) => {
				return {
					statusCode: err.statusCode || 501,
					body: 'Could not fetch the consumer.' + err.message
				};
			});
		return consumersList;
	} catch (err) {
		log.error(err, 'Error');
		return {
			statusCode: err.statusCode || 501,
			body: 'Could not fetch the consumer.' + err.message
		};
	}
};

export const updateConsumerDetailS = async (consumer) => {
	const timestamp = new Date().getTime();
	const params = {
		TableName: process.env.CONSUMERS_TABLE ?? '',
		Key: {
			id: consumer.id
		},
		ExpressionAttributeNames: {
			'#consumer_name': 'name',
			'#consumer_api': 'api',
			'#consumer_exportEndpoint': 'exportEndpoint',
			'#consumer_attributes': 'attributes',
			'#consumer_providers': 'providers',
			'#consumer_enabled': 'enabled'
		},
		ExpressionAttributeValues: {
			':name': consumer.name,
			':api': consumer.api,
			':exportEndpoint': consumer.exportEndpoint,
			':attributes': consumer.attributes,
			':providers': consumer.providers,
			':updatedAt': timestamp,
			':enabled': consumer.enabled
		},
		UpdateExpression:
			'SET #consumer_name = :name, #consumer_api = :api,#consumer_exportEndpoint = :exportEndpoint, #consumer_attributes = :attributes, #consumer_providers = :providers, updatedAt = :updatedAt,#consumer_enabled = :enabled',
		ReturnValues: 'ALL_NEW'
	};

	try {
		return await dynamodb
			.update(params)
			.promise()
			.then((result) => {
				return {
					statusCode: 200,
					body: JSON.stringify(result.Attributes)
				};
			})
			.catch((err) => {
				return {
					statusCode: err.statusCode || 501,
					body: 'Could not update the consumer.' + err.message
				};
			});
	} catch (err) {
		log.error(err, 'Error');
		return {
			statusCode: err.statusCode || 501,
			body: 'Could not update the consumer.' + err.message
		};
	}
};

export const updateConsumerTokens = async (consumer) => {
	const timestamp = new Date().getTime();
	const params = {
		TableName: process.env.CONSUMERS_TABLE ?? '',
		Key: {
			id: consumer.id
		},
		ExpressionAttributeNames: {
			'#consumer_providers': 'providers'
		},
		ExpressionAttributeValues: {
			':providers': consumer.providers,
			':updatedAt': timestamp
		},
		UpdateExpression: 'SET #consumer_providers = :providers, updatedAt = :updatedAt',
		ReturnValues: 'ALL_NEW'
	};

	try {
		return await dynamodb
			.update(params)
			.promise()
			.then((result) => {
				return {
					statusCode: 200,
					body: JSON.stringify(result.Attributes)
				};
			})
			.catch((err) => {
				return {
					statusCode: err.statusCode || 501,
					body: 'Could not update the consumer.' + err.message
				};
			});
	} catch (err) {
		log.error(err, 'Error');
		return {
			statusCode: err.statusCode || 501,
			body: 'Could not update the consumer.' + err.message
		};
	}
};
