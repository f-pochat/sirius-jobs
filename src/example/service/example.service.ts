import { Inject, Injectable } from '@nestjs/common';

import { CreateExampleDto, GetExampleDto } from '@models/example/dto';
import { Example } from '@models/example/entities';
import { IExampleService } from '.';
import { IExampleRepository } from '@example/repository';
import { NotFoundError } from '@shared/errors';

@Injectable()
export class ExampleService implements IExampleService {

    constructor(@Inject(IExampleRepository) private readonly repository: IExampleRepository) {}
    
    async getExample(getExampleDto: GetExampleDto): Promise<Example> {
        const example = await this.repository.findByText(getExampleDto.text);
        if(!example) throw new NotFoundError('example');        
        return example;
    }
    
    async createExample(createExampleDto: CreateExampleDto): Promise<Example> {
        return await this.repository.create(createExampleDto);
    }
    
  
}