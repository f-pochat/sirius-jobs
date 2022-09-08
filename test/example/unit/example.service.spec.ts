import { IExampleRepository } from "@example/repository";
import { ExampleService, IExampleService } from "@example/service";
import { CreateExampleDto, GetExampleDto } from "@models/example/dto";
import { Example } from "@models/example/entities";
import { Test, TestingModule } from "@nestjs/testing";
import { SharedModule } from "@shared/shared.module";
import { DummyExampleRepository } from "../dummies";

describe('ExampleService Unit Test', () => {

    let exampleService: IExampleService;
    let exampleRepository: IExampleRepository;

    beforeEach(async () => {

      const exampleRepositoryProvider = {
        provide: IExampleRepository,
        useClass: DummyExampleRepository,
      };

      const exampleServiceProvider = {
        provide: IExampleService,
        useClass: ExampleService,
      }

      const app: TestingModule = await Test.createTestingModule({
        imports: [SharedModule],
        providers: [exampleRepositoryProvider, exampleServiceProvider],
      }).compile();

      exampleRepository = app.get<IExampleRepository>(IExampleRepository);
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
          jest.spyOn(exampleRepository, 'create').mockImplementation(() => Promise.resolve(example));
          const result = await exampleService.createExample(input);
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
            jest.spyOn(exampleRepository, 'findByText').mockImplementation(() => Promise.resolve(example));
            const result = await exampleService.getExample(input); 
            expect(result).toBe(example);
        });
  
    });


});