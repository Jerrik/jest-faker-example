interface DOrder {
	id: string;
	priority?: number;
	commodity?: string; // TODO - Should be array; Send to TG as array
	bearingAngle: number;
	sourceName: string;
	status?: string;
	dateUpdated?: Date;
	mode: DModeType;
	dateBooked?: Date;
	dateOffered?: Date;
	shipper?: {
		id: string;
		name?: string;
		contact?: {
			phone?: string;
			email?: string;
		};
	};
	revenue?: {
		type?: string;
		code: string;
		description: string;
		amount?: DCurrency;
		distance?: DMeasurement;
	};
	booking?: {
		types: {
			api: boolean;
			bid: boolean;
			call: boolean;
		};
		url?: string;
	};
	requirements: {
		trailer: {
			types: DTrailerTypes[];
			length: DMeasurement;
			weight: DMeasurement;
			isSTFRequired: boolean;
			isLiftGateRequired: boolean;
			isAlchoholPermitRequired: boolean;
			cleaning: boolean;
			temperature?: {
				min?: DMeasurement;
				max?: DMeasurement;
				preCool?: DMeasurement;
			};
		};
		isTanker: boolean;
		isHazmat: boolean;
		isTeam: boolean;
		minimumCargoInsurance?: DCurrency;
	};
	assignments?: DAssignment[];
}
