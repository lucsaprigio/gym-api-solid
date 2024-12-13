// Cria os casos de uso dos registros
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repositort";
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repotisory";
import { CheckInUseCase } from "../check-in-use-case";

export function makeCheckInsUseCase() {
    const checkInsRepository = new PrismaCheckInsRepository();
    const gymsRepository = new PrismaGymsRepository();
    const useCase = new CheckInUseCase(checkInsRepository, gymsRepository);

    return useCase
}