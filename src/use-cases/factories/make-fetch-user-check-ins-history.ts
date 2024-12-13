// Cria os casos de uso dos registros
import { FecthUserCheckInsHistory } from "../fetch-user-check-ins.history";
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repotisory";

export function makeFetchUserCheckInHistoryUseCase() {
    const checkInsRepository = new PrismaCheckInsRepository();
    const useCase = new FecthUserCheckInsHistory(checkInsRepository);

    return useCase
}