import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
export declare class UsersService {
    private readonly usersRepository;
    constructor(usersRepository: Repository<User>);
    create(user: User): Promise<User>;
    findById(id: string): Promise<User>;
    findByEmail(email: string): Promise<User>;
}
