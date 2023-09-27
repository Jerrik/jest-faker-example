import { faker } from '@faker-js/faker';
import { IAssignment, loadTypes, stopTypes } from '../providers/loadboards/CommonTypes';
export const generateAssignments = (howMany, orderId = faker.datatype.uuid()) => {
	const assignmentsArr: IAssignment[] = [];
	for (let i = 1; i <= howMany; i++) {
		const stopType: stopTypes = () => {
			let type: stopTypes = 'ST';
			if (i == 1) {
				type = 'OR';
			} else if (i == howMany) {
				type = 'DS';
			}

			return type;
		};

		const assignment: IAssignment = {
			facility: {
				name: faker.company.name(),
				address: {
					street: faker.address.streetAddress(),
					city: faker.address.cityName(),
					state: faker.address.state(),
					zip: faker.address.zipCode(),
					country: 'US'
				},
				location: {
					lat: parseInt(faker.address.latitude()),
					long: parseInt(faker.address.longitude())
				},
				times: {
					open: faker.date.soon(),
					close: faker.date.soon(2)
				}
			},
			appointment: {
				open: faker.date.soon(),
				close: faker.date.soon(2)
			},
			orderId: orderId,
			sequence: i,
			stopType: stopType(),
			loadType: 'LL' as loadTypes,
			notes: faker.lorem.paragraph()
		};
		assignmentsArr.push(assignment);
	}
	return assignmentsArr;
};
