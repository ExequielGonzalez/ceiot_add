const express = require('express')
const bodyParser = require('body-parser')
const db = require('./queries');

//install cors
const cors = require('cors')
const app = express()
const port = 3001

//initialize cors
app.use(cors())



app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' });
});

app.get('/devices', db.getDevices);
app.get('/devices/:id', db.getDeviceById);
app.get('/devices/low-battery/:limit', db.getDevicesLowBattery);
app.get('/logs', db.getLogs);
app.get('/logs/:deviceId', db.getLogsByDeviceId);
app.get('/logs/higher/:limit', db.getLogsHigherValue);
app.post('/devices', db.createDevice);
app.post('/logs',db.createLog)

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});