"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const Logger_1 = require("../Logger");
let Controller = class Controller {
    constructor() {
        this.logger = Logger_1.Logger.getInstance();
        this.statusCode = undefined;
        this.headers = {};
    }
    setStatus(statusCode) {
        this.statusCode = statusCode;
    }
    getStatus() {
        return this.statusCode;
    }
    setHeader(name, value) {
        this.headers[name] = value;
    }
    getHeader(name) {
        return this.headers[name];
    }
    getHeaders() {
        return this.headers;
    }
};
Controller = __decorate([
    inversify_1.injectable()
], Controller);
exports.Controller = Controller;
//# sourceMappingURL=Controller.js.map