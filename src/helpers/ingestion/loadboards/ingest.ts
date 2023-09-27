import { getFormattedLocation, log as logger } from '../../../libs/logger';
import {
	ConnectorFunction,
	ExporterFunction,
	IConnection,
	IConnectorResponse,
	IConsumer
} from '../../../providers/loadboards/CommonTypes';

const log = logger.child({
	name: getFormattedLocation(__filename)
});

export const ingest = async (
	connection: IConnection,
	consumer: IConsumer,
	providerId: string,
	connector: ConnectorFunction,
	exporter: ExporterFunction
) => {
	log.info(`Processing connection: ${connection.id}`);

	let data = { success: true, result: 'No data aquired.' };
	try {
		const connectorData: IConnectorResponse = await connector(connection, consumer, providerId);
		if (connectorData.count > 0) {
			log.info(`Extracted loads: ${connectorData.count}`);
			const exporterResults = await exporter(connectorData, consumer, providerId, connection.id);
			data = exporterResults;
		}
	} catch (error) {
		log.error(`Failed to process connection: ${connection.id}`);
		log.error(error);
	}

	return data;
};
