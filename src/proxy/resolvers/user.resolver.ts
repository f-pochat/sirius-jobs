import { IUserService } from "@proxy/service";
import { Token, User } from "@models/user/types";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { LoginUserArgs, RegisterUserArgs } from "@models/user/args";
import { UseGuards } from "@nestjs/common";
import { JwtGuard } from "@shared/guards";

@Resolver(() => User)
export class UserResolver{
  constructor(private userService: IUserService) {}

  @Query(() => User)
  @UseGuards(JwtGuard)
  async getUser(@Args('id',{type: () => String}) id: string){
    return this.userService.getUser(id)
  }

  @Mutation(() => User)
  async registerUser(@Args() args: RegisterUserArgs){
    return this.userService.register(args)
  }

  @Mutation(() => Token)
  async loginUser(@Args() args: LoginUserArgs){
    return this.userService.login(args)
  }
}