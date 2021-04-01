const express = require('express');
const router = express.Router();

const profile = {
  name: "Silvio Souza",
  avatar: "https://github.com/SJblu.png",
  "montly-budget": 3000,
  "days-per-week": 5,
  "hours-per-day": 5,
  "vacation-per-year": 4
}


// rota index
router.get('/', (req, res) => { res.render("index") });
router.get('/job', (req, res) => { res.render("job") });
router.post('/job', (req, res) => { 
  console.log(req.body);
 });
router.get('/job/edit', (req, res) => { res.render("job-edit") });
router.get('/profile', (req, res) => { res.render("profile", { profile })});

module.exports = router;