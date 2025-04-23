const express = require('express');
const router = require('../routes/mtos.js');
const request = require('supertest');
const db = require('../database/models/index.js');
const sequelize = db.sequelize;
const Mtos = db.Mtos;

// Set Jest timeout to 10 seconds
jest.setTimeout(10000);

const app = express();
app.use(express.json());
app.use('/mtos', router);

describe('POST /mtos/store', () => {
  beforeEach(async () => {
    try {
      console.log('Starting database setup...');
      await sequelize.transaction(async (t) => {
        console.log('Disabling foreign key checks...');
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 0', { transaction: t });
        console.log('Foreign key checks disabled');

        console.log('Dropping tables...');
        try {
          await db.Cobros.drop({ transaction: t });
          console.log('Cobros dropped successfully');
        } catch (err) {
          console.log('Cobros drop ignored:', err.message);
        }

        try {
          await db.Mtos.drop({ transaction: t });
          console.log('Mtos dropped successfully');
        } catch (err) {
          console.log('Mtos drop ignored:', err.message);
        }

        try {
          await db.Proc.drop({ transaction: t });
          console.log('Proc dropped successfully');
        } catch (err) {
          console.log('Proc drop ignored:', err.message);
        }

        try {
          await db.Miembro.drop({ transaction: t });
          console.log('Miembro dropped successfully');
        } catch (err) {
          console.log('Miembro drop ignored:', err.message);
        }

        console.log('Syncing database...');
        await db.Miembro.sync({ force: true, transaction: t });
        console.log('Miembro synced successfully');
        await db.Proc.sync({ force: true, transaction: t });
        console.log('Proc synced successfully');
        await db.Mtos.sync({ force: true, transaction: t });
        console.log('Mtos synced successfully');
        await db.Cobros.sync({ force: true, transaction: t });
        console.log('Cobros synced successfully');

        console.log('Re-enabling foreign key checks...');
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1', { transaction: t });
        console.log('Foreign key checks re-enabled');

        await db.Miembro.create({ miemID: 'testUser', password: 'test' }, { transaction: t });
        console.log('Miembro seeded');
        await db.Proc.create(
          { PROC: '5y', ACTO: 'actor', DEMA: 'demandada', MIEM: 'testUser' },
          { transaction: t }
        );
        console.log('Proc seeded');
      });

      console.log('Sync complete.');
    } catch (error) {
      console.error('Sync failed with error:', error.message, error.stack, error.original);
      throw error;
    }
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should create a new client and save it to the database', async () => {
    const newClient = { proc: '5y', descripcion: 'test', usuario: 'testUser' };
    const response = await request(app)
      .post('/mtos/store')
      .send(newClient)
      .expect(201);
    expect(response.body).toHaveProperty('mtoId');
  });

  it('should return 500 if database fails', async () => {
    const proc = await db.Proc.findOne({ where: { PROC: '5y' } });
    console.log('Proc exists:', !!proc);

    const createSpy = jest.spyOn(Mtos, 'create').mockRejectedValue(new Error('DB error'));
    console.log('Mock applied:', createSpy.mock.calls.length === 0);

    const response = await request(app)
      .post('/mtos/store')
      .send({ proc: '5y', descripcion: 'test', usuario: 'testUser' });

    console.log('Response status:', response.status);
    console.log('Response body:', JSON.stringify(response.body));
    console.log('Mock called:', createSpy.mock.calls.length > 0);

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Failed to create row' });

    createSpy.mockRestore();
  });
});