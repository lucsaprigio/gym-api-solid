import { describe, expect, it, beforeEach } from 'vitest';
import { inMemoryCheckInsRepository } from '@/repositories/in-memory-repository/in-memory-check-ins-repository';
import { FecthUserCheckInsHistory } from './fetch-user-check-ins.history';

let checkInsRepository: inMemoryCheckInsRepository;
let sut: FecthUserCheckInsHistory;

// Mocking -> Criar valores falsos para simular o comportamento de um objeto real

describe('Fetch check-in history use case', () => {
    beforeEach(async () => {
        checkInsRepository = new inMemoryCheckInsRepository();
        sut = new FecthUserCheckInsHistory(checkInsRepository);

    })
    it('should be able to fetch check-in history.', async () => {
        await checkInsRepository.create({
            gymId: 'gym-01',
            user_id: 'user-01',
        })

        await checkInsRepository.create({
            gymId: 'gym-02',
            user_id: 'user-01',
        })

        // Executando o caso de uso de registro
        const { checkIns } = await sut.execute({
            userId: 'user-01',
            page: 1
        });

        expect(checkIns).toHaveLength(2);
        expect(checkIns).toEqual([
            expect.objectContaining({ gymId: 'gym-01', }),
            expect.objectContaining({ gymId: 'gym-02', })
        ])
    })

    it('should be able to fetch pagineted check-in history.', async () => {
        for (let i = 1; i <= 22; i++) {
            await checkInsRepository.create({
                gymId: `gym-${i}`,
                user_id: 'user-01',
            })
        }

        // Executando o caso de uso de registro
        const { checkIns } = await sut.execute({
            userId: 'user-01',
            page: 2
        });

        expect(checkIns).toHaveLength(2);
        expect(checkIns).toEqual([
            expect.objectContaining({ gymId: 'gym-21', }), // Espera que o objeto contenha a propriedade gymId com o valor 'gym-21'
            expect.objectContaining({ gymId: 'gym-22', })
        ])
    })

})
