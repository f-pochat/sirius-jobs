
import { Injectable } from "@nestjs/common";
import { BaseRepository } from "@shared/repository";
import { DatabaseService } from "@shared/service";
import { IUserRepository } from "@proxy/repository/user.repository.interface";
import { User } from "@models/user/types";

@Injectable()
export class UserRepository extends BaseRepository<User> implements IUserRepository {
   
    constructor(db: DatabaseService) {
      super(db, 'user');
    }

  async findByEmail(email: string): Promise<User> {
    return await this.findOne(
      {email: email}
    )
  }
}

