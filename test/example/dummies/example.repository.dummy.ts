import { IExampleRepository } from "@example/repository";
import { Example } from "@models/example/entities";
import { Injectable } from "@nestjs/common";

@Injectable()
export class DummyExampleRepository implements IExampleRepository {
  
    findByText(text: string): Promise<Example> {
        return Promise.resolve(undefined);
    }
    create(data: any): Promise<Example> {
      return Promise.resolve(undefined);
    }

    findAll(): Promise<Example[]> {
      return Promise.resolve([]);
    }

    findById(id: Example['id']): Promise<Example> {
      return Promise.resolve(undefined);
    }

    findByIdWithProducts(id: string): Promise<Example> {
      return Promise.resolve(undefined);
    }

    findMany(query: any): Promise<Example[]> {
      return Promise.resolve([]);
    }

    findOne(query: any): Promise<Example> {
      return Promise.resolve(undefined);
    }
}

