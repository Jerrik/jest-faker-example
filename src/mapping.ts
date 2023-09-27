import { calculateBearingAngle } from '../../../helpers/helper';
import { ICoyoteLoad, ICoyoteStop } from './types';

const produceStopType = (rawStop: ICoyoteStop, stopsAmount: number): DStopTypes => {
	let stopType: DStopTypes = 'OR';

	if (rawStop.sequence == stopsAmount) {
		stopType = 'DS';
	} else if (rawStop.sequence != 1) {
		stopType = 'ST';
	}

	return stopType;
};

const produceLoadType = (rawStop: ICoyoteStop, stopType: DStopTypes): DLoadTypes => {
	const hasStopAttributes = rawStop.stopDetails.stopAttributes !== null ? true : false;
	let loadType;

	if (stopType == 'OR') {
		if (hasStopAttributes && rawStop.stopDetails.stopAttributes?.dropTrailerRequired) {
			loadType = 'PL';
		} else {
			loadType = 'LL';
		}
	}
	if (stopType == 'ST') {
		if (hasStopAttributes && rawStop.stopDetails.stopAttributes?.dropTrailerRequired) {
			loadType = 'DH';
		} else {
			loadType = 'LU';
		}
	}

	if (stopType == 'DS') {
		if (hasStopAttributes && rawStop.stopDetails.stopAttributes?.dropTrailerRequired) {
			loadType = 'DH';
		} else {
			loadType = 'LU';
		}
	}

	return loadType;
};

const produceStreetAddress = (address) => {
	const streetProperties = ['line1', 'line2', 'line3'];
	let street = '';

	streetProperties.forEach(function (line, i) {
		if (line in address && address[line]) {
			if (i == 0) {
				street = `${address[line]}`;
			} else {
				street = `${street}, ${address[line]}`;
			}
		}
	});

	return street;
};

const produceTrailerType = (load: ICoyoteLoad): DTrailerTypes[] => {
	const typesResponse = {
		V: 'Van',
		R: 'Reefer',
		F: 'Flatbed'
	};
	const typesArr = load.loadDetails.equipment.equipmentType.split(',');

	const type: DTrailerTypes[] = [];

	typesArr.forEach((element) => {
		if (element in typesResponse) {
			type.push(typesResponse[element]);
		} else {
			type.push('Other');
		}
	});

	return type;
};

const produceTemperature = (load: ICoyoteLoad) => {
	const temperatureSettings = load.loadDetails.temperatureSettings;

	const minimum: null | DMeasurement = temperatureSettings.minimumTemperature;
	const maximum: null | DMeasurement = temperatureSettings.maximumTemperature;
	const preCool: null | DMeasurement = temperatureSettings.preCoolTemperature;

	const sanitize = (string) => {
		const cleanString = string.replace(/'Farenheight'/g, 'F').replace(/'Celsius'/g, 'C');
		return cleanString;
	};

	const result: { min?: DMeasurement; max?: DMeasurement; preCool?: DMeasurement } = {};

	if (minimum !== null) {
		minimum.unit = sanitize(minimum.unit);
		result.min = minimum;
	}

	if (maximum !== null) {
		maximum.unit = sanitize(maximum.unit);
		result.max = maximum;
	}

	if (preCool !== null) {
		preCool.unit = sanitize(preCool.unit);
		result.preCool = preCool;
	}

	return result;
};

const getBearingAngle = (load) => {
	let ba = 0;

	if (load.stops.length) {
		const origin = load.stops.find((obj) => {
			return obj.sequence === 1;
		});

		const destination = load.stops.reduce((max, stop) => (max.sequence > stop.sequence ? max : stop));

		if (typeof origin === 'object' && typeof destination === 'object') {
			ba = calculateBearingAngle(
				origin.facility.geoCoordinates.latitude,
				origin.facility.geoCoordinates.longitude,
				destination.facility.geoCoordinates.latitude,
				destination.facility.geoCoordinates.longitude
			);
		}
	}

	return ba;
};

export const getAssignmentDataObject = (load: ICoyoteLoad, stop: ICoyoteStop): DAssignment => {
	const stopType = produceStopType(stop, load.stops.length);

	const assignment: DAssignment = {
		facility: {
			name: stop.facility.name,
			address: {
				street: produceStreetAddress(stop.facility.address),
				city: stop.facility.address.cityName,
				state: stop.facility.address.stateProvinceCode,
				zip: stop.facility.address.postalCode,
				country: stop.facility.address.countryCode
			},
			location: {
				lat: stop.facility.geoCoordinates.latitude,
				long: stop.facility.geoCoordinates.longitude
			},
			times: {
				open:
					stop.appointment.facilityOpenDateTimeUtc !== null ? new Date(stop.appointment.facilityOpenDateTimeUtc) : null,
				close:
					stop.appointment.facilityCloseDateTimeUtc !== null
						? new Date(stop.appointment.facilityCloseDateTimeUtc)
						: null
			}
		},
		appointment: {
			open:
				stop.appointment.appointmentStartDateTimeUtc !== null
					? new Date(stop.appointment.appointmentStartDateTimeUtc)
					: null,
			close:
				stop.appointment.appointmentStartDateTimeUtc !== null
					? new Date(stop.appointment.appointmentStartDateTimeUtc)
					: null
		},
		orderId: load.loadId.toString(),
		sequence: stop.sequence,
		stopType: stopType,
		loadType: produceLoadType(stop, stopType),
		notes: stop.stopDetails.stopNotes
	};

	return assignment;
};

export const getOrderDataObject = async (load: ICoyoteLoad): Promise<DOrder> => {
	const stopDetails = load.stops[0].stopDetails;
	const liftgatePickup = stopDetails.stopAttributes !== null ? stopDetails.stopAttributes.liftgatePickup : false;
	const liquorPermit = stopDetails.stopAttributes !== null ? stopDetails.stopAttributes.liquorPermit : false;

	const order: DOrder = {
		id: String(load.loadId),
		mode: 'Road',
		commodity: load.stops[0].stopDetails.commodities[0].description, // TODO possibility of more than one
		bearingAngle: getBearingAngle(load),
		sourceName: 'Coyote',
		requirements: {
			trailer: {
				types: produceTrailerType(load),
				length: {
					value: load.loadDetails?.equipment?.equipmentLength?.value,
					unit: load.loadDetails?.equipment?.equipmentLength?.unit
				},
				weight: {
					value: load.loadDetails?.weight?.value,
					unit: load.loadDetails?.weight?.unit
				},
				isSTFRequired: false, // TODO verify logic
				isLiftGateRequired: liftgatePickup, // TODO verify logic
				isAlchoholPermitRequired: liquorPermit, // TODO verify logic
				cleaning: false // TODO verify logic
			},
			isTanker: load.loadDetails.loadAttributes.tankerEndorsement,
			isHazmat: load.loadDetails.loadAttributes.hazmatEndorsement,
			isTeam: load.loadDetails.loadAttributes.team
		},
		revenue: {
			type: '',
			code: '',
			description: '',
			amount: {
				value: load.loadDetails.rate.value ?? 0,
				currency: load.loadDetails.rate.currencyType !== 'Undefined' ? load.loadDetails.rate.currencyType : ''
			},
			distance: {
				value: load.loadDetails.rate.value ?? 0,
				unit: load.loadDetails.loadDistance.unit ?? 'Miles'
			}
		}
	};

	const temperature = produceTemperature(load);
	if (Object.keys(temperature).length > 0) {
		order.requirements.trailer.temperature = temperature;
	}

	return order;
};
