import { injectable } from 'inversify';
import { ILogger, Logger } from '../Logger';

@injectable()
export class Controller {
    protected logger: ILogger = Logger.getInstance();

    private statusCode?: number = undefined;
    private headers = {} as { [name: string]: string | undefined };

    public setStatus(statusCode: number) {
        this.statusCode = statusCode;
    }

    public getStatus() {
        return this.statusCode;
    }

    public setHeader(name: string, value?: string) {
        this.headers[name] = value;
    }

    public getHeader(name: string) {
        return this.headers[name];
    }

    public getHeaders() {
        return this.headers;
    }
}