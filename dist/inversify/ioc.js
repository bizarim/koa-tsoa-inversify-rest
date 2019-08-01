"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const _reference_1 = require("../services/_reference");
const _reference_2 = require("../controllers/_reference");
const iocContainer = new inversify_1.Container();
exports.iocContainer = iocContainer;
iocContainer.bind(_reference_1.TestService).to(_reference_1.TestService); // .inSingletonScope()
iocContainer.bind(_reference_2.TestController).to(_reference_2.TestController);
//# sourceMappingURL=ioc.js.map