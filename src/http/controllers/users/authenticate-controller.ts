import { PrismaUsersRepository } from "@/repositories/prisma/prisma-user-repository";
import { AuthenticateUseCase } from "@/use-cases/authenticate";
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";
import { makeAuthenticateUseCase } from "@/use-cases/factories/make-authenticate-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
    const authencicateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
    });

    const { email, password } = authencicateBodySchema.parse(request.body);

    try {
        const authenticateUseCase = makeAuthenticateUseCase();

        const { user } = await authenticateUseCase.execute({ email, password });

        const token = await reply.jwtSign({}, {
            sign: {
                sub: user.id,
            }
        }
        );

        return reply.status(201).send({
            token
        });

    } catch (err) {
        if (err instanceof InvalidCredentialsError) {
            return reply.status(400).send({ message: err.message });
        }

        throw err;
    }

}
