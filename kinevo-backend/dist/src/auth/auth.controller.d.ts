import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { User } from '@prisma/client';
interface AuthRequest extends Request {
    user?: Partial<User>;
}
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<{
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        avatarUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    login(req: AuthRequest): Promise<{
        access_token: string;
    }>;
}
export {};
