## koa-tsoa-rest

koa, tsoa 를 이용한 Restful API 만들기 


## Koa 란?
 - [Koa](https://github.com/koajs/koa/blob/master/Readme.md) - Koa Github Readme.md
 - 웹 프레임워크
 - Express 와 차이점
    - async/await를 정식 지원 유무
    - Performance 또한 큰 차이 없음
 - 사용자 입장에서 편한점
    - async try/catch를 따로 해주지 않아도 되는 점
    - response send를 호출 하지 않아도 되는 점

## tsoa 란
 - [tsoa](https://github.com/lukeautry/tsoa/blob/master/README.MD) - tsoa Github Readme.md
 - 장점
    - Annotaion 사용으로 행동을 직관적으로 파악 할 수 있다.
    - TypeScript 컨트롤러 및 모델을 API의 단일 소스로 사용
    - 컨트롤러와 모델에서 다음을 포함한 유효한 swagger 자동 생성
    - routes 코드 자동생성
    
```typescript
// 사용 코드
import 'reflect-metadata'
import { inject, injectable } from 'inversify';
import { Get, Post, Route, Body, Query, Header, Path, SuccessResponse, Response } from 'tsoa';
import { Controller } from './Controller';
import { TestService } from '../services/TestService';
import { Test, NotFoundError, BadRequestError, UnexpectedError, TestRequest } from '../models/_reference';

@injectable()
@Route('test')
export class TestController extends Controller {

    @inject(TestService)
    private testService: TestService

    @SuccessResponse('200', 'Success')
    @Response<BadRequestError>('400', 'Bad request')
    @Response<NotFoundError>('404', 'Not Found')
    @Response<UnexpectedError>('500', 'Unexpected error')
    @Get('{id}')
    public async getTest(id: number, @Query() name: string): Promise<Test> {

        return await this.testService.get(id, name);
    }
}
```
```typescript
// 자동화 코드
export function RegisterRoutes(router: KoaRouter) {
    router.get('/test/:id',
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
                name: { "in": "query", "name": "name", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status;
                context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const controller = iocContainer.get<TestController>(TestController);

            const promise = controller.getTest.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, next);
        });
...
```

## inversify 란
 - [inversify](https://github.com/inversify/InversifyJS/blob/master/README.md) - inversify Github Readme.md
 - IoC 컨테이너는 클래스 생성자를 사용하여 종속성을 식별하고 주입함

```typescript
import { Container } from 'inversify';
import { TestService } from '../services/_reference';
import { TestController } from '../controllers/_reference';

let iocContainer = new Container();
iocContainer.bind<TestService>(TestService).to(TestService); //.inSingletonScope() 싱글톤 지원
iocContainer.bind<TestController>(TestController).to(TestController);

export { iocContainer };
...
```