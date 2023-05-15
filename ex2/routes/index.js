var express = require('express');
var router = express.Router();

const api = require('axios').create({
  baseURL: 'http://localhost:15015/',
  timeout: 20000,
});

router.get('/', async function(req, res) {
  let contracts = (await api.get('/contracts')).data;
  res.render('index', { contracts });
});

router.get('/:id', async function(req, res) {
  try {
    let contract = (await api.get('/contracts/' + req.params.id)).data;
    res.render('contract', { contract });
  } catch (e) {
    res.send(404)
  }
});

router.get('/:id/delete', async function(req, res) {
  try {
    let contract = (await api.delete('/contracts/' + req.params.id)).data;
    res.render('delete', { contract });
  } catch (e) {
    res.send(404)
  }
});

router.get('/inst/:nipc', async function(req, res) {
  let [contracts, nomes] = await Promise.all([
    api.get('/contracts?inst=' + req.params.nipc),
    api.get('/contracts/institutions/' + req.params.nipc)
  ]);
  res.render('instituicao', { nipc: req.params.nipc, contracts: contracts.data, nomes: nomes.data });
});

module.exports = router;
