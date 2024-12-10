import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository";

interface CheckInUseCaseRequest {
    userId: string;
    gymId: string;
}

interface CheckInUseCaseResponse {
    chekIn: CheckIn;
}

export class CheckInUseCase {
    constructor(
        private checkInsRepository: CheckInsRepository,
    ) { }

    async execute({ userId, gymId }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
        const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(userId, new Date());

        if (checkInOnSameDay) {
            throw new Error('User already checked in today');
        }

        // Buscar o usuário no banco
        const chekIn = await this.checkInsRepository.create({
            user_id: userId,
            gymId: gymId
        })

        return { chekIn };
    }
}