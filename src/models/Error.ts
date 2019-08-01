export class ResponseModel {
    errcode: string;
    msg: string;
}

export class ErrorResponse extends ResponseModel {
    errcode: string = '100';
    msg: string = 'Error';
}

export class NotFoundError extends ErrorResponse {
    errcode: string = '404';
    msg: string = 'Not Found';
}


export class BadRequestError extends ErrorResponse {
    errcode: string = '400';
    msg: string = 'Bat Request';
}

export class UnexpectedError extends ErrorResponse {
    errcode: string = '500';
    msg: string = 'Unexpected error';
}


