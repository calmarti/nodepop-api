import { Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly usersService;
    protected readonly configService: ConfigService;
    constructor(usersService: UsersService, configService: ConfigService);
    validate(payload: any): Promise<import("../users/entities/user.entity").User>;
}
export {};
