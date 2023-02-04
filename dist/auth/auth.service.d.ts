import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    signup(data: any): Promise<{
        id: string;
        createdAt: Date;
        email: string;
        username: string;
        name: string;
    }>;
    login(user: any): {
        accessToken: string;
    };
    validateUser(email: string, password: string): Promise<import("../users/entities/user.entity").User>;
}
