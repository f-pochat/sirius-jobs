import { CreateExampleDto, GetExampleDto } from "@models/example/dto";
import { Example } from "@models/example/entities";

export abstract class IExampleService {
  abstract getExample(getExampleDto: GetExampleDto): Promise<Example>;
  abstract createExample(createExampleDto: CreateExampleDto): Promise<Example>;
}

