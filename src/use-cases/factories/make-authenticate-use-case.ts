// Cria os casos de uso dos registros
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-user-repository";
import { AuthenticateUseCase } from "../authenticate";

export function makeAuthenticateUseCase() {
    const usersRepository = new PrismaUsersRepository();
    const authenticateUsecase = new AuthenticateUseCase(usersRepository);

    return authenticateUsecase
}