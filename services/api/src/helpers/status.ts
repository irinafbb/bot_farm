export type ResponseMessage = {
    status: 'success' | HttpErrors
}

export interface SuccessMessage extends ResponseMessage {
    status: 'success'
}

export interface ErrorMessage extends ResponseMessage {
    status: HttpErrors,
    error?: string
}

const successMessage: ResponseMessage = {status: 'success'};
const getErrorMessage = (status: HttpErrors): ErrorMessage => {
    console.error(errorDescription.get(status));
    return {
        status: status,
        error: errorDescription.get(status)
    };
};

const enum HttpErrors {
    INTERNAL_ERROR = 'internal_error',
    INCORRECT_BODY = 'incorrect_body',
    FORBIDDEN = 'forbidden',
}

const errorDescription = new Map<HttpErrors, string>([
    [HttpErrors.INTERNAL_ERROR, 'Internal server error'],
    [HttpErrors.INCORRECT_BODY, 'Request body missing or invalid'],
    [HttpErrors.FORBIDDEN, 'User with this role does not have permission to view this resource'],
]);

const enum HttpStatusCodes {
    SUCCESS = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    ERROR = 500
}

export {
    HttpStatusCodes,
    successMessage,
    getErrorMessage,
    HttpErrors,
};
