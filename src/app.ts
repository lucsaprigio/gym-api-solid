import fastify from 'fastify';
import { usersRoutes } from './http/controllers/users/routes';
import { gymsRoutes } from './http/controllers/gyms/routes';
import { ZodError } from 'zod';
import { env } from 'process';
import fastifyJwt from '@fastify/jwt';
import { checkinsRoutes } from './http/controllers/check-ins/routes';

export const app = fastify();

app.register(usersRoutes);
app.register(gymsRoutes);
app.register(checkinsRoutes);

app.register(fastifyJwt, {
    secret: env.JWT_SECRET || 'default_secret',
})

app.setErrorHandler((error, request, reply) => {
    if (error instanceof ZodError) {
        return reply.status(400).send({ message: 'Validation error', issues: error.format() })
    }

    if (env.NODE_ENV !== 'production') {
        console.error(error);
    } else {
        // TODO: Here we should log to an external tool like Sentry
    }

    return reply.status(500).send({ message: 'Internal server error' });
});
