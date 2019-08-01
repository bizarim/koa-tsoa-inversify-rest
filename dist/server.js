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
const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const helmet = require("koa-helmet");
const dist_1 = require("koa-winston-logger/dist");
const routes_1 = require("./routes");
const Logger_1 = require("./Logger");
// todo
// cors
Logger_1.Logger.getInstance().info('Ready');
const app = new Koa();
const router = new Router();
app.use(bodyParser());
app.use(helmet());
app.use((ctx, next) => __awaiter(this, void 0, void 0, function* () {
    console.log(ctx);
    yield next();
}));
app.use(dist_1.logger({ logger: Logger_1.Logger.getInstance() }));
app.use(router.routes());
routes_1.RegisterRoutes(router);
app.listen(3000);
Logger_1.Logger.getInstance().info('Server running on port 3000');
// 작업 고려 대상
// typescript typeorm
//# sourceMappingURL=server.js.map