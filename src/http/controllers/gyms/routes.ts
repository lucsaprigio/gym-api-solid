import { FastifyInstance } from "fastify";

import { verifyJWT } from "@/middlewares/verify-jwt";
import { search } from "./search";
import { nearby } from "./nearby";
import { create } from "./create";

export async function gymsRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJWT); // Vai verificar se o token é válido em todas as rotas

    app.get('/gyns/search', search)
    app.get('/gyns/nearby', nearby)

    app.post('/gyms', create)

}
