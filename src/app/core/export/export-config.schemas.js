/**
 * @type {import('json-schema').JSONSchema7}
 */
module.exports.request = {
	$schema: 'http://json-schema.org/draft-07/schema',
	$id: 'node-rest-server/src/app/core/export-config/request',
	type: 'object',
	title: 'Export Config Request Schema',
	description: 'Schema for export config request',
	required: ['type'],
	properties: {
		type: {
			$id: '#/properties/type',
			type: 'string',
			title: 'Type',
			description: 'type of the export request',
			default: '',
			examples: ['user']
		}
	}
};
