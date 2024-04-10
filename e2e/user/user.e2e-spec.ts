import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import * as request from 'supertest';
import { USER_USECASE_PROXY } from '../../src/infrastructure-usecases-bridge/usecase-proxy';

describe('UserController (e2e)', () => {
  let app;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
    .overrideProvider(USER_USECASE_PROXY)
    .useValue({
      getInstance: () => ({
        signUp: jest.fn().mockImplementation((dto) => Promise.resolve(dto)),
        login: jest.fn().mockImplementation((dto) => Promise.resolve({ token: 'mockToken', ...dto })),
        validateUser: jest.fn().mockImplementation(()=>true)
      }),
    })
    .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/register (POST) - success', () => {
    return request(app.getHttpServer())
      .post('/auth/register')
      .send({ email: 'testuser@test.com', password: 'testpass' ,role:'user', name:'test'})
      .expect(201) 
      .then((response) => {
        expect(response.body.email).toEqual('testuser@test.com');
        expect(response.body.name).toEqual('test');
        expect(response.body.role).toEqual('user');
      });
  });


  it('/auth/login (POST) - success', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'testuser@test.com', password: 'testpass' })
      .expect(200) 
      .then((response) => {
        expect(response.body.token).toBeDefined();
      });
  });

  afterAll(async () => {
    await app.close();
  });
});