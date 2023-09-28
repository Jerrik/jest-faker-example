export interface IOrder {
	id: string;
	priority?: number;
	commodity?: string;
	bearingAngle: number;
	sourceName: string;
	status?: string;
	dateUpdated?: Date;
	mode: modeType;
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
		amount?: currency;
		distance?: measurement;
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
			types: trailerTypes[];
			length?: measurement;
			weight?: measurement;
			isSTFRequired: boolean; 
			isLiftGateRequired: boolean; 
			isAlchoholPermitRequired: boolean; 
			cleaning: boolean; 
			temperature?: {
				min?: measurement;
				max?: measurement;
				preCool?: measurement;
			};
		};
		isTanker: boolean; 
		isHazmat: boolean; 
		isTeam: boolean; 
		minimumCargoInsurance?: currency;
	};
	assignments?: IAssignment[];
}
export interface IAssignment {
	facility: {
		name?: string;
		address?: {
			street?: string;
			city: string;
			state: string;
			zip: string;
			country: string;
		};
		location: {
			lat: number;
			long: number;
		};
		times?: {
			open: Date | null;
			close: Date | null;
		};
		onSiteBreak?: boolean;
	};
	appointment: {
		open: Date | null;
		close: Date | null;
	};
	timezoneOffset?: number;
	orderId: string;
	sequence: number;
	stopType: stopTypes;
	loadType: loadTypes;
	notes?: string;
}

export interface ILoad {
	order: IOrder;
	assignments: IAssignment[];
}

export interface IConnection {
	id: string;
	providerName: string;
	consumerId: string;
	search: {
		includeLoadsWithoutWeight?: boolean;
		loadSize?: string;
		origin?: object;
		destination?: object;
		equipmentTypes?: string[];
		includeLoadsWithoutLength?: boolean;
		pickupDates?: string[];
	};
	attributes?: { accessToken: string; refreshToken: string; pickupDateDays?: number };
	updatedAt?: number;
	createdAt?: number;
	enabled?: boolean;
}
export interface IConsumer {
	id: string;
	name: string;
	api: string;
	exportEndpoint: string;
	attributes: object;
	providers: {
		[key: string]: {
			id: string;
			apiKey: string;
			apiSecret: string;
			attributes: unknown;
			enabled: boolean;
		};
	};
	enabled: boolean;
}

export interface IProvider {
	id: string;
	enabled: boolean;
	apiKey: unknown;
	apiSecret: unknown;
	attributes?: object;
}

export interface IConnectorResponse {
	count: number;
	loads: ILoad[];
	delta: string[];
}

export interface IFetchLoadsResponse {
	count: number;
	data: unknown[];
	pages: number;
}

export interface IMappedLoadsResponse {
	data: ILoad[];
	idList: string[];
}

export interface measurement {
	value: number | null;
	unit: string;
}

export interface currency {
	value: number | null;
	currency: string;
}
export interface IAuthResponse {
	success: boolean;
	accessToken: string;
}

export type ExporterResponse = { success: boolean; result: string };
export type ConnectorFunction = (
	connection: IConnection,
	consumer: IConsumer,
	providerId: string
) => Promise<IConnectorResponse>;
export type ExporterFunction = (
	connectorData: IConnectorResponse,
	consumer: IConsumer,
	providerId: string,
	connectionId: string
) => Promise<ExporterResponse>;

export type trailerTypes = 'Van' | 'Reefer' | 'Flatbed' | 'Other';
export type stopTypes = 'OR' | 'ST' | 'DS';
export type loadTypes = 'DH' | 'LL' | 'LU' | 'PL';
export type modeType = 'Road' | 'Rail';
