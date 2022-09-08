import { IExampleService } from '@example/service';
import { CreateExampleDto, GetExampleDto } from '@models/example/dto';
import { Example } from '@models/example/entities';
import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';


@Controller('example')
export class ExampleController {
    
    constructor(@Inject(IExampleService) private readonly exampleService: IExampleService) {}

    @Get()
    async getExample(@Body() getExampleDto: GetExampleDto): Promise<Example> {
        return await this.exampleService.getExample(getExampleDto);
    }

    @Post()
    async createExample(@Body() createExampleDto: CreateExampleDto): Promise<Example> {
        return await this.exampleService.createExample(createExampleDto);
    }

}