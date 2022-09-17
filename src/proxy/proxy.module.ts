import { Module } from '@nestjs/common';

import { SharedModule } from '@shared/shared.module';
import { IUserService,  UserService } from "@proxy/service";
import { IUserRepository, UserRepository } from "@proxy/repository";
import { JwtModule } from "@nestjs/jwt";
import { UserResolver } from "@proxy/resolvers";
import { JwtStrategy } from "@shared/util";

const userServiceProvider = {
  provide: IUserService,
  useClass: UserService,
};

const userRepositoryProvider = {
  provide: IUserRepository,
  useClass: UserRepository,
};
@Module({
  imports: [SharedModule,
    JwtModule.register({
    secret: 'secrecy',
    signOptions: {expiresIn: '60m'}
  })],
  providers: [userServiceProvider, userRepositoryProvider, UserResolver, JwtStrategy],
})
export class ProxyModule {}

