import { getAssignmentDataObject, getOrderDataObject } from './mapping';
import coyoteData from './mocks/coyoteData.json';
import { expectedAssignments } from './mocks/expectedAssignments';
import expectedOrders from './mocks/expectedOrders.json';
import { ICoyoteLoad } from './types';

describe('Coyote', () => {
	describe('Orders', () => {
		test('Mapped order with getOrderDataObject.', async () => {
			const mockedData: ICoyoteLoad = coyoteData.loads[0];
			const OrderData: DOrder = await getOrderDataObject(mockedData);
			expect(OrderData).toEqual(expectedOrders[0]);
		});
	});

	describe('Assignments', () => {
		test('Origin mapped', async () => {
			const getNow = () => new Date(Date.now());
			jest.spyOn(global.Date, 'now').mockImplementation(() => new Date('2022-11-11T11:11:11.111Z').valueOf());

			expectedAssignments[0].appointment.open = null;
			expectedAssignments[0].appointment.close = null;

			const AssignmentData: DAssignment = await getAssignmentDataObject(
				coyoteData.loads[0],
				coyoteData.loads[0].stops[0]
			);

			expect(AssignmentData).toEqual(expectedAssignments[0]);
		});

		test(' Destination mapped', async () => {
			const AssignmentData: DAssignment = await getAssignmentDataObject(
				coyoteData.loads[0],
				coyoteData.loads[0].stops[1]
			);

			expect(AssignmentData).toEqual(expectedAssignments[1]);
		});
	});
});
