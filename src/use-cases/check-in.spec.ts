import { describe, expect, it, beforeEach, vi, afterEach } from 'vitest';
import { inMemoryCheckInsRepository } from '@/repositories/in-memory-repository/in-memory-check-ins-repository';
import { CheckInUseCase } from './check-in-use-case';
import { inMemoryGymRepository } from '@/repositories/in-memory-repository/in-memory-gyms-repository';
import { Decimal } from '@prisma/client/runtime/library';

let checkInsRepository: inMemoryCheckInsRepository;
let gymsRepository: inMemoryGymRepository;
let sut: CheckInUseCase;

// Mocking -> Criar valores falsos para simular o comportamento de um objeto real

describe('Check-in use case', () => {
    beforeEach(async () => {
        checkInsRepository = new inMemoryCheckInsRepository();
        gymsRepository = new inMemoryGymRepository();
        sut = new CheckInUseCase(checkInsRepository, gymsRepository);

        await gymsRepository.create({
            id: 'gym-01',
            title: 'Javascript Gym',
            description: '',
            phone: '',
            latitude: new Decimal(19.5137925),
            longitude: new Decimal(-40.6677896)
        })

        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers();
    })

    it('should be able to check in', async () => {

        // Executando o caso de uso de registro
        const { checkIn } = await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: 19.5137925,
            userLongitude: -40.6677896
        });

        expect(checkIn.id).toEqual(expect.any(String));
    })

    // red -> Significa que o teste falhou
    // green -> Significa que o teste passou -> Vamos codar o mínimo possível para que o teste passe
    // Refactor -> Vamos refatorar o código para que ele fique mais limpo e organizado

    it('should not be able to check in twice in the same day', async () => {
        // Executando o caso de uso de registro
        const { checkIn } = await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: 19.5137925,
            userLongitude: -40.6677896
        });

        await expect(() => sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: 19.5137925,
            userLongitude: -40.6677896
        })).rejects.toBeInstanceOf(Error);
    })

    it('should be able to check in twice in different days', async () => {
        vi.setSystemTime(new Date(2024, 0, 20, 8, 0, 0));

        // Executando o caso de uso de registro
        await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: 19.5137925,
            userLongitude: -40.6677896
        })

        vi.setSystemTime(new Date(2024, 0, 21, 8, 0, 0));

        const { checkIn } = await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: 19.5137925,
            userLongitude: -40.6677896
        })

        expect(checkIn.id).toEqual(expect.any(String));
    })

    it('should not be able to check in on distant gym', async () => {

        gymsRepository.items.push({
            id: 'gym-02',
            title: 'Javascript Gym',
            description: '',
            phone: '',
            latitude: new Decimal(-19.52182096),
            longitude: new Decimal(-40.63942579)
        });

        await expect(sut.execute({
            gymId: 'gym-02',
            userId: 'user-01',
            userLatitude: -19.51848243,
            userLongitude: -40.6675291
        })
        ).rejects.toBeInstanceOf(Error);
    })
})
