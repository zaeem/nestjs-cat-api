import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import * as request from 'supertest';
import { CAT_USECASE_PROXY } from '../../src/infrastructure-usecases-bridge/usecase-proxy';
import { Cat } from '../../src/infrastructure/orm/entities/cat.entity';
import { INestApplication } from '@nestjs/common';
import {JwtAuthGuard} from "../../src/infrastructure/guards/jwt-auth.guard"
import {RolesGuard} from "../../src/infrastructure/guards/role.guard"
import { CanActivate, ExecutionContext } from '@nestjs/common';

export class MockUserAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    request.user = { userId: 1, email: 'user@test.com', roles: ['USER'] };
    if (request.path == '/cats/favorites/2' || request.method === 'GET') {
        return true; 
      }
    return false ;
  }
}

export class MockAdminAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    request.user = { userId: 1, email: 'admin@test.com', roles: ['admin'] };
    return true ;
  }
}


describe('CatController for Admin (e2e)', () => {
  let app: INestApplication;
  const mockDeleteResult = {
    affected: 1, 
  }
  const mockUpdateResult = {
    affected: 1, 
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
    .overrideProvider(CAT_USECASE_PROXY)
    .useValue({
      getInstance: () => ({
        delete: jest.fn().mockResolvedValue(mockDeleteResult),
        markFavoriteCatByUser: jest.fn().mockImplementation(()=>Promise.resolve({id:1, cat:{id: 1, name:'cat-1'}})),
        create: jest.fn().mockImplementation((cat: Cat) => Promise.resolve(cat)),
        list: jest.fn().mockResolvedValue([]),
        findById: jest.fn().mockImplementation(()=>Promise.resolve({id:1, name:'cat-1'})),
        update: jest.fn().mockResolvedValue(mockUpdateResult),
        getFavoritesItem: jest.fn().mockImplementation(()=>Promise.resolve([
            {id:1, cat:{id: 1, name:'cat-1'}}
        ])),

      }),
    })
    .overrideGuard(JwtAuthGuard).useClass(MockAdminAuthGuard)
    .overrideGuard(RolesGuard).useClass(MockAdminAuthGuard)
    .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  it('/cats/favorites/ (FAVORITE) - success', () => {
    const payload = {catId:1}
    return request(app.getHttpServer())
      .post('/cats/favorites/2')
      .send(payload) 
      .expect(200)
      .then((response) => {
        expect(response.body).not.toBeNull();
        expect(response.body).toHaveProperty('cat')
      })
  });
  it('/favorites/list (FAVORITELIST) - success', () => {
    return request(app.getHttpServer())
      .get('/cats/3/favorites/list')
      .expect(200)
      .then((response) => {
        expect(response.body).not.toBeNull();
        expect(Array.isArray(response.body)).toBeTruthy();
      })
     
  });
  it('/cats (CATSLIST) - success', () => {
    return request(app.getHttpServer())
      .get('/cats')
      .expect(200)
      .then((response) => {
        expect(response.body).not.toBeNull();
        expect(Array.isArray(response.body)).toBeTruthy();
      })
     
  });
  it('/cats/id (CATBYID) - success', () => {
    return request(app.getHttpServer())
      .get('/cats/1')
      .expect(200)
      .then((response) => {
        expect(response.body).not.toBeNull();
        expect(response.body).toHaveProperty('name')

      })
     
  });

  it('/cats/:id (DELETE) - success', () => {
    return request(app.getHttpServer())
      .delete('/cats/1') 
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(mockDeleteResult);
      })
     
  });
  it('/cats/:id (UPDATE) - success', () => {
    return request(app.getHttpServer())
      .put('/cats/1')
      .send({name: 'update-cat'}) 
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(mockUpdateResult);
      })
  });
  it('/cats/ (CREATE) - success', () => {
    const payload = {name: 'cat-new'}
    return request(app.getHttpServer())
      .post('/cats')
      .send(payload) 
      .expect(201)
      .then((response) => {
        expect(response.body).not.toBeNull();
        expect(response.body).toEqual(payload);
      })
     
  });

  afterAll(async () => {
    await app.close();
  });

});
describe('CatController for Non-Admin (e2e)', () => {
  let app: INestApplication;
  const mockDeleteResult = {
    affected: 1, 
  }
  const mockUpdateResult = {
    affected: 1, 
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
    .overrideProvider(CAT_USECASE_PROXY)
    .useValue({
      getInstance: () => ({
        delete: jest.fn().mockResolvedValue(mockDeleteResult),
        markFavoriteCatByUser: jest.fn().mockImplementation(()=>Promise.resolve({id:1, cat:{id: 1, name:'cat-1'}})),
        create: jest.fn().mockImplementation((cat: Cat) => Promise.resolve(cat)),
        list: jest.fn().mockResolvedValue([]),
        findById: jest.fn().mockImplementation(()=>Promise.resolve({id:1, name:'cat-1'})),
        update: jest.fn().mockResolvedValue(mockUpdateResult),
        getFavoritesItem: jest.fn().mockImplementation(()=>Promise.resolve([
            {id:1, cat:{id: 1, name:'cat-1'}}
        ])),

      }),
    })
    .overrideGuard(JwtAuthGuard).useClass(MockUserAuthGuard)
    .overrideGuard(RolesGuard).useClass(MockUserAuthGuard)
    .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  it('/cats/favorites/ (FAVORITE) - success', () => {
    const payload = {catId:1}
    return request(app.getHttpServer())
      .post('/cats/favorites/2')
      .send(payload) 
      .expect(200)
      .then((response) => {
        expect(response.body).not.toBeNull();
        expect(response.body).toHaveProperty('cat')
      })
  });
  it('/favorites/list (FAVORITELIST) - success', () => {
    return request(app.getHttpServer())
      .get('/cats/3/favorites/list')
      .expect(200)
      .then((response) => {
        expect(response.body).not.toBeNull();
        expect(Array.isArray(response.body)).toBeTruthy();
      })
     
  });
  it('/cats (CATSLIST) - success', () => {
    return request(app.getHttpServer())
      .get('/cats')
      .expect(200)
      .then((response) => {
        expect(response.body).not.toBeNull();
        expect(Array.isArray(response.body)).toBeTruthy();
      })
     
  });
  it('/cats/id (CATBYID) - success', () => {
    return request(app.getHttpServer())
      .get('/cats/1')
      .expect(200)
      .then((response) => {
        expect(response.body).not.toBeNull();
        expect(response.body).toHaveProperty('name')

      })
     
  });

  it('/cats/:id (DELETE) - success', () => {
    return request(app.getHttpServer())
      .delete('/cats/1') 
      .expect(403)
      .then((response) => {
        expect(response.body).toHaveProperty('error', 'Forbidden');
      expect(response.body).toHaveProperty('message', 'Forbidden resource');
      expect(response.body).toHaveProperty('statusCode', 403);
      })
     
  });
  it('/cats/:id (UPDATE) - success', () => {
    return request(app.getHttpServer())
      .put('/cats/1')
      .send({name: 'update-cat'}) 
      .expect(403)
      .then((response) => {
        expect(response.body).toHaveProperty('error', 'Forbidden');
      expect(response.body).toHaveProperty('message', 'Forbidden resource');
      expect(response.body).toHaveProperty('statusCode', 403);
      })
  });
  it('/cats/ (CREATE) - success', () => {
    const payload = {name: 'cat-new'}
    return request(app.getHttpServer())
      .post('/cats')
      .send(payload) 
      .expect(403)
      .then((response) => {
        expect(response.body).toHaveProperty('error', 'Forbidden');
      expect(response.body).toHaveProperty('message', 'Forbidden resource');
      expect(response.body).toHaveProperty('statusCode', 403);
      })
     
  });

  afterAll(async () => {
    await app.close();
  });

});