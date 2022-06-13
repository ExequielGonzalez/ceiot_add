const Pool = require('pg').Pool;
const pool = new Pool({
  //   host: '172.21.0.2',
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'test_db',
  port: 5432,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

const getDevices = (request, response) => {
  pool.query(
    'SELECT "project","id","latitude","longitude" FROM devices ORDER BY project ASC',
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const getDeviceById = (request, response) => {
  const id = parseInt(request.params.id);
  pool.query(
    'SELECT "project","latitude","longitude" FROM devices WHERE id = $1',
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const getDevicesLowBattery = (request, response) => {
  const limit = parseFloat(request.params.limit);
  pool.query(
    `SELECT DISTINCT ON (device_id) "device_id","battery",D.latitude,D.longitude,L."created_at" as "timestamp" 
      FROM logs L INNER JOIN devices D ON D.id = L.device_id
      WHERE "battery" <= $1
      GROUP BY "device_id","battery","timestamp",D.latitude,D.longitude
      ORDER BY device_id ASC, timestamp DESC `,
    [limit],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const createDevice = (request, response) => {
  const { latitude, longitude, project } = request.body;
  pool.query(
    'INSERT INTO devices (latitude, longitude, project, created_at, updated_at) VALUES ($1, $2, $3, $4, $5) RETURNING id',
    [
      latitude,
      longitude,
      project,
      new Date().toUTCString(),
      new Date().toUTCString(),
    ],
    (error, results) => {
      if (error) {
        throw error;
      }
      console.log(results);
      response.status(201).send(`Device added with ID: ${results.rows[0].id}`);
    }
  );
};

const getLogs = (request, response) => {
  pool.query(
    'SELECT "data","battery","created_at" AS "timestamp" FROM logs ORDER BY timestamp DESC',
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const getLogsByDeviceId = (request, response) => {
  const deviceId = parseInt(request.params.deviceId);
  pool.query(
    'SELECT "data","battery","created_at" AS "timestamp" FROM logs WHERE device_id = $1 ORDER BY timestamp DESC',
    [deviceId],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const getLogsHigherValue = (request, response) => {
  const limit = parseFloat(request.params.limit);
  pool.query(
    `SELECT "device_id","data",D.latitude,D.longitude,L."created_at" AS "timestamp" 
      FROM logs L INNER JOIN devices D ON D.id = L.device_id
      WHERE "data" >= $1 
      ORDER BY device_id ASC, timestamp DESC`,
    [limit],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const createLog = (request, response) => {
  const { deviceId, data, battery } = request.body;
  pool.query(
    'INSERT INTO logs (device_id, data, battery, created_at) VALUES ($1, $2, $3, $4) RETURNING id',
    [deviceId, data, battery, new Date().toUTCString()],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send({
        status: 'success',
        message: `Log added with ID: ${results.rows[0].id}`,
      });
    }
  );
};

module.exports = {
  getDevices,
  getDeviceById,
  getDevicesLowBattery,
  createDevice,
  getLogs,
  getLogsByDeviceId,
  getLogsHigherValue,
  createLog,
};
