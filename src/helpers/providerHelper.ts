import { dynamodb } from '../libs/dynamodb';
import { getFormattedLocation, log as logger } from '../libs/logger';

const log = logger.child({
	name: getFormattedLocation(__filename)
});

export const getProviderIdByName = async () => {
	try {
		const params = {
			TableName: process.env.PROVIDERS_TABLE ?? ''
		};

		const list = await dynamodb
			.scan(params)
			.promise()
			.then((result) => {
				if (result.Items && result.Items.length > 0) {
					const providers = result.Items.map((provider) => {
						return {
							id: provider.id,
							name: provider.name.toLowerCase()
						};
					});

					const providersObj = providers.reduce((obj, cur) => ({ ...obj, [cur.name]: cur }), {});

					return {
						statusCode: 200,
						body: JSON.stringify(providersObj)
					};
				} else {
					return {
						statusCode: 501,
						body: "Couldn't fetch the provider."
					};
				}
			})
			.catch((err) => {
				return {
					statusCode: err.statusCode || 501,
					body: "Couldn't fetch the provider." + err.message
				};
			});
		return list;
	} catch (err) {
		log.error(err, 'Error');
		return {
			statusCode: err.statusCode || 501,
			body: "Couldn't fetch the provider." + err.message
		};
	}
};

export const getProvider = async (providerId: string) => {
	try {
		const params = {
			TableName: process.env.PROVIDERS_TABLE ?? '',
			Key: {
				id: providerId
			}
		};
		const provider = await dynamodb
			.get(params)
			.promise()
			.then((result) => {
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
					body: "Couldn't fetch the provider." + err.message
				};
			});
		return provider;
	} catch (err) {
		log.error(err, 'Error');
		return {
			statusCode: err.statusCode || 501,
			body: "Couldn't fetch the provider." + err.message
		};
	}
};
