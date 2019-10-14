"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BigNum = require("@phaetonhq/bignum");
const phaeton_cryptography_1 = require("@phaetonhq/phaeton-cryptography");
const semver_1 = require("semver");
const validator = require("validator");
const constants_1 = require("./constants");
exports.isNullCharacterIncluded = (input) => new RegExp('\\0|\\U00000000').test(input);
exports.isUsername = (username) => {
    if (exports.isNullCharacterIncluded(username)) {
        return false;
    }
    if (username !== username.trim().toLowerCase()) {
        return false;
    }
    if (/^[0-9]{1,21}[P|p]$/g.test(username)) {
        return false;
    }
    if (!/^[a-z0-9!@$&_.]+$/g.test(username)) {
        return false;
    }
    return true;
};
exports.isSignature = (signature) => /^[a-f0-9]{128}$/i.test(signature);
exports.isGreaterThanZero = (amount) => amount.cmp(0) > 0;
exports.isGreaterThanMaxTransactionAmount = (amount) => amount.cmp(constants_1.MAX_INT64) > 0;
exports.isGreaterThanMaxTransactionId = (id) => id.cmp(constants_1.MAX_EIGHT_BYTE_NUMBER) > 0;
exports.isNumberString = (num) => {
    if (typeof num !== 'string') {
        return false;
    }
    return validator.isInt(num);
};
exports.isValidInteger = (num) => typeof num === 'number' ? Math.floor(num) === num : false;
exports.hasNoDuplicate = (values) => {
    const unique = [...new Set(values)];
    return unique.length === values.length;
};
exports.isStringBufferLessThan = (data, max) => {
    if (typeof data !== 'string') {
        return false;
    }
    return Buffer.from(data).length <= max;
};
exports.isHexString = (data) => {
    if (typeof data !== 'string') {
        return false;
    }
    return data === '' || /^[a-f0-9]+$/i.test(data);
};
exports.isEncryptedPassphrase = (data) => {
    const keyRegExp = /[a-zA-Z0-9]{2,15}/;
    const valueRegExp = /[a-f0-9]{1,256}/;
    const keyValueRegExp = new RegExp(`${keyRegExp.source}=${valueRegExp.source}`);
    const encryptedPassphraseRegExp = new RegExp(`^(${keyValueRegExp.source})(?:&(${keyValueRegExp.source})){0,10}$`);
    return encryptedPassphraseRegExp.test(data);
};
exports.isSemVer = (version) => !!semver_1.valid(version);
exports.isRangedSemVer = (version) => !!semver_1.validRange(version);
exports.isLessThanRangedVersion = semver_1.ltr;
exports.isGreaterThanRangedVersion = semver_1.gtr;
exports.isProtocolString = (data) => /^(\d|[1-9]\d{1,2})\.(\d|[1-9]\d{1,2})$/.test(data);
const IPV4_NUMBER = 4;
const IPV6_NUMBER = 6;
exports.isIPV4 = (data) => validator.isIP(data, IPV4_NUMBER);
exports.isIPV6 = (data) => validator.isIP(data, IPV6_NUMBER);
exports.isIP = (data) => exports.isIPV4(data) || exports.isIPV6(data);
exports.isPort = (port) => validator.isPort(port);
exports.validatePublicKeysForDuplicates = (publicKeys) => publicKeys.every((element, index) => {
    if (publicKeys.slice(index + 1).includes(element)) {
        throw new Error(`Duplicated public key: ${publicKeys[index]}.`);
    }
    return true;
});
exports.isStringEndsWith = (target, suffixes) => suffixes.some(suffix => target.endsWith(suffix));
exports.isVersionMatch = semver_1.gte;
exports.validatePublicKey = (publicKey) => {
    const publicKeyBuffer = phaeton_cryptography_1.hexToBuffer(publicKey);
    if (publicKeyBuffer.length !== constants_1.MAX_PUBLIC_KEY_LENGTH) {
        throw new Error(`Public key ${publicKey} length differs from the expected 32 bytes for a public key.`);
    }
    return true;
};
exports.validatePublicKeys = (publicKeys) => publicKeys.every(exports.validatePublicKey) &&
    exports.validatePublicKeysForDuplicates(publicKeys);
exports.validateKeysgroup = (keysgroup, min, max) => {
    if (keysgroup.length < min || keysgroup.length > max) {
        throw new Error(`Expected between ${min} and ${max} public keys in the keysgroup.`);
    }
    return exports.validatePublicKeys(keysgroup);
};
const MIN_ADDRESS_LENGTH = 0;
const MAX_ADDRESS_LENGTH = 22;
const BASE_TEN = 10;
exports.validateAddress = (address) => {
    if (address.length < MIN_ADDRESS_LENGTH ||
        address.length > MAX_ADDRESS_LENGTH) {
        throw new Error('Address length does not match requirements. Expected between 2 and 22 characters.');
    }
    if (address[address.length - 1] !== 'P') {
        throw new Error('Address format does not match requirements. Expected "P" at the end.');
    }
    if (address.includes('.')) {
        throw new Error('Address format does not match requirements. Address includes invalid character: `.`.');
    }
    const addressString = address.slice(0, -1);
    const addressNumber = new BigNum(addressString);
    if (addressNumber.cmp(new BigNum(constants_1.MAX_EIGHT_BYTE_NUMBER)) > 0) {
        throw new Error('Address format does not match requirements. Address out of maximum range.');
    }
    if (addressString !== addressNumber.toString(BASE_TEN)) {
        throw new Error("Address string format does not match it's number representation.");
    }
    return true;
};
exports.validateNonTransferAmount = (data) => exports.isNumberString(data) && data === '0';
exports.validateTransferAmount = (data) => exports.isNumberString(data) &&
    exports.isGreaterThanZero(new BigNum(data)) &&
    !exports.isGreaterThanMaxTransactionAmount(new BigNum(data));
exports.validateFee = (data) => exports.isNumberString(data) &&
    exports.isGreaterThanZero(new BigNum(data)) &&
    !exports.isGreaterThanMaxTransactionAmount(new BigNum(data));
exports.isCsv = (data) => {
    if (typeof data !== 'string') {
        return false;
    }
    const csvAsArray = data.split(',');
    if (csvAsArray.length > 0) {
        return true;
    }
    return false;
};
//# sourceMappingURL=validation.js.map
