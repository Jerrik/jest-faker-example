module.exports = {
	tables: [
		{
			TableName: `custom-api-dev-connections`,
			KeySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
			AttributeDefinitions: [{ AttributeName: 'id', AttributeType: 'S' }],
			ProvisionedThroughput: { ReadCapacityUnits: 1, WriteCapacityUnits: 1 }
		},

		{
			TableName: `custom-api-dev-providers`,
			KeySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
			AttributeDefinitions: [{ AttributeName: 'id', AttributeType: 'S' }],
			ProvisionedThroughput: { ReadCapacityUnits: 1, WriteCapacityUnits: 1 }
		},

		{
			TableName: `custom-api-dev-consumers`,
			KeySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
			AttributeDefinitions: [{ AttributeName: 'id', AttributeType: 'S' }],
			ProvisionedThroughput: { ReadCapacityUnits: 1, WriteCapacityUnits: 1 }
		}
	]
};
