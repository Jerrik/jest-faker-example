module.exports = {
	tables: [
		{
			TableName: `pims-api-dev-connections`,
			KeySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
			AttributeDefinitions: [{ AttributeName: 'id', AttributeType: 'S' }],
			ProvisionedThroughput: { ReadCapacityUnits: 1, WriteCapacityUnits: 1 }
		},

		{
			TableName: `pims-api-dev-providers`,
			KeySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
			AttributeDefinitions: [{ AttributeName: 'id', AttributeType: 'S' }],
			ProvisionedThroughput: { ReadCapacityUnits: 1, WriteCapacityUnits: 1 }
		},

		{
			TableName: `pims-api-dev-consumers`,
			KeySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
			AttributeDefinitions: [{ AttributeName: 'id', AttributeType: 'S' }],
			ProvisionedThroughput: { ReadCapacityUnits: 1, WriteCapacityUnits: 1 }
		}
	]
};
