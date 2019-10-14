declare class PhaetonValidator {
    private readonly validator;
    constructor();
    validate(schema: object, data: object): [];
}
export declare const validator: PhaetonValidator;
export {};
