import { describe, expect, it, beforeEach } from 'vitest';
import { RegisterUseCase } from './register-use-case';
import { compare } from 'bcryptjs';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';
import { inMemoryUsersRepository } from '@/repositories/in-memory-repository/in-memory-users-repository';

let usersRepository: inMemoryUsersRepository;
let sut: RegisterUseCase;

describe('Register use case', () => {
    beforeEach(() => {
        usersRepository = new inMemoryUsersRepository();
        sut = new RegisterUseCase(usersRepository);
    })

    it('should be able to register', async () => {
        // Executando o caso de uso de registro
        const { user } = await sut.execute({
            name: 'John Doe',
            email: 'jonhdoe@example.com',
            password: '123456'
        });

        expect(user.id).toEqual(expect.any(String));
    })

    it('should hash user password upon registration', async () => {

        // Executando o caso de uso de registro
        const { user } = await sut.execute({
            name: 'John Doe',
            email: 'jonhdoe@example.com',
            password: '123456'
        });

        // Verificando se a senha foi corretamente criptografada
        const isPasswordCorrectyHashed = await compare('123456', user.password_hash);

        expect(isPasswordCorrectyHashed).toBe(true);
    })

    it('should not be able to register with same email twice', async () => {
        const email = 'jonhdoe@example.com';

        // Vamos pegar o nosso primeiro usuário
        await sut.execute({
            name: 'John Doe',
            email,
            password: '123456'
        });

        // Esperamos que essa promise seja rejeitada
        await expect(() => sut.execute({ // Usamos a função anônima para capturar a exceção
            name: 'John Doe',
            email,
            password: '123456'
        })).rejects.toBeInstanceOf(UserAlreadyExistsError); // Pela instância do erro
    })
})
