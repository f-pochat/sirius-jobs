import { Module } from '@nestjs/common';

import { SharedModule } from '@shared/shared.module';
import { ExampleController } from './controller';
import { ExampleRepository, IExampleRepository } from './repository';
import { ExampleService, IExampleService } from './service';

const exampleServiceProvider = {
  provide: IExampleService,
  useClass: ExampleService,
};

const examplehRepositoryProvider = {
  provide: IExampleRepository,
  useClass: ExampleRepository,
};

@Module({
  imports: [SharedModule],
  controllers: [ExampleController],
  providers: [exampleServiceProvider, examplehRepositoryProvider],
})
export class ExampleModule {}

