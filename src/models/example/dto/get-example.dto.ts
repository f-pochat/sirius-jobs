import { IsNotEmpty } from 'class-validator';

export class GetExampleDto {
  @IsNotEmpty()
  text: string;
}

