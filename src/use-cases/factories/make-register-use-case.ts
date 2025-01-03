// Cria os casos de uso dos registros
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-user-repository";
import { RegisterUseCase } from "../register-use-case";

export function makeRegisterUseCase() {
    const usersRepository = new PrismaUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    return registerUseCase
}