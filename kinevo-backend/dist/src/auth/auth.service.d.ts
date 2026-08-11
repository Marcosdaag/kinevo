import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { User } from '@prisma/client';
export interface JwtPayload {
    sub: string;
    email: string;
}
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(email: string, pass: string): Promise<Partial<User> | null>;
    login(user: Partial<User>): Promise<{
        access_token: string;
    }>;
    register(registerDto: RegisterDto): Promise<{
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        avatarUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
