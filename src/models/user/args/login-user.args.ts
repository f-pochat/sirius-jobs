import { IsEmail, IsNotEmpty } from "class-validator";
import { ArgsType, Field } from "@nestjs/graphql";

@ArgsType()
export class LoginUserArgs{
  @Field()
  @IsNotEmpty()
  @IsEmail()
  email:string;

  @Field()
  @IsNotEmpty()
  password: string;
}