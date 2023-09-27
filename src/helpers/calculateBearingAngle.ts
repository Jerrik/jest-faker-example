import { getFormattedLocation, log as logger } from '../libs/logger';

const log = logger.child({
	name: getFormattedLocation(__filename)
});

const toRadians = (degrees: number) => {
	return (degrees * Math.PI) / 180;
};

const toDegrees = (radians: number) => {
	return (radians * 180) / Math.PI;
};

export const calculateBearingAngle = (startLat: number, startLng: number, destLat: number, destLng: number) => {
	try {
		const startLatRadian = toRadians(startLat);
		const startLngRadian = toRadians(startLng);
		const destLatRadian = toRadians(destLat);
		const destLngRadian = toRadians(destLng);
		const y = Math.sin(destLngRadian - startLngRadian) * Math.cos(destLatRadian);
		const x =
			Math.cos(startLatRadian) * Math.sin(destLatRadian) -
			Math.sin(startLatRadian) * Math.cos(destLatRadian) * Math.cos(destLngRadian - startLngRadian);
		let brng = Math.atan2(y, x);
		brng = toDegrees(brng);
		return (brng + 360) % 360;
	} catch (err) {
		log.error('Bearing Angle calculation Failed');
	}
};
