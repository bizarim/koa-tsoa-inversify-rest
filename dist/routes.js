"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable */
const tsoa_1 = require("tsoa");
const ioc_1 = require("./inversify/ioc");
const TestController_1 = require("./controllers/TestController");
const models = {
    "Test": {},
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
const validationService = new tsoa_1.ValidationService(models);
function RegisterRoutes(router) {
    router.get('/test/:id', (context, next) => __awaiter(this, void 0, void 0, function* () {
        const args = {
            id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
            name: { "in": "query", "name": "name", "required": true, "dataType": "string" },
        };
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, context);
        }
        catch (error) {
            context.status = error.status;
            context.throw(error.status, JSON.stringify({ fields: error.fields }));
        }
        const controller = ioc_1.iocContainer.get(TestController_1.TestController);
        const promise = controller.getTest.apply(controller, validatedArgs);
        return promiseHandler(controller, promise, context, next);
    }));
    router.post('/test', (context, next) => __awaiter(this, void 0, void 0, function* () {
        const args = {
            request: { "in": "body", "name": "request", "required": true, "ref": "TestRequest" },
        };
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, context);
        }
        catch (error) {
            context.status = error.status;
            context.throw(error.status, JSON.stringify({ fields: error.fields }));
        }
        const controller = ioc_1.iocContainer.get(TestController_1.TestController);
        const promise = controller.setTest.apply(controller, validatedArgs);
        return promiseHandler(controller, promise, context, next);
    }));
    function isController(object) {
        return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
    }
    function promiseHandler(controllerObj, promise, context, next) {
        return Promise.resolve(promise)
            .then((data) => {
            if (data || data === false) {
                context.body = data;
                context.status = 200;
            }
            else {
                context.status = 204;
            }
            if (isController(controllerObj)) {
                const headers = controllerObj.getHeaders();
                Object.keys(headers).forEach((name) => {
                    context.set(name, headers[name]);
                });
                const statusCode = controllerObj.getStatus();
                if (statusCode) {
                    context.status = statusCode;
                }
            }
            return next();
        })
            .catch((error) => {
            context.status = error.status || 500;
            context.throw(context.status, error.message, error);
        });
    }
    function getValidatedArgs(args, context) {
        const errorFields = {};
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
            throw new tsoa_1.ValidateError(errorFields, '');
        }
        return values;
    }
}
exports.RegisterRoutes = RegisterRoutes;
//# sourceMappingURL=routes.js.map