const config = require('./utils/config');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

const requestsModule = require('./models/requests');
const Request = requestsModule.Request;
const binModule = require('./models/bins');
const Bin = binModule.Bin;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.get('/newBin', async (req, res) => {
  const newBin = new Bin({});
  const path = newBin._id;
  
  /* TODO
  return path of bin to user
  */
  await insertBin(newBin);
  console.log("New bin can be found at the following path: ", path);
  res.send();
});

app.post('/*', async (req, res) => {
  const path = req.url.slice(1);
  const foundBin = await fetchBin(path);
  
  if (!foundBin) {
    console.log("Bin not found")
    res.send();
  }

  const newReq = createRequest(req);
  await postRequest(foundBin, newReq);
  console.log("Request added to bin ", foundBin._id);

  res.send("Received, thanks!");
});

function createRequest(req) {
  const headers = req.headers;
  const body = req.body;

  return new Request({
    headers,
    body,
  });
}

async function insertBin(newBin) {
  await mongoose.connect('mongodb://localhost:27017/hooks');
  
  await newBin.save();
  
  mongoose.disconnect();
}

async function postRequest(foundBin, newReq) {
  await mongoose.connect('mongodb://localhost:27017/hooks');

  foundBin.requests.push(newReq);
  await foundBin.save();

  mongoose.disconnect();
}

async function fetchBin(path) {
  await mongoose.connect('mongodb://localhost:27017/hooks');
  const query = Bin.where({"_id": `${path}`});
  const results = await query.findOne();
  mongoose.disconnect();
  return results;
}

app.listen(config.PORT, () => {
  console.log(`App server listening on localhost:${config.PORT}`);
});