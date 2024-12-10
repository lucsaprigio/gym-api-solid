import { CheckIn, Prisma } from "@prisma/client";
import { CheckInsRepository } from "../check-ins-repository";
import { randomUUID } from "node:crypto";

export class inMemoryCheckInsRepository implements CheckInsRepository {
    public items: CheckIn[] = [];

    async create(data: Prisma.CheckInUncheckedCreateInput) {
        const checkin = {
            id: randomUUID(),
            user_id: data.user_id,
            gymId: data.gymId,
            validated_at: data.validated_at ? new Date(data.validated_at) : null,
            created_at: new Date()
        }

        this.items.push(checkin);

        return checkin;
    }

    async findByUserIdOnDate(userId: string, date: Date) {
        const checkOnSameDate = this.items.find((checkIn) => checkIn.user_id === userId);

        if (!checkOnSameDate) {
            return null
        }

        return checkOnSameDate;
    }
}