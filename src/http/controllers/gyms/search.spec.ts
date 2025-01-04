import request from 'supertest';
import { app } from '@/app';
import { beforeAll, describe, expect, it } from 'vitest';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';

describe('Search e2e', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to search gyms by title', async () => {
        const { token } = await createAndAuthenticateUser(app);

        // Cria a academia mais perto
        await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'JavaScript Gym',
                description: 'Some description',
                phone: '2799999999999',
                latitude: 19.5137925,
                longitude: -40.6677896
            });

        // Cria a Academia mais longe
        await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'TypeScript Gym',
                description: 'Some description',
                phone: '2799999999999',
                latitude: 19.5137925,
                longitude: -40.6677896
            });

        // faz um get no nosso search
        const response = await request(app.server)
            .get('/gyms/search')
            .query({
                q:
                    'TypeScript Gym'
            })
            .set('Authorization', `Bearer ${token}`)
            .send();

        expect(response.statusCode).toEqual(200);
        expect(response.body.gyms).toHaveLength(1);
        expect(response.body.gyms).toEqual([
            expect.objectContaining({
                title: 'JavaScript Gym'
            })
        ]);
    })
})