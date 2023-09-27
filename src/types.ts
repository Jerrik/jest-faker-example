export interface ICoyoteStop {
	sequence: number;
	stopType: string;
	facility: {
		name: string;
		address: {
			line1: string;
			line2: null | string;
			line3: null | string;
			postalCode: string;
			cityName: string;
			stateProvinceCode: string;
			countryCode: string;
		};
		geoCoordinates: {
			latitude: number;
			longitude: number;
		};
		timeZoneOffset: string;
	};
	appointment: {
		facilityOpenDateTimeUtc: string | null;
		facilityCloseDateTimeUtc: string | null;
		appointmentStartDateTimeUtc: string | null;
		appointmentEndDateTimeUtc: string | null;
	};
	stopDetails: {
		commodities: {
			description: string;
			weight: {
				value: number;
				unit: string;
			};
		}[];
		stopAttributes: {
			blind: boolean;
			closedToeShoes: boolean;
			detentionAuthFormRequired: boolean;
			driverAssist: boolean;
			dropAndHook: boolean;
			dropTrailerAllowXHoursToUnload: number;
			dropTrailerRequired: boolean;
			earPlugs: boolean;
			englishSpeaking: boolean;
			escortOrTwicRequired: boolean;
			exitPass: boolean;
			government: boolean;
			hardHat: boolean;
			inOutTimesWSignature: boolean;
			insideDelivery: boolean;
			insidePickup: boolean;
			legalScaleOnSite: boolean;
			liftgateDelivery: boolean;
			liftgatePickup: boolean;
			limitedAccessDeliveryAirport: boolean;
			limitedAccessDeliveryChurch: boolean;
			limitedAccessDeliveryConstructionSite: boolean;
			limitedAccessDeliveryFarm: boolean;
			limitedAccessDeliveryMilitaryBase: boolean;
			limitedAccessDeliveryMineSite: boolean;
			limitedAccessDeliveryMiniStorage: boolean;
			limitedAccessDeliveryOther: boolean;
			limitedAccessDeliveryPrison: boolean;
			limitedAccessDeliveryRemoteGovt: boolean;
			limitedAccessDeliverySchool: boolean;
			limitedAccessPickupAirport: boolean;
			limitedAccessPickupChurch: boolean;
			limitedAccessPickupConstructionSite: boolean;
			limitedAccessPickupFarm: boolean;
			limitedAccessPickupMilitaryBase: boolean;
			limitedAccessPickupMineSite: boolean;
			limitedAccessPickupMiniStorage: boolean;
			limitedAccessPickupOther: boolean;
			limitedAccessPickupPrison: boolean;
			limitedAccessPickupRemoteGovt: boolean;
			limitedAccessPickupSchool: boolean;
			liquorPermit: boolean;
			loadedToLegalWeight: boolean;
			longPants: boolean;
			longSleeves: boolean;
			lumperReceiptRequired: boolean;
			mustCheckInAsCoyote: boolean;
			mustProvideAndApplySeal: boolean;
			mustSecureLoad: boolean;
			needCoyoteApprovalToUseLumperService: boolean;
			noAnimals: boolean;
			noDetention: boolean;
			noEarlyDeliveries: boolean;
			noLoadLocksOrStraps: boolean;
			noSameDayReschedules: boolean;
			notAllowedOnDock: boolean;
			noTankTops: boolean;
			noTrailerDetentionOrLayover: boolean;
			noWorkIns: boolean;
			onSiteParkingAvailable: boolean;
			overnightParkingAvailable: boolean;
			payLumperWCashTCheck: boolean;
			preLoadDropTrailerXHoursInAdvance: number;
			prePaidLumperService: boolean;
			residentialDelivery: boolean;
			residentialPickup: boolean;
			safetyGlasses: boolean;
			safetyVest: boolean;
			scaleEmpty: boolean;
			scaleHeavy: boolean;
			secureYard: boolean;
			sortAndSegregateDelivery: boolean;
			sortAndSegregatePickup: boolean;
			spanishSpeaking: boolean;
			steelToeShoes: boolean;
			strictAppt: boolean;
			tradeshowDelivery: boolean;
			tradeshowPickup: boolean;
			trailerInspectionFormRequired: boolean;
			twic: boolean;
			twicRequiredNoEscorts: boolean;
			uiia: boolean;
			unpackDetrash: boolean;
			usCitizen: boolean;
			validUSCommercialDriversLicenseHardcopy: boolean;
			xTankOfFuelAtShipper: number;
		} | null;
		stopNotes: string;
		workType: string;
		genericAttributes: any[];
	};
}

export interface ICoyoteLoad {
	loadId: number;
	loadDetails: {
		rate: {
			value: number | null;
			currencyType: string;
		};
		mode: string;
		equipment: {
			equipmentHeight: {
				value: number;
				unit: string;
			};
			equipmentLength: {
				value: number;
				unit: string;
			};
			equipmentType: string;
			equipmentWidth: {
				value: number;
				unit: string;
			};
		};
		loadDistance: {
			value: number;
			unit: string;
		};
		weight: {
			value: number;
			unit: string;
		};
		temperatureSettings: {
			preCoolTemperature: DMeasurement | null;
			maximumTemperature: DMeasurement | null;
			minimumTemperature: DMeasurement | null;
		};
		loadAttributes: {
			airRide: boolean;
			blind: boolean;
			bondedCarrier: boolean;
			borderCrossingByCoyote: boolean;
			borderCrossingByCustomer: boolean;
			coyoteGo: boolean;
			crossBorderMexico: boolean;
			ctpat: boolean;
			disasterRelief: boolean;
			doubleBlind: boolean;
			doubleTrailer: boolean;
			drayage: boolean;
			duraplate: boolean;
			englishSpeaking: boolean;
			exitPass: boolean;
			fast: boolean;
			fdaClearanceRequired: boolean;
			floodRelief: boolean;
			govt: boolean;
			guaranteed: boolean;
			haccp: boolean;
			hazmatEndorsement: boolean;
			hvhr: boolean;
			hvhrPlus: boolean;
			intraMexico: boolean;
			liquor: boolean;
			neec: boolean;
			noCameraPhonePhotosOfPaperwork: boolean;
			overDimension: boolean;
			palletJack: boolean;
			partialLoad: boolean;
			pipOrPep: boolean;
			powerOnly: boolean;
			ppe: boolean;
			protectFromFreeze: boolean;
			repairReceiptRequiredForBreakdowns: boolean;
			seal: boolean;
			secondaryBorderInspection: boolean;
			tankerEndorsement: boolean;
			tcr: boolean;
			team: boolean;
			techTrackingRequired: boolean;
			tradeShow: boolean;
			trailerControl: boolean;
			transloadByCoyote: boolean;
			transloadByCustomer: boolean;
			tripleTrailer: boolean;
			twic: boolean;
			uiia: boolean;
		};
		genericAttributes: { key: string; displayText: string }[] | never[];
	};
	stops: ICoyoteStop[];
}

export interface ICoyoteSearch {
	origin: {
		location: {
			latitude: number;
			longitude: number;
		};
		deadheadRadius: {
			value: number;
			unit: string;
		};
		appointment: {
			appointmentStartDateTime: string;
			appointmentEndDateTime: string;
		};
	};
	destination?: {
		location: {
			latitude: number;
			longitude: number;
		};
		deadheadRadius: {
			value: number;
			unit: string;
		};
		appointment: {
			appointmentStartDateTime: string;
			appointmentEndDateTime: string;
		};
	};
	equipmentType: equipmentTypes;
	mode: modes;
}

type modes = 'TL_LTL' | 'TL' | 'LTL';

type equipmentTypes =
	| 'V'
	| 'R'
	| 'F'
	| 'VR'
	| 'C'
	| 'SD'
	| 'DF'
	| 'DD'
	| 'SS'
	| 'FT'
	| 'E'
	| 'T'
	| 'B'
	| 'Z'
	| 'M'
	| 'Q'
	| 'P'
	| 'CNRU'
	| 'CPPU'
	| 'CSXU'
	| 'EMHU'
	| 'EMPU'
	| 'EMWU'
	| 'EPTY'
	| 'PACU'
	| 'W'
	| 'G'
	| 'K'
	| 'DR'
	| 'H'
	| 'FWS'
	| 'BT'
	| 'ZS'
	| 'XM'
	| 'MV'
	| 'MF'
	| 'FM'
	| 'DV'
	| 'LALL'
	| 'SDL'
	| 'A'
	| 'BL'
	| 'RC'
	| 'HS'
	| 'GM'
	| 'GS'
	| 'FS'
	| 'SDS'
	| 'RTC'
	| 'RTB'
	| 'WFB'
	| 'PO'
	| 'DDT'
	| 'DDB'
	| 'DDF'
	| 'SFB'
	| 'SFC'
	| 'RBC'
	| 'FB'
	| 'FBT'
	| 'FBX'
	| 'SKC'
	| 'LL'
	| 'LLS'
	| 'LLX'
	| 'TKC'
	| 'TKF'
	| 'IM'
	| 'IMF';
