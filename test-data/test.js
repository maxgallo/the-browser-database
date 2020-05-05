const path = require('path');
const Ajv = require('ajv');
const { dataFilePath } = require('../generate-data/config');
const {
    browserNames,
    engineNames,
    javascriptEngineNames,
    versionRegex,
} = require('../generate-data/constants');

const ajv = new Ajv({ allErrors: true });

const browserSchema = {
    type: 'array',
    items: { '$ref': '#/definitions/browser' },
    definitions: {
        browser: {
            type: 'object',
            additionalProperties: false,
            required: [
                'name',
                'version',
            ],
            properties: {
                name: {
                    type: 'string',
                    enum: Object.values(browserNames),
                },
                basedOn: {
                    type: 'string',
                },
                version: {
                    type: 'string',
                    pattern: `^${versionRegex}$`,
                },
                releaseDate: {
                    type: 'string',
                    pattern: `^\\d{4}-\\d{2}-\\d{2}$`,
                },
                engineName: {
                    type: 'string',
                    enum: Object.values(engineNames),
                },
                engineVersion: {
                    type: 'string',
                    pattern: `^${versionRegex}$`,
                },
                jsEngineName: {
                    type: 'string',
                    enum: Object.values(javascriptEngineNames),
                },
                jsEngineVersion: {
                    type: 'string',
                    // allowing empty values
                    pattern: `^${versionRegex}$|^$`,
                },
            }
        }
    }
};

function validateJsonWithSchema(fileName, schema) {
    const filePath = path.resolve(dataFilePath, fileName);

    const test = ajv.compile(schema);
    const isValid = test(require(filePath));
    console.log(test.errors);
}

validateJsonWithSchema('chrome.json', browserSchema);
validateJsonWithSchema('firefox.json', browserSchema);
validateJsonWithSchema('edge.json', browserSchema); // missing jsEngineVersions
validateJsonWithSchema('safari.json', browserSchema); // missing jsEngineVersions
validateJsonWithSchema('opera.json', browserSchema); // missing jsEngineVersions

