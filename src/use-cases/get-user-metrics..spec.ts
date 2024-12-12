import { describe, expect, it, beforeEach } from 'vitest';
import { inMemoryCheckInsRepository } from '@/repositories/in-memory-repository/in-memory-check-ins-repository';
import { FecthUserCheckInsHistory } from './fetch-user-check-ins.history';
import { GetUserMetricsUseCase } from './get-user-metrics';

let checkInsRepository: inMemoryCheckInsRepository;
let sut: GetUserMetricsUseCase;

// Mocking -> Criar valores falsos para simular o comportamento de um objeto real

describe('Get user metrics use case', () => {
    beforeEach(async () => {
        checkInsRepository = new inMemoryCheckInsRepository();
        sut = new GetUserMetricsUseCase(checkInsRepository);

    })
    it('should be able to get check-ins count from metrics.', async () => {
        await checkInsRepository.create({
            gymId: 'gym-01',
            user_id: 'user-01',
        })

        await checkInsRepository.create({
            gymId: 'gym-02',
            user_id: 'user-01',
        })

        // Executando o caso de uso de registro
        const { checkInsCount } = await sut.execute({
            userId: 'user-01',
        });

        expect(checkInsCount).toEqual(2);
    })

})
