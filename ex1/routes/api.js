var express = require('express');
var router = express.Router();
var Contract = require('../controllers/contract')

router.get('/contracts', async function(req, res) {
  let contracts;
  if (req.query.year) {
    contracts = await Contract.getByYear(Number.parseInt(req.query.year))
  } else if (req.query.inst) {
    contracts = await Contract.getByInst(Number.parseInt(req.query.inst))
  } else {
    contracts = await Contract.list()
  }
  res.send(contracts)
});

router.post('/contracts', async function(req, res) {
  let contract = await Contract.add(req.body)
  res.send(contract)
})

router.get('/contracts/courses', async function(req, res) {
  let contrato = await Contract.getCourses()
  res.send(contrato)
});

router.get('/contracts/institutions', async function(req, res) {
  let contrato = await Contract.getInstitutions()
  res.send(contrato)
});

router.get('/contracts/institutions/:nipc', async function(req, res) {
  let nomes = await Contract.getInstitutionNames(Number.parseInt(req.params.nipc))
  res.send(nomes)
});

router.get('/contracts/:id', async function(req, res) {
  let contrato = await Contract.getById(req.params.id)
  if (contrato)
    res.send(contrato)
  else
    res.status(404).send({ error: "Contract not found" })
});

router.delete('/contracts/:id', async function(req, res) {
  let contrato = await Contract.delete(req.params.id)
  if (contrato)
    res.send(contrato)
  else
    res.status(404).send({ error: "Contract not found" })
});

module.exports = router;
