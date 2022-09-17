import { ForbiddenError } from "@shared/errors";
import { IUserRepository } from "@proxy/repository";
import { Inject } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {Strategy} from 'passport-jwt'
import jwt_decode from 'jwt-decode';

export class ValidateUser extends PassportStrategy(Strategy, 'jwt') {
  constructor(@Inject(IUserRepository) private readonly repository: IUserRepository, token: string) {
    super({
      jwtFromRequest: token,
      secretOrKey: 'secrecy',
    });
  }

  async validate(payload: any) {
    const id = payload.id;
    const user = await this.repository.findOne({ id: id });
    if (!user) throw new ForbiddenError();
    return user;
  }
}