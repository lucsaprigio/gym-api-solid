// Cria os casos de uso dos registros
import { CreateGymUseCase } from "../create-gym-use-case";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repositort";

export function makeCreateGymUseCase() {
    const gymsRepository = new PrismaGymsRepository();
    const useCase = new CreateGymUseCase(gymsRepository);

    return useCase
}