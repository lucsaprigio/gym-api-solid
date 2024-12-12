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

interface CreateGymUseCaseRequest {
    title: string;
    description: string | null;
    phone: string | null;
    latitude: number;
    longitude: number;
}

interface CreateGymUseCaseResponse {
    gym: Gym;
}


export class CreateGymUseCase {
    constructor(private gymsRepository: GymsRepository) { }

    async execute({
        title, description, phone, latitude, longitude
    }: CreateGymUseCaseRequest): Promise<CreateGymUseCaseResponse> {

        const gym = await this.gymsRepository.create({
            title, description, phone, latitude, longitude
        });

        return { gym };

    }
}

