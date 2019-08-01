"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResponseModel {
}
exports.ResponseModel = ResponseModel;
class ErrorResponse extends ResponseModel {
    constructor() {
        super(...arguments);
        this.errcode = '100';
        this.msg = 'Error';
    }
}
exports.ErrorResponse = ErrorResponse;
class NotFoundError extends ErrorResponse {
    constructor() {
        super(...arguments);
        this.errcode = '404';
        this.msg = 'Not Found';
    }
}
exports.NotFoundError = NotFoundError;
class BadRequestError extends ErrorResponse {
    constructor() {
        super(...arguments);
        this.errcode = '400';
        this.msg = 'Bat Request';
    }
}
exports.BadRequestError = BadRequestError;
class UnexpectedError extends ErrorResponse {
    constructor() {
        super(...arguments);
        this.errcode = '500';
        this.msg = 'Unexpected error';
    }
}
exports.UnexpectedError = UnexpectedError;
//# sourceMappingURL=Error.js.map