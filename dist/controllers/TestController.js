"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const inversify_1 = require("inversify");
const tsoa_1 = require("tsoa");
const Controller_1 = require("./Controller");
const TestService_1 = require("../services/TestService");
const _reference_1 = require("../models/_reference");
let TestController = class TestController extends Controller_1.Controller {
    getTest(id, name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.testService.get(id, name);
        });
    }
    setTest(request) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.testService.get(0, request.name);
        });
    }
};
__decorate([
    inversify_1.inject(TestService_1.TestService),
    __metadata("design:type", TestService_1.TestService)
], TestController.prototype, "testService", void 0);
__decorate([
    tsoa_1.SuccessResponse('200', 'Success'),
    tsoa_1.Response('400', 'Bad request'),
    tsoa_1.Response('404', 'Not Found'),
    tsoa_1.Response('500', 'Unexpected error'),
    tsoa_1.Get('{id}'),
    __param(1, tsoa_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], TestController.prototype, "getTest", null);
__decorate([
    tsoa_1.SuccessResponse('200', 'Success'),
    tsoa_1.Response('400', 'Bad request'),
    tsoa_1.Response('404', 'Not Found'),
    tsoa_1.Response('500', 'Unexpected error'),
    tsoa_1.Post(),
    __param(0, tsoa_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [_reference_1.TestRequest]),
    __metadata("design:returntype", Promise)
], TestController.prototype, "setTest", null);
TestController = __decorate([
    inversify_1.injectable(),
    tsoa_1.Route('test')
], TestController);
exports.TestController = TestController;
//# sourceMappingURL=TestController.js.map