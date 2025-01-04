import request from 'supertest';
import { app } from '@/app';
import { beforeAll, describe, expect, it } from 'vitest';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';

describe('Gym e2e', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to create a gym', async () => {
        const { token } = await createAndAuthenticateUser(app);

        const response = await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'JavaScript Gym',
                description: 'Some description',
                phone: '2799999999999',
                latitude: 19.5137925,
                longitude: -40.6677896
            });

        expect(response.statusCode).toEqual(201);
    })
})