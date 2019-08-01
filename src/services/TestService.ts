import 'reflect-metadata';
import { injectable, inject } from 'inversify';
import { Test } from '../models/_reference';
import { Logger, ILogger } from '../Logger';

@injectable()
export class TestService {

    public logger: ILogger = Logger.getInstance();

    public async get(id: number, name?: string): Promise<Test> {
        const test: Test = {
            id: id,
            email: 'test',
            name: { first: undefined == name ? 'none' : name, last: 'l' }
        };

        this.logger.debug('TestService get');

        return test;
    }
}