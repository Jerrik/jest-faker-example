interface Iload {
	loadDetails: {
		temperatureSettings: {
			minimumTemperature: {
				value: number;
				unit: string;
			};
			maximumTemperature: {
				value: number;
				unit: string;
			};
		};
	};
}

export const formatTempUnit = (load: Iload) => {
	let Temperature = '';

	// Replace minimumTemperature unit from “Fahrenheit” and “Celsius” to “F” and “C”
	if (load.loadDetails.temperatureSettings.minimumTemperature) {
		switch (load.loadDetails.temperatureSettings.minimumTemperature.unit) {
			case 'Fahrenheit':
				load.loadDetails.temperatureSettings.minimumTemperature.unit =
					load.loadDetails.temperatureSettings.minimumTemperature.unit.replace('Fahrenheit', 'F');
				break;
			case 'Celsius':
				load.loadDetails.temperatureSettings.minimumTemperature.unit =
					load.loadDetails.temperatureSettings.minimumTemperature.unit.replace('Celsius', 'C');
				break;
		}
	}

	// Replace maximumTemperature unit from “Fahrenheit” and “Celsius” to “F” and “C”
	if (load.loadDetails.temperatureSettings.maximumTemperature) {
		switch (load.loadDetails.temperatureSettings.maximumTemperature.unit) {
			case 'Fahrenheit':
				load.loadDetails.temperatureSettings.maximumTemperature.unit =
					load.loadDetails.temperatureSettings.maximumTemperature.unit.replace('Fahrenheit', 'F');
				break;

			case 'Celsius':
				load.loadDetails.temperatureSettings.maximumTemperature.unit =
					load.loadDetails.temperatureSettings.maximumTemperature.unit.replace('Celsius', 'C');
				break;
		}
	}

	let minimumTemperature = '';
	// set minTemp index in array
	if (load.loadDetails.temperatureSettings.minimumTemperature) {
		minimumTemperature =
			load.loadDetails.temperatureSettings.minimumTemperature.value +
			load.loadDetails.temperatureSettings.minimumTemperature.unit;
	}

	let maximumTemperature = '';
	// set maxTemp index in array
	if (load.loadDetails.temperatureSettings.maximumTemperature) {
		maximumTemperature =
			load.loadDetails.temperatureSettings.maximumTemperature.value +
			load.loadDetails.temperatureSettings.maximumTemperature.unit;
	}

	// set temperature index in array
	if (minimumTemperature == '' && maximumTemperature == '') {
		Temperature = '';
	} else if (minimumTemperature == '' && maximumTemperature != '') {
		Temperature = maximumTemperature;
	} else if (minimumTemperature != '' && maximumTemperature == '') {
		Temperature = minimumTemperature;
	} else if (minimumTemperature != '' && maximumTemperature != '') {
		Temperature = minimumTemperature + '!' + maximumTemperature;
	}
	return Temperature;
};
