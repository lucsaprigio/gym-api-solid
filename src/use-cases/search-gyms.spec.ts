import { describe, expect, it, beforeEach } from 'vitest';
import { inMemoryGymRepository } from '@/repositories/in-memory-repository/in-memory-gyms-repository';
import { SearchGymsUseCase } from './search-gyms';

let gymsRepository: inMemoryGymRepository;
let sut: SearchGymsUseCase;

// Mocking -> Criar valores falsos para simular o comportamento de um objeto real

describe('Search Gyms use case', () => {
    beforeEach(async () => {
        gymsRepository = new inMemoryGymRepository();
        sut = new SearchGymsUseCase(gymsRepository);

    })
    it('should be able to search for gyms.', async () => {
        await gymsRepository.create({
            title: 'Javascript Gym',
            description: null,
            phone: null,
            latitude: 19.5137925,
            longitude: -40.6677896
        })

        await gymsRepository.create({
            title: 'Typescript Gym',
            description: null,
            phone: null,
            latitude: 19.5137925,
            longitude: -40.6677896

        })

        // Executando o caso de uso de registro
        const { gyms } = await sut.execute({
            query: 'Javascript',
            page: 1
        });

        expect(gyms).toHaveLength(1);
        expect(gyms).toEqual([expect.objectContaining({ title: 'Javascript Gym' })])
    })

    it('should be able to fetch pagineted checkgyms search.', async () => {
        for (let i = 1; i <= 22; i++) {
            await gymsRepository.create({
                title: `JavaScript Gym ${i}`,
                description: null,
                phone: null,
                latitude: 19.5137925,
                longitude: -40.6677896
            })
        }

        // Executando o caso de uso de registro
        const { gyms } = await sut.execute({
            query: 'JavaScript',
            page: 2
        });

        expect(gyms).toHaveLength(2);
        expect(gyms).toEqual([
            expect.objectContaining({ title: 'JavaScript Gym 21', }), // Espera que o objeto contenha a propriedade title com o valor 'gym-21'
            expect.objectContaining({ title: 'JavaScript Gym 22', })
        ])
    })

})
