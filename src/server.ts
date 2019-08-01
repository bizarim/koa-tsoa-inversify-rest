import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';
import * as winston from 'winston';
import * as helmet from 'koa-helmet';
import { logger } from 'koa-winston-logger/dist';
import { RegisterRoutes } from './routes';
import { Logger } from './Logger';
// todo
// cors

Logger.getInstance().info('Ready');
const app: Koa = new Koa();
const router: Router = new Router();

app.use(bodyParser());
app.use(helmet());
app.use(async (ctx, next) => {
    console.log(ctx);
    await next();
});
app.use(logger({ logger: Logger.getInstance() as winston.Logger }));
app.use(router.routes());

RegisterRoutes(router);
app.listen(3000);

Logger.getInstance().info('Server running on port 3000');

// 작업 고려 대상
// typescript typeorm