import { UsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface GetProfileUseRequest {
    userId: string;
}

interface GetProfileUseResponse {
    user: User;
}

export class GetUserProfileUseCase {
    constructor(
        private usersRepository: UsersRepository
    ) { }

    async execute({ userId }: GetProfileUseRequest): Promise<GetProfileUseResponse> {
        // Buscar o usuário no banco
        const user = await this.usersRepository.findById(userId);

        if (!user) {
            throw new ResourceNotFoundError();
        }

        return { user };
    }
}