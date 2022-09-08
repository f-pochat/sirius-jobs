

import { Example } from '@models/example/entities';
import { IBaseRepository } from '@shared/repository';


export abstract class IExampleRepository extends IBaseRepository<Example> {
  abstract findByText(text: string): Promise<Example>;
}

