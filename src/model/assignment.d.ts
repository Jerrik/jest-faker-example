interface DAssignment {
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
	stopType: DStopTypes;
	loadType: DLoadTypes;
	notes?: string;
}
