/// <reference types="passport" />
import { Request } from 'express';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signup(signupDto: SignupDto): Promise<{
        id: string;
        createdAt: Date;
        email: string;
        username: string;
        name: string;
    }>;
    login(req: Request): {
        accessToken: string;
    };
    me(req: Request): Express.User;
}
