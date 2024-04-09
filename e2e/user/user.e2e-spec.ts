import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import * as request from 'supertest';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should authenticate admin user and return a token', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: "superadmin@gmail.com",
        password:"12345678"
      });
    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body).toHaveProperty('token');
    expect(typeof response.body.token).toBe('string');
  });

  it('should authenticate non-admin user and return a token', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'user@gmail.com',
        password: '12345678',
      });

    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body).toHaveProperty('token');
    expect(typeof response.body.token).toBe('string');
  });

  afterAll(async () => {
    await app.close();
  });
});
