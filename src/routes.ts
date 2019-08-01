/* tslint:disable */
import { Controller, ValidationService, FieldErrors, ValidateError, TsoaRoute } from 'tsoa';
import { iocContainer } from './inversify/ioc';
import { TestController } from './controllers/TestController';
import * as KoaRouter from 'koa-router';

const models: TsoaRoute.Models = {
    "Test": {
    },
    "BadRequestError": {
        "properties": {
            "errcode": { "dataType": "string", "default": "400" },
            "msg": { "dataType": "string", "default": "Bat Request" },
        },
    },
    "NotFoundError": {
        "properties": {
            "errcode": { "dataType": "string", "default": "404" },
            "msg": { "dataType": "string", "default": "Not Found" },
        },
    },
    "UnexpectedError": {
        "properties": {
            "errcode": { "dataType": "string", "default": "500" },
            "msg": { "dataType": "string", "default": "Unexpected error" },
        },
    },
    "TestRequest": {
        "properties": {
            "name": { "dataType": "string", "required": true },
        },
    },
};
const validationService = new ValidationService(models);

export function RegisterRoutes(router: KoaRouter) {
    router.get('/test/:id',
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
                name: { "in": "query", "name": "name", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status;
                context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const controller = iocContainer.get<TestController>(TestController);

            const promise = controller.getTest.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, next);
        });
    router.post('/test',
        async (context, next) => {
            const args = {
                request: { "in": "body", "name": "request", "required": true, "ref": "TestRequest" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status;
                context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const controller = iocContainer.get<TestController>(TestController);

            const promise = controller.setTest.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, next);
        });


    function isController(object: any): object is Controller {
        return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
    }

    function promiseHandler(controllerObj: any, promise: Promise<any>, context: any, next: () => Promise<any>) {
        return Promise.resolve(promise)
            .then((data: any) => {
                if (data || data === false) {
                    context.body = data;
                    context.status = 200;
                } else {
                    context.status = 204;
                }

                if (isController(controllerObj)) {
                    const headers = controllerObj.getHeaders();
                    Object.keys(headers).forEach((name: string) => {
                        context.set(name, headers[name]);
                    });

                    const statusCode = controllerObj.getStatus();
                    if (statusCode) {
                        context.status = statusCode;
                    }
                }
                return next();
            })
            .catch((error: any) => {
                context.status = error.status || 500;
                context.throw(context.status, error.message, error);
            });
    }

    function getValidatedArgs(args: any, context: any): any[] {
        const errorFields: FieldErrors = {};
        const values = Object.keys(args).map(key => {
            const name = args[key].name;
            switch (args[key].in) {
                case 'request':
                    return context.request;
                case 'query':
                    return validationService.ValidateParam(args[key], context.request.query[name], name, errorFields);
                case 'path':
                    return validationService.ValidateParam(args[key], context.params[name], name, errorFields);
                case 'header':
                    return validationService.ValidateParam(args[key], context.request.headers[name], name, errorFields);
                case 'body':
                    return validationService.ValidateParam(args[key], context.request.body, name, errorFields, name + '.');
                case 'body-prop':
                    return validationService.ValidateParam(args[key], context.request.body[name], name, errorFields, 'body.');
            }
        });
        if (Object.keys(errorFields).length > 0) {
            throw new ValidateError(errorFields, '');
        }
        return values;
    }
}
