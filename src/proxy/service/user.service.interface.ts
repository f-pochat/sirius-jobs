import { LoginUserArgs, RegisterUserArgs } from "@models/user/args";
import { Token, User } from "@models/user/types";

export abstract class IUserService {
  abstract login(loginUserArgs: LoginUserArgs): Promise<Token>;
  abstract register(registerUserArgs: RegisterUserArgs): Promise<User>;
  abstract getUser(id: string): Promise<User>;
}

