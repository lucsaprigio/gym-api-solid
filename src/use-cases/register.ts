import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

interface RegisterUseCaseRequest {
    name: string;
    email: string;
    password: string;
}

/* 
    SOLID


    D - Dependency Inversion Principle -> Vamos inverter a ordem de dependência do UseCase para o Repository
*/

export class RegisterUseCase {
    constructor(private usersRepository: any) { }

    async execute({ name, email, password }: RegisterUseCaseRequest) {
        const password_hash = await hash(password, 6);

        const userWithSameEmail = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (userWithSameEmail) {
            throw new Error('User already exists');
        }

        // const prismaUsersRepository = new PrismaUsersRepository();

        await this.usersRepository.create({
            name, email, password_hash
        });

    }
}

