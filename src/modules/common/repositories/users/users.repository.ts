import { EntityRepository, Repository } from 'typeorm';
import { User } from '../../entities/users/user.entity';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {}
