import { ExampleController } from "@example/controller";
import { IExampleRepository } from "@example/repository";
import { ExampleService, IExampleService } from "@example/service";
import { CreateExampleDto, GetExampleDto } from "@models/example/args";
import { Example } from "@models/example/types";
import { Test, TestingModule } from "@nestjs/testing";
import { DummyExampleRepository } from "../dummies";

describe('ExampleController Unit Test', () => {

    let exampleController: ExampleController;
    let exampleService: IExampleService;

    beforeEach(async () => {
      const exampleServiceProvider = {
        provide: IExampleService,
        useClass: ExampleService,
      };

      const exampleRepositoryProvider = {
        provide: IExampleRepository,
        useClass: DummyExampleRepository,
      };

      const app: TestingModule = await Test.createTestingModule({
        controllers: [ExampleController],
        providers: [exampleRepositoryProvider, exampleServiceProvider],
      }).compile();

      exampleController = app.get<ExampleController>(ExampleController);
      exampleService = app.get<IExampleService>(IExampleService);
    });

    describe('createExample', () => {

        it('should create a example', async () => {
          const example: Example = {
            id: '1',
            text: 'Test Example',
          };
          const input: CreateExampleDto = {
            text: 'Test Example',
          };
          jest.spyOn(exampleService, 'createExample').mockImplementation(() => Promise.resolve(example));
          const result = await exampleController.createExample(input);
          expect(result).toEqual(example);
        });

    });

    describe('getExample', () => {

        it('if getExample() has result should return example', async () => {
            const example: Example = {
                id: '1',
                text: 'Test Example',
            };
            const input: GetExampleDto = {
                text: 'Test Example',
            };
            jest.spyOn(exampleService, 'getExample').mockImplementation(() => Promise.resolve(example));
            expect(await exampleController.getExample(input)).toBe(example);
        });
  
    });


});