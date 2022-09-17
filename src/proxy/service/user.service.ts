import { Inject, Injectable } from '@nestjs/common';

import { NotFoundError, NotUniqueError, ValidationError } from "@shared/errors";
import { IUserService } from "@proxy/service/user.service.interface";
import { LoginUserArgs, RegisterUserArgs } from "@models/user/args";
import { Token, User } from "@models/user/types";
import { IUserRepository } from "@proxy/repository";
import { JwtService } from "@nestjs/jwt";
import { comparePasswords, encryptPassword } from "@shared/util";

@Injectable()
export class UserService implements IUserService {

    constructor(
      private jwtService: JwtService,
      @Inject(IUserRepository) private readonly repository: IUserRepository) {}

    async getUser(id: string): Promise<User> {
        return this.repository.findById(id);
    }

    async login(loginUserArgs: LoginUserArgs): Promise<Token> {
        const user = await this.repository.findByEmail(loginUserArgs.email);
        if (!user) throw new NotFoundError('User')
        if (!await comparePasswords(loginUserArgs.password,user.password)) throw new ValidationError('user','password','is not the same')

        return {
            token: this.jwtService.sign({ id: user.id })
        }
    }

    async register(registerUserArgs: RegisterUserArgs): Promise<User> {
        const existsEmail = await this.repository.findByEmail(registerUserArgs.email);
        if (existsEmail) throw new NotUniqueError('Email')

        const existsUsername = await this.repository.findByEmail(registerUserArgs.email);
        if (existsUsername) throw new NotUniqueError('Username')

        registerUserArgs.password = await encryptPassword(registerUserArgs.password);

        return await this.repository.create(registerUserArgs);
    }

  
}