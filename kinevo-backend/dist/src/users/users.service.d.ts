import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    create(data: {
        email: string;
        firstName: string;
        lastName: string;
        passwordHash: string;
    }): Promise<{
        id: string;
        email: string;
        passwordHash: string;
        firstName: string;
        lastName: string;
        avatarUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
