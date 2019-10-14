"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BigNum = require("@phaetonhq/bignum");
const validation_1 = require("./validation");
exports.address = (data) => {
    try {
        validation_1.validateAddress(data);
        return true;
    }
    catch (error) {
        return false;
    }
};
exports.additionPublicKey = (data) => {
    const action = data[0];
    if (action !== '+') {
        return false;
    }
    try {
        const publicKeyString = data.slice(1);
        validation_1.validatePublicKey(publicKeyString);
        return true;
    }
    catch (error) {
        return false;
    }
};
exports.amount = validation_1.isNumberString;
exports.csv = validation_1.isCsv;
exports.emptyOrPublicKey = (data) => {
    if (data === null || data === '') {
        return true;
    }
    try {
        validation_1.validatePublicKey(data);
        return true;
    }
    catch (error) {
        return false;
    }
};
exports.fee = validation_1.validateFee;
exports.hex = validation_1.isHexString;
exports.id = (data) => validation_1.isNumberString(data) && !validation_1.isGreaterThanMaxTransactionId(new BigNum(data));
exports.nonTransferAmount = validation_1.validateNonTransferAmount;
exports.noNullCharacter = (data) => !validation_1.isNullCharacterIncluded(data);
exports.publicKey = (data) => {
    try {
        validation_1.validatePublicKey(data);
        return true;
    }
    catch (error) {
        return false;
    }
};
exports.signature = validation_1.isSignature;
exports.signedPublicKey = (data) => {
    try {
        const action = data[0];
        if (action !== '+' && action !== '-') {
            return false;
        }
        const publicKeyString = data.slice(1);
        validation_1.validatePublicKey(publicKeyString);
        return true;
    }
    catch (error) {
        return false;
    }
};
exports.transferAmount = validation_1.validateTransferAmount;
exports.username = validation_1.isUsername;
//# sourceMappingURL=formats.js.map
