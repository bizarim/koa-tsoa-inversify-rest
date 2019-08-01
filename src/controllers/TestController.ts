import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { Get, Post, Route, Body, Query, Header, Path, SuccessResponse, Response } from 'tsoa';
import { Controller } from './Controller';
import { TestService } from '../services/TestService';
import { Test, NotFoundError, BadRequestError, UnexpectedError, TestRequest } from '../models/_reference';


@injectable()
@Route('test')
export class TestController extends Controller {

    @inject(TestService)
    private testService: TestService;

    @SuccessResponse('200', 'Success')
    @Response<BadRequestError>('400', 'Bad request')
    @Response<NotFoundError>('404', 'Not Found')
    @Response<UnexpectedError>('500', 'Unexpected error')
    @Get('{id}')
    public async getTest(id: number, @Query() name: string): Promise<Test> {

        return await this.testService.get(id, name);
    }

    @SuccessResponse('200', 'Success')
    @Response<BadRequestError>('400', 'Bad request')
    @Response<NotFoundError>('404', 'Not Found')
    @Response<UnexpectedError>('500', 'Unexpected error')
    @Post()
    public async setTest(@Body() request: TestRequest): Promise<Test> {

        return await this.testService.get(0, request.name);
    }
}