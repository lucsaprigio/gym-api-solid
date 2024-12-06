import { describe, expect, it } from 'vitest';
import { RegisterUseCase } from './register-use-case';
import { compare } from 'bcryptjs';
import { inMemoryUsersRepository } from '@/repositories/in-memory-repository/in-memory-users-repository';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';


describe('Register use case', () => {
    it('should be able to register', async () => {
        // Nos testes unitários, não devemos depender de implementações externas, como o banco de dados. (prisma neste caso)
        const usersRepository = new inMemoryUsersRepository();
        const registerUseCase = new RegisterUseCase(usersRepository);

        // Executando o caso de uso de registro
        const { user } = await registerUseCase.execute({
            name: 'John Doe',
            email: 'jonhdoe@example.com',
            password: '123456'
        });

        expect(user.id).toEqual(expect.any(String));
    })

    it('should hash user password upon registration', async () => {
        // Nos testes unitários, não devemos depender de implementações externas, como o banco de dados. (prisma neste caso)
        const usersRepository = new inMemoryUsersRepository();
        const registerUseCase = new RegisterUseCase(usersRepository);

        // Executando o caso de uso de registro
        const { user } = await registerUseCase.execute({
            name: 'John Doe',
            email: 'jonhdoe@example.com',
            password: '123456'
        });

        // Verificando se a senha foi corretamente criptografada
        const isPasswordCorrectyHashed = await compare('123456', user.password_hash);

        expect(isPasswordCorrectyHashed).toBe(true);
    })

    it('should not be able to register with same email twice', async () => {
        const usersRepository = new inMemoryUsersRepository(); // Usando o repositório em memória (banco de dados)
        const registerUseCase = new RegisterUseCase(usersRepository);

        const email = 'jonhdoe@example.com';
 
        // Vamos pegar o nosso primeiro usuário
        await registerUseCase.execute({
            name: 'John Doe',
            email,
            password: '123456'
        });

        // Esperamos que essa promise seja rejeitada
        expect(() => registerUseCase.execute({ // Usamos a função anônima para capturar a exceção
            name: 'John Doe',
            email,
            password: '123456'
        })).rejects.toBeInstanceOf(UserAlreadyExistsError); // Pela instância do erro
    })
})

//# F81