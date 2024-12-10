import { describe, expect, it, beforeEach, vi, afterEach } from 'vitest';
import { inMemoryCheckInsRepository } from '@/repositories/in-memory-repository/in-memory-check-ins-repository';
import { CheckInUseCase } from './chekin-use-case';

let checkInsRepository: inMemoryCheckInsRepository;
let sut: CheckInUseCase;

// Mocking -> Criar valores falsos para simular o comportamento de um objeto real

describe('Check-in use case', () => {
    beforeEach(() => {
        checkInsRepository = new inMemoryCheckInsRepository();
        sut = new CheckInUseCase(checkInsRepository);

        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers();
    })

    it('should be able to check in', async () => {
        vi.setSystemTime(new Date(2024, 1, 1, 10, 0, 0));

        // Executando o caso de uso de registro
        const { chekIn } = await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01'
        });

        expect(chekIn.id).toEqual(expect.any(String));
    })

    // red -> Significa que o teste falhou
    // green -> Significa que o teste passou -> Vamos codar o mínimo possível para que o teste passe
    // Refactor -> Vamos refatorar o código para que ele fique mais limpo e organizado

    it('should not be able to check in twice in the same day', async () => {
        // Executando o caso de uso de registro
        const { chekIn } = await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01'
        });

        await expect(() => sut.execute({
            gymId: 'gym-01',
            userId: 'user-01'
        })).rejects.toBeInstanceOf(Error);
    })

    it('should be able to check in twice in different days', async () => {
        vi.setSystemTime(new Date(2024, 1, 1, 10, 0, 0));

        // Executando o caso de uso de registro
        await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01'
        })

        vi.setSystemTime(new Date(2024, 1, 1, 10, 0, 0));

        const { chekIn } = await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01'
        })

        expect(chekIn.id).toEqual(expect.any(String));
    })
})

// # F90