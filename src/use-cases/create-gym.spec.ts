import { describe, expect, it, beforeEach } from 'vitest';
import { RegisterUseCase } from './register-use-case';
import { inMemoryGymRepository } from '@/repositories/in-memory-repository/in-memory-gyms-repository';
import { CreateGymUseCase } from './create-gym-use-case';

let gymsRepository: inMemoryGymRepository;
let sut: CreateGymUseCase;

describe('Create gym Use case', () => {
    beforeEach(() => {
        gymsRepository = new inMemoryGymRepository();
        sut = new CreateGymUseCase(gymsRepository);
    })

    it('should be able to create gym', async () => {
        // Executando o caso de uso de registro
        const { gym } = await sut.execute({
            title: 'Javascript Academy',
            description: null,
            phone: null,
            latitude: 19.5137925,
            longitude: -40.6677896
        });

        expect(gym.id).toEqual(expect.any(String));
    })
})
