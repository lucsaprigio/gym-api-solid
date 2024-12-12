import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";
import { Gym, User } from "@prisma/client";
import { GymsRepository } from "@/repositories/gyms-repository";

/* 
    SOLID
    S - Single Responsibility Principle -> Cada classe deve ter apenas uma responsabilidade
    O - Open/Closed Principle -> A classe deve estar aberta para extensão e fechada para modificação
    L - Liskov Substitution Principle -> As classes devem ser substituíveis por suas subclasses
    I - Interface Segregation Principle -> Uma classe não deve ser forçada a implementar interfaces que ela
    D - Dependency Inversion Principle -> Vamos inverter a ordem de dependência do UseCase para o Repository
*/

interface SearchGymsUseCaseRequest {
    query: string;
    page: number;
}

interface SearchGymsUseCaseResponse {
    gyms: Gym[];
}


export class SearchGymsUseCase {
    constructor(private gymsRepository: GymsRepository) { }

    async execute({
        query, page
    }: SearchGymsUseCaseRequest): Promise<SearchGymsUseCaseResponse> {

        const gyms = await this.gymsRepository.searchMany(query, page);

        return { gyms };

    }
}

