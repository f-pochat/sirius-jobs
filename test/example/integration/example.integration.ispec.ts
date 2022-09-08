import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { DatabaseService } from '@shared/service';

import { sync, teardown } from '../../shared.test.module';
import { ExampleTestModule } from './module/example.test.module';

describe('Example Controller (e2e)', () => {

  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ExampleTestModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  beforeAll(() => {
    sync();
  });

  afterAll(async () => {
    await teardown(app.get<DatabaseService>(DatabaseService));
  });

  const input = {
    text: 'Example text',
  };

  let output: any;
  it('/ (POST)', async () => {
    output = await request(app.getHttpServer()).post('/example').send(input);

    expect(output.status).toBe(201);
    expect(output.body.text).toBe(input.text);
  });

  it('/ (GET)', async () => {
    output = await request(app.getHttpServer()).get('/example').send({text: input.text});

    expect(output.status).toBe(200);
    expect(output.body.text).toBe(input.text); 
  });

});