

import { IBaseRepository } from '@shared/repository';
import { User } from "@models/user/types";


export abstract class IUserRepository extends IBaseRepository<User> {
  abstract findByEmail(email: string): Promise<User>
}

