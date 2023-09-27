import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';
import { IConnection } from '../providers/loadboards/CommonTypes';

export const generateConnection = (howMany = 1) => {
	const connectionsArr: IConnection[] = [];

	for (let i = 1; i <= howMany; i++) {
		const connection: IConnection = {
			id: uuidv4(),
			providerName: faker.company.name(),
			consumerId: faker.datatype.uuid(),
			search: {
				includeLoadsWithoutWeight: faker.datatype.boolean(),
				loadSize: faker.random.word(),
				origin: {},
				destination: {},
				equipmentTypes: [],
				includeLoadsWithoutLength: faker.datatype.boolean(),
				pickupDates: []
			},
			attributes: {
				accessToken: uuidv4(),
				refreshToken: uuidv4(),
				pickupDateDays: parseInt(faker.random.numeric(1))
			},
			createdAt: new Date(Date.now()).getTime(),
			updatedAt: new Date(Date.now()).getTime(),
			enabled: faker.datatype.boolean()
		};

		connectionsArr.push(connection);
	}

	return connectionsArr;
};
