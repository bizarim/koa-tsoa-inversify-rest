import { Container } from 'inversify';
import { TestService } from '../services/_reference';
import { TestController } from '../controllers/_reference';

const iocContainer = new Container();
iocContainer.bind<TestService>(TestService).to(TestService); // .inSingletonScope()
iocContainer.bind<TestController>(TestController).to(TestController);

export { iocContainer };