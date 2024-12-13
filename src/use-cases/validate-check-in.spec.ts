import { describe, expect, it, beforeEach, vi, afterEach } from 'vitest';
import { inMemoryCheckInsRepository } from '@/repositories/in-memory-repository/in-memory-check-ins-repository';
import { ValidateCheckInUseCase } from './validate-check-in';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

let checkInsRepository: inMemoryCheckInsRepository;
let sut: ValidateCheckInUseCase;

// Mocking -> Criar valores falsos para simular o comportamento de um objeto real

describe('Check-in use case', () => {
    beforeEach(async () => {
        checkInsRepository = new inMemoryCheckInsRepository();
        sut = new ValidateCheckInUseCase(checkInsRepository);

        vi.useFakeTimers()
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

    it('should not be able to validate the check-in after 20 minutes of its creation', async () => {
        vi.setSystemTime(new Date(2023, 0, 1, 13, 40)) // Setando a data e hora do sistema

        const createdCheckIn = await checkInsRepository.create({
            gymId: 'gym-01',
            user_id: 'user-01',
        })

        const twentyOneMinutesInMs = 1000 * 60 * 21;

        vi.advanceTimersByTime(twentyOneMinutesInMs); // Avançando o tempo em 21 minutos

        await expect(() =>
            sut.execute({
                checkInId: createdCheckIn.id,
            })
        ).rejects.toBeInstanceOf(Error);
    })

})
