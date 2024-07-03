import { TestModuleFactory } from '@/tests/e2e/setup/e2e.setup'
import { AppController } from '@/app.controller';

import request from 'supertest';
import { type INestApplication } from '@nestjs/common';
import { AppService } from '@/app.service';

describe('AppController (e2e)', () => {
  const endpoint = '/';
  let app: INestApplication;
  let httpServer: any;

  beforeAll(async () => {
    app = await TestModuleFactory.makeModule({
      exports: [],
      imports: [],
      controllers: [
        AppController,
      ],
      providers: [
        AppService,
      ],
    });
    httpServer = app.getHttpServer();
  });

  afterAll(async () => {
    await TestModuleFactory.dropModule(app);
  });

  async function get() {
    const response = await request(httpServer)
      .get(`${endpoint}`)
      .send();
    return response;
  }

  it('should create new user', async () => {
    const response = await get();
    expect(response.status).toBe(200);
  });
});
