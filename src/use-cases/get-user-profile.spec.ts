import { describe, expect, it } from 'vitest';
import { inMemoryUsersRepository } from '@/repositories/in-memory-repository/in-memory-users-repository';
import { hash } from 'bcryptjs';
import { GetUserProfileUseCase } from './get-user-profile';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

// Vamos criar as variáveis que vamos usar nos testes como tipo global
let usersRepository: inMemoryUsersRepository;
let sut: GetUserProfileUseCase;

describe('Get User profile use case', () => {
    // beforeEach -> vai rodar antes de cada teste, então nós só inicializamos a classe de repositório e o caso de uso
    beforeEach(() => {
        usersRepository = new inMemoryUsersRepository();
        sut = new GetUserProfileUseCase(usersRepository);
    })

    it('should be able to get user profile', async () => {
        const createdUser = await usersRepository.create({
            name: 'John Doe',
            email: 'jonhdoe@example.com',
            password_hash: await hash('123456', 6)
        })

        // Executando o caso de uso de registro
        const { user } = await sut.execute({
            userId: createdUser.id
        });

        expect(user.id).toEqual(expect.any(String));
        expect(user.name).toEqual('John Doe');
    })

    it('should not be able get user porofile wiht wrong id', async () => {
        expect(async () => {
            await sut.execute({
                userId: 'non-existing-id'
            })
        }).rejects.toBeInstanceOf(ResourceNotFoundError);
    })
})

//# F81