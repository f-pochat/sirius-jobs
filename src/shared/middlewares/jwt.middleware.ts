import { Inject, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction } from "express";
import { IUserRepository } from "@proxy/repository";
import isJwtTokenExpired, { decode } from 'jwt-check-expiry';
import { ForbiddenError } from "@shared/errors";

@Injectable()
export class JwtMiddleware implements NestMiddleware {

  constructor(@Inject(IUserRepository) private readonly repository: IUserRepository){}

  use(req: Request, res: Response, next: NextFunction) {
    if (!req.body['query'].includes('loginUser') && !req.body['query'].includes('registerUser')) {
      let token = <string>req.headers['authorization'].replace('Bearer ', '');
      if (token === null || token === '') throw new ForbiddenError()
      try{
        const user = this.repository.findById(decode(token).payload.id)
        if (isJwtTokenExpired(token)) throw new ForbiddenError()
        if (!user) throw new ForbiddenError()
      }catch (e){
        throw new ForbiddenError()
      }
    }
    next();
  }
}