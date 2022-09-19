import { Inject, Injectable } from "@nestjs/common";
import { IUserRepository } from "@proxy/repository";
import { ForbiddenError } from "@shared/errors";
import { PassportStrategy } from "@nestjs/passport";
import {ExtractJwt, Strategy} from 'passport-jwt'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(@Inject(IUserRepository) private readonly repository: IUserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
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