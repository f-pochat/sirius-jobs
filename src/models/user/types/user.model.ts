import { Field, Int, ObjectType } from "@nestjs/graphql";
import { IsEmail, MinLength } from "class-validator";

@ObjectType()
export class User {
  @Field()
  id: string

  @Field()
  email: string

  @Field()
  password: string
}