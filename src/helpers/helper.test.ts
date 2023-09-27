import * as Helper from './helper';

describe('Helpers', () => {
	describe('Test createTimeWindow', () => {
		it('Generates a time window based on given dateime ', () => {
			const givenTime = 'Wed, 14 Jun 2017 07:00:00 GMT';

			const expectedResult = {
				open: new Date('2017-06-14T07:00:00.000Z'),
				close: new Date('2017-06-14T07:30:00.000Z')
			};
			expect(Helper.createTimeWindow(new Date(givenTime), 30, 2)).toEqual(expectedResult);
		});
	});

	describe('Test calculateBearingAngle ', () => {
		it('Returns a bearing angle based from point A to point B', () => {
			const startLatitude = 16.705;
			const startLongitude = 74.2433;
			const destinationLatitude = 18.5204;
			const destinationLongitude = 73.8567;

			const expectedBearingAngle = 348.58434726647664;

			const bearingAngle = Helper.calculateBearingAngle(
				startLatitude,
				startLongitude,
				destinationLatitude,
				destinationLongitude
			);

			expect(bearingAngle).toEqual(expectedBearingAngle);
		});
	});

	describe('Calculate RPM ', () => {
		it('Calculates RPM', () => {
			const RPM = Helper.calculateRPM(100, 10);
			expect(RPM).toEqual(10);
		});
		it('Handles bad data', () => {
			const RPM = Helper.calculateRPM(null, '');
			expect(RPM).toEqual(0);
		});
	});

	describe('generatePickupDates ', () => {
		it('Generate Dates', () => {
			jest.spyOn(global.Date, 'now').mockImplementation(() => new Date('2022-11-11T11:11:11.111Z').valueOf());
			const pickupDates = Helper.generatePickupDates(3);
			const expectedPickupDates = [
				'Fri, 11 Nov 2022 11:11:11 GMT',
				'Sat, 12 Nov 2022 11:11:11 GMT',
				'Sun, 13 Nov 2022 11:11:11 GMT'
			];
			expect(pickupDates).toEqual(expectedPickupDates);
		});
		it('Generate empty Dates', () => {
			const pickupDates = Helper.generatePickupDates();
			expect(pickupDates).toEqual([]);
		});
	});
});
