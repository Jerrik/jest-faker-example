import { dynamodb } from '../libs/dynamodb';
import { getFormattedLocation, log as logger } from '../libs/logger';

const log = logger.child({
	name: getFormattedLocation(__filename)
});

export const getConnectionsList = async () => {
	try {
		const params = {
			TableName: process.env.CONNECTIONS_TABLE ?? '',
			FilterExpression: '#enabled = :enabled_val',
			ExpressionAttributeNames: {
				'#enabled': 'enabled'
			},
			ExpressionAttributeValues: { ':enabled_val': true }
		};
		const list = await dynamodb
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
					body: 'Could not fetch the connection.' + err.message
				};
			});
		return list;
	} catch (err) {
		log.error(err, 'Error');
		return {
			statusCode: err.statusCode || 501,
			body: 'Could not fetch the connection.' + err.message
		};
	}
};
