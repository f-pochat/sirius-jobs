import { IsEmail, IsNotEmpty, Matches, MaxLength, MinLength } from "class-validator";
import { ArgsType, Field } from "@nestjs/graphql";

@ArgsType()
export class RegisterUserArgs {
  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string

  @Field()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'Password too weak'})
  password: string
}