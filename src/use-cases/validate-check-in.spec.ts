import { describe, expect, it, beforeEach, vi, afterEach } from 'vitest';
import { inMemoryCheckInsRepository } from '@/repositories/in-memory-repository/in-memory-check-ins-repository';
import { CheckInUseCase } from './check-in-use-case';
import { inMemoryGymRepository } from '@/repositories/in-memory-repository/in-memory-gyms-repository';
import { ValidateCheckInUseCase } from './validate-check-in';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

let checkInsRepository: inMemoryCheckInsRepository;
let sut: ValidateCheckInUseCase;

// Mocking -> Criar valores falsos para simular o comportamento de um objeto real

describe('Check-in use case', () => {
    beforeEach(async () => {
        checkInsRepository = new inMemoryCheckInsRepository();
        sut = new ValidateCheckInUseCase(checkInsRepository);

        // vi.useFakeTimers()
    })

    afterEach(() => {
        // vi.useRealTimers();
    })

    it('should be able to validate the check-in', async () => {
        const createdCheckIn = await checkInsRepository.create({
            gymId: 'gym-01',
            user_id: 'user-01',
        })

        // Executando o caso de uso de registro
        const { checkIn } = await sut.execute({
            checkInId: createdCheckIn.id,
        });

        expect(checkIn.validated_at).toEqual(expect.any(Date));
        expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date));
    })

    it('should not be able to validate an inexistent check-in', async () => {
        expect(async () =>
            await sut.execute({
                checkInId: 'ineixstent-check-in',
            })
        ).rejects.toBeInstanceOf(ResourceNotFoundError);
    })

})
