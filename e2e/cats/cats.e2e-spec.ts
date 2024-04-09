import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import * as request from 'supertest';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm'

describe('CatController (e2e)', () => {
    let app: INestApplication;
    let adminToken: string;
    let adminId: string
    let nonAdminToken: string;
    let catId: number;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();

        const adminResponse = await request(app.getHttpServer())
            .post('/auth/login')
            .send({
                email: 'superadmin@gmail.com',
                password: '12345678',
            });
        adminToken = adminResponse.body.token;
        adminId = adminResponse.body.id

        const nonAdminResponse = await request(app.getHttpServer())
            .post('/auth/login')
            .send({
                email: 'user@gmail.com',
                password: '12345678',
            });
        nonAdminToken = nonAdminResponse.body.token;
    });

    it('should create a new cat with an admin user', async () => {
        const response = await request(app.getHttpServer())
            .post('/cats')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({
                name: 'cat-11',
            });
        expect(response.status).toBe(HttpStatus.CREATED);
        expect(response.body).toHaveProperty('id');
        catId = response.body.id
    });

    it('should not allow non-admin user to create a new cat', async () => {
        const response = await request(app.getHttpServer())
            .post('/cats')
            .set('Authorization', `Bearer ${nonAdminToken}`)
            .send({
                name: 'cat-12',
            });
        expect(response.status).toBe(HttpStatus.FORBIDDEN);
    });

    it('should list all cats as admin', async () => {
        const response = await request(app.getHttpServer())
            .get('/cats')
            .set('Authorization', `Bearer ${adminToken}`);
        expect(response.status).toBe(HttpStatus.OK);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('should list all cats as non-admin', async () => {
        const response = await request(app.getHttpServer())
            .get('/cats')
            .set('Authorization', `Bearer ${nonAdminToken}`);
        expect(response.status).toBe(HttpStatus.OK);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('should find cat by id as admin', async () => {
        const response = await request(app.getHttpServer())
            .get(`/cats/${catId}`)
            .set('Authorization', `Bearer ${adminToken}`);
        expect(response.status).toBe(HttpStatus.OK);
        expect(response.body instanceof Object).toBe(true);
    });

    it('should find cat by id as non-admin', async () => {
        const response = await request(app.getHttpServer())
            .get(`/cats/${catId}`)
            .set('Authorization', `Bearer ${nonAdminToken}`);
        expect(response.status).toBe(HttpStatus.OK);
        expect(response.body instanceof Object).toBe(true);
    });

    it('should not update cat as non-admin', async () => {
        const response = await request(app.getHttpServer())
            .put(`/cats/${catId}`)
            .set('Authorization', `Bearer ${nonAdminToken}`);
        expect(response.status).toBe(HttpStatus.FORBIDDEN);
    });

    it('should update cat as admin', async () => {
        const response = await request(app.getHttpServer())
        .put(`/cats/${catId}`)
        .send({
                name: 'updated-cat'
            })
            .set('Authorization', `Bearer ${adminToken}`);
        expect(response.status).toBe(HttpStatus.OK);
        expect(response.body).toHaveProperty('affected');
    });
   
    it('should mark cat as favorite as admin', async () => {
        const response = await request(app.getHttpServer())
        .post(`/cats/favorites/${adminId}`)
        .send({
            catId: catId.toString()
        })
            .set('Authorization', `Bearer ${adminToken}`);
        expect(response.status).toBe(HttpStatus.OK);
        expect(response.body).toHaveProperty('user');
    });

    it('should get list of favorite cats as admin', async () => {
        const response = await request(app.getHttpServer())
        .get(`/cats/${adminId}/favorites/list`)
            .set('Authorization', `Bearer ${adminToken}`);
        expect(response.status).toBe(HttpStatus.OK);
    });

    it('should not delete cat as non-admin', async () => {
        const response = await request(app.getHttpServer())
        .delete(`/cats/${catId}`)
            .set('Authorization', `Bearer ${nonAdminToken}`);
        expect(response.status).toBe(HttpStatus.FORBIDDEN);
    });

    it('should delete cat as admin', async () => {
        const response = await request(app.getHttpServer())
        .delete(`/cats/${catId}`)
            .set('Authorization', `Bearer ${adminToken}`);
        expect(response.status).toBe(HttpStatus.OK);
        expect(response.body).toHaveProperty('affected');
    });

    afterAll(async () => {
        await app.close();
    });
});
