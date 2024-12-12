import { describe, expect, it, beforeEach } from 'vitest';
import { inMemoryGymRepository } from '@/repositories/in-memory-repository/in-memory-gyms-repository';
import { SearchGymsUseCase } from './search-gyms';
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms';

let gymsRepository: inMemoryGymRepository;
let sut: FetchNearbyGymsUseCase;

// Mocking -> Criar valores falsos para simular o comportamento de um objeto real

describe('Search Gyms use case', () => {
    beforeEach(async () => {
        gymsRepository = new inMemoryGymRepository();
        sut = new FetchNearbyGymsUseCase(gymsRepository);

    })
    it('should be able to fetch nearby gyms', async () => {
        await gymsRepository.create({
            title: 'Near Gym',
            description: null,
            phone: null,
            latitude: 19.5137925,
            longitude: -40.6677896
        })

        await gymsRepository.create({
            title: 'Far Gym',
            description: null,
            phone: null,
            latitude: -19.1201401534725,
            longitude: -40.37006433181114
        })

        // Executando o caso de uso de registro
        const { gyms } = await sut.execute({
            userLatitude: 19.5137925,
            userLongitude: -40.6677896
        });

        expect(gyms).toHaveLength(1);
        expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
    })

})
