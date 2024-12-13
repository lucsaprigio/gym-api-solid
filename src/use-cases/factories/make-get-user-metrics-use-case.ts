// Cria os casos de uso dos registros
import { GetUserMetricsUseCase } from "../get-user-metrics";
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repotisory";

export function makeGetUsersMetricsUseCase() {
    const checkInsRepository = new PrismaCheckInsRepository();
    const useCase = new GetUserMetricsUseCase(checkInsRepository);

    return useCase
}