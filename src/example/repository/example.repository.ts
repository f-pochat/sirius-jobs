import { Example } from "@models/example/entities";
import { Injectable } from "@nestjs/common";
import { BaseRepository } from "@shared/repository";
import { DatabaseService } from "@shared/service";
import { IExampleRepository } from "./example.repository.interface";

@Injectable()
export class ExampleRepository extends BaseRepository<Example> implements IExampleRepository {
   
    constructor(db: DatabaseService) {
      super(db, 'example');
    }
    
    async findByText(text: string): Promise<Example> {
        return this.findOne(
          { text: text },
        );
    }


}

