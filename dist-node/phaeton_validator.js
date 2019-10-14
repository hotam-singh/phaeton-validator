"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Ajv = require("ajv");
const formats = require("./formats");
class PhaetonValidator {
    constructor() {
        this.validator = new Ajv({
            allErrors: true,
            schemaId: 'auto',
            useDefaults: false,
        });
        for (const formatName of Object.keys(formats)) {
            this.validator.addFormat(formatName, formats[formatName]);
        }
        this.validator.addKeyword('uniqueSignedPublicKeys', {
            type: 'array',
            compile: () => (data) => new Set(data.map((key) => key.slice(1))).size === data.length,
        });
    }
    validate(schema, data) {
        if (!this.validator.validate(schema, data)) {
            return this.validator.errors;
        }
        return [];
    }
}
exports.validator = new PhaetonValidator();
//# sourceMappingURL=phaeton_validator.js.map
