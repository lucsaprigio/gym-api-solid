export class LateCheckInValidationError extends Error {
    constructor() {
        super('The check-in can only validation until 20 minutes after its creation.') 
    }
}