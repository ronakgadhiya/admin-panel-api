/**
 * @desc    Send any success response
 * @param   {string} message
 * @param   {object | array} results
 * @param   {number} statusCode
 */
export const success = function (results: any, statusCode: number, message: string = 'success') {
    return {
        message,
        success: true,
        code: statusCode,
        results,
    }
}

/**
 * @desc    Send any error response
 * @param   {string} message
 * @param   {number} statusCode
 */ export const error = (results: any, statusCode: number, message: string = 'error') => {
    // List of common HTTP request code
    const codes = [200, 201, 400, 401, 404, 403, 405, 409, 422, 413, 500]

    // Get matched code
    const findCode = codes.find((code) => code == statusCode)

    if (!findCode) statusCode = 500
    else statusCode = findCode

    return {
        message,
        results,
        code: statusCode,
        error: true,
    }
}

export enum ErrorType {
    BAD_TOKEN = 'BadTokenError',
    TOKEN_EXPIRED = 'TokenExpiredError',
    UNAUTHORIZED = 'AuthFailureError',
    ACCESS_TOKEN = 'AccessTokenError',
    INTERNAL = 'InternalError',
    NOT_FOUND = 'NotFoundError',
    NO_ENTRY = 'NoEntryError',
    NO_DATA = 'NoDataError',
    BAD_REQUEST = 'BadRequestError',
    FORBIDDEN = 'ForbiddenError',
}


export const enum StatusCodes {
    CONTINUE = 100,
    SWITCHING_PROTOCOLS = 101,
    PROCESSING = 102,
    EARLY_HINTS = 103,
    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,
    NON_AUTHORITATIVE_INFORMATION = 203,
    NO_CONTENT = 204,
    RESET_CONTENT = 205,
    PARTIAL_CONTENT = 206,
    MULTI_STATUS = 207,
    MULTIPLE_CHOICES = 300,
    MOVED_PERMANENTLY = 301,
    MOVED_TEMPORARILY = 302,
    SEE_OTHER = 303,
    NOT_MODIFIED = 304,
    USE_PROXY = 305,
    TEMPORARY_REDIRECT = 307,
    PERMANENT_REDIRECT = 308,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    PAYMENT_REQUIRED = 402,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    METHOD_NOT_ALLOWED = 405,
    NOT_ACCEPTABLE = 406,
    PROXY_AUTHENTICATION_REQUIRED = 407,
    REQUEST_TIMEOUT = 408,
    CONFLICT = 409,
    GONE = 410,
    LENGTH_REQUIRED = 411,
    PRECONDITION_FAILED = 412,
    REQUEST_TOO_LONG = 413,
    REQUEST_URI_TOO_LONG = 414,

    UNSUPPORTED_MEDIA_TYPE = 415,

    REQUESTED_RANGE_NOT_SATISFIABLE = 416,

    EXPECTATION_FAILED = 417,

    IM_A_TEAPOT = 418,

    INSUFFICIENT_SPACE_ON_RESOURCE = 419,

    METHOD_FAILURE = 420,

    MISDIRECTED_REQUEST = 421,

    UNPROCESSABLE_ENTITY = 422,

    LOCKED = 423,

    FAILED_DEPENDENCY = 424,

    UPGRADE_REQUIRED = 426,

    PRECONDITION_REQUIRED = 428,

    TOO_MANY_REQUESTS = 429,

    REQUEST_HEADER_FIELDS_TOO_LARGE = 431,

    UNAVAILABLE_FOR_LEGAL_REASONS = 451,

    INTERNAL_SERVER_ERROR = 500,
    NOT_IMPLEMENTED = 501,
    BAD_GATEWAY = 502,
    SERVICE_UNAVAILABLE = 503,
    GATEWAY_TIMEOUT = 504,
    HTTP_VERSION_NOT_SUPPORTED = 505,
    INSUFFICIENT_STORAGE = 507,
    NETWORK_AUTHENTICATION_REQUIRED = 511,
}
