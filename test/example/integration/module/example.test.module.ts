import { ExampleController } from '@example/controller';
import { ExampleRepository, IExampleRepository } from '@example/repository';
import { ExampleService, IExampleService } from '@example/service';
import { Module } from '@nestjs/common';
import { SharedTestModule } from '../../../shared.test.module';


const exampleServiceProvider = {
      provide: IExampleService,
      useClass: ExampleService,
};

const exampleRepositoryProvider = {
      provide: IExampleRepository,
      useClass: ExampleRepository,
};

@Module({
  imports: [SharedTestModule],
  controllers: [ExampleController],
  providers: [exampleServiceProvider, exampleRepositoryProvider],
})
export class ExampleTestModule {}
