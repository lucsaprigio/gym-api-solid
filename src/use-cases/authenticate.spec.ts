import { describe, expect, it } from 'vitest';
import { inMemoryUsersRepository } from '@/repositories/in-memory-repository/in-memory-users-repository';
import { AuthenticateUseCase } from './authenticate';
import { hash } from 'bcryptjs';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';

// Vamos criar as variáveis que vamos usar nos testes como tipo global
let usersRepository: inMemoryUsersRepository;
let sut: AuthenticateUseCase;

describe('Authenticate use case', () => {
    // beforeEach -> vai rodar antes de cada teste, então nós só inicializamos a classe de repositório e o caso de uso
    beforeEach(() => {
        usersRepository = new inMemoryUsersRepository();
        sut = new AuthenticateUseCase(usersRepository);
    })

    it('should be able to authenticate', async () => {
        await usersRepository.create({
            name: 'John Doe',
            email: 'jonhdoe@example.com',
            password_hash: await hash('123456', 6)
        })

        // Executando o caso de uso de registro
        const { user } = await sut.execute({
            email: 'jonhdoe@example.com',
            password: '123456'
        });

        expect(user.id).toEqual(expect.any(String));
    })

    it('should not be able to authenticate with wrong email', async () => {
        expect(async () => {
            await sut.execute({
                email: 'jonhdoe@example.com',
                password: '123456'
            })
        }).rejects.toBeInstanceOf(InvalidCredentialsError);

    })

    it('should not be able to authenticate with wrong password', async () => {
        await usersRepository.create({
            name: 'John Doe',
            email: 'jonhdoe@example.com',
            password_hash: await hash('123456', 6)
        })

        expect(async () => {
            await sut.execute({
                email: 'jonhdoe@example.com',
                password: '123123'
            })
        }).rejects.toBeInstanceOf(InvalidCredentialsError);

    })
})

//# F81