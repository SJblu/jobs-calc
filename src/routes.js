const express = require('express');
const router = express.Router();
const path = require('path');

const basePath = path.join(__dirname, '/views/');

const profile = {
  name: "Silvio Souza",
  avatar: "https://avatars.githubusercontent.com/u/19346642?v=4",
  "montly-budget": 3000,
  "days-per-week": 5,
  "hours-per-day": 5,
  "vacation-per-year": 4
}


// rota index
router.get('/', (req, res) => { res.render(basePath + "index") });
router.get('/job', (req, res) => { res.render(basePath + "job") });
router.get('/job/edit', (req, res) => { res.render(basePath + "job-edit") });
router.get('/profile', (req, res) => { res.render(basePath + "profile", { profile })});

module.exports = router;