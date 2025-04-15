import router from '../routes/mtos';
import { request } from 'supertest';
import express from 'express';
const sequelize = db.sequelize;
const Mtos = db.Mtos;
import db from '../database/models/index';



const app = express();
app.use(express.json());
app.use('/mtos', router);

describe('POST /mtos/store', () => {
  beforeEach(async () => {
    try {
      console.log('Dropping tables...');
      await db.Mtos.drop();
      console.log('Syncing database...');
      await sequelize.sync({ force: true });
      await db.Proc.create({ PROC: '5y' });
      console.log('Sync complete.');
    } catch (error) {
      console.error('Sync failed with error:', error.stack);
      throw error;
    }
  });

  afterEach(() => {
    jest.restoreAllMocks(); // Clean up mocks
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should create a new client and save it to the database', async () => {
    const newClient = { proc: '5y', descripcion: 'test' };
    const response = await request(app)
      .post('/mtos/store')
      .send(newClient)
      .expect(201);
    expect(response.body).toHaveProperty('mtoId');
  });

  it('should return 500 if database fails', async () => {
    // Apply mock before the request
    const createSpy = jest.spyOn(Mtos, 'create').mockRejectedValue(new Error('DB error'));
    console.log('Mock applied:', createSpy.mock.calls.length === 0); // Should be true initially

    const response = await request(app)
      .post('/mtos/store')
      .send({ proc: '5y', descripcion: 'test' });

    console.log('Response status:', response.status);
    console.log('Response body:', JSON.stringify(response.body));
    console.log('Mock called:', createSpy.mock.calls.length > 0); // Should be true after request

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Failed to create row' });

    createSpy.mockRestore();
  });
});