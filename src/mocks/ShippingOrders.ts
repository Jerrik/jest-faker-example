import { faker } from '@faker-js/faker';
import { IOrder, modeType, trailerTypes } from '../CommonTypes';

export const generateOrders = (howMany) => {
	const ordersArr: IOrder[] = [];
	const equipmentTypes: trailerTypes[] = ['Van', 'Reefer', 'Flatbed', 'Other'];

	for (let i = 1; i <= howMany; i++) {
		const order: IOrder = {
			id: faker.datatype.uuid(),
			priority: 0,
			commodity: faker.commerce.productMaterial(), // TODO - Should be array; Send to TG as array
			bearingAngle: parseInt(faker.random.numeric(2)),
			sourceName: faker.company.name(),
			status: faker.random.word(),
			dateUpdated: faker.date.recent(),
			mode: 'Road' as modeType,
			dateBooked: faker.date.recent(),
			dateOffered: faker.date.recent(),
			shipper: {
				id: faker.datatype.uuid(),
				name: faker.company.name(),
				contact: {
					phone: faker.phone.number(),
					email: faker.internet.email()
				}
			},
			revenue: {
				type: faker.lorem.word(),
				code: faker.random.alphaNumeric(5),
				description: faker.lorem.sentence(),
				amount: {
					value: parseInt(faker.finance.amount()),
					currency: faker.finance.currencyCode()
				},
				distance: {
					value: parseInt(faker.random.numeric()),
					unit: 'Miles'
				}
			},
			booking: {
				types: {
					api: faker.datatype.boolean(),
					bid: faker.datatype.boolean(),
					call: faker.datatype.boolean()
				},
				url: faker.internet.url()
			},
			requirements: {
				trailer: {
					types: [equipmentTypes[faker.datatype.number({ max: equipmentTypes.length - 1 })]],
					length: {
						value: parseInt(faker.random.numeric()),
						unit: 'Miles'
					},
					weight: {
						value: parseInt(faker.random.numeric()),
						unit: 'Lbs'
					},
					isSTFRequired: faker.datatype.boolean(),
					isLiftGateRequired: faker.datatype.boolean(),
					isAlchoholPermitRequired: faker.datatype.boolean(),
					cleaning: faker.datatype.boolean(),
					temperature: {
						min: {
							value: parseInt(faker.random.numeric()),
							unit: faker.datatype.boolean() ? 'F' : 'C'
						},
						max: {
							value: parseInt(faker.random.numeric()),
							unit: faker.datatype.boolean() ? 'F' : 'C'
						},
						preCool: {
							value: parseInt(faker.random.numeric()),
							unit: faker.datatype.boolean() ? 'F' : 'C'
						}
					}
				},
				isTanker: faker.datatype.boolean(),
				isHazmat: faker.datatype.boolean(),
				isTeam: faker.datatype.boolean(),
				minimumCargoInsurance: {
					value: parseInt(faker.finance.amount()),
					currency: 'USD'
				}
			},
			assignments: []
		};
		ordersArr.push(order);
	}

	return ordersArr;
};
