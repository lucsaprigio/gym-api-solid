// Cria os casos de uso dos registros
import { FetchNearbyGymsUseCase } from "../fetch-nearby-gyms";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repositort";

export function makeFetchNearbyGymsUseCase() {
    const gymsRepository = new PrismaGymsRepository();
    const useCase = new FetchNearbyGymsUseCase(gymsRepository);

    return useCase
}