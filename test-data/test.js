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
                    type: 'string'
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
                    pattern: `^${versionRegex}$`,
                },
            }
        }
    }
};

function validateJsonWithSchema(filePath, schema) {
    const test = ajv.compile(schema);
    const isValid = test(require(filePath));
    return test.errors;
    // return isValid ? obj : { obj, error: test.errors }
}

const chromeDataFilePath = path.resolve(dataFilePath, 'chrome.json');

const result = validateJsonWithSchema(chromeDataFilePath, browserSchema);
console.log(result);

