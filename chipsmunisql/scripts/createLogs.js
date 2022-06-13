const fetch = require('node-fetch');

async function createLog(devices) {
  const devicePick = Math.floor(Math.random() * devices.length) ;
  
  const body = {
    deviceId: devices[devicePick],
    data: Math.random() * 5,
    battery: Math.random() * 100,
  };
  console.log(body);
  const response = await fetch('http://localhost:3001/logs', {
    method: 'post',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  });  
  return await response.json();
}

(async function () {
  const response = await fetch('http://localhost:3001/devices');
  const data = await response.json();

  const devices = data.map((device) => device.id);
  console.log(devices);
  setInterval(async () => {
  const response  = await createLog(devices);
    console.log('result: ', response);
  }, 1000);
})();
