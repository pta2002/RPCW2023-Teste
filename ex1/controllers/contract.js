const Contract = require('../models/contract')

module.exports.list = async () => {
  return await Contract.find({})
}

module.exports.getById = async (id) => {
  return await Contract.findOne({ _id: id })
}

module.exports.getByYear = async (year) => {
  return await Contract.find({
    $expr: {
      $eq: [{ $year: "$DataInicioContrato" }, year]
    }
  })
}

module.exports.getByInst = async (inst) => {
  return await Contract.find({
    NomeInstituicao: inst
  })
}

module.exports.getCourses = async () => {
  return await Contract.distinct("Curso")
}

module.exports.getInstitutions = async () => {
  return await Contract.distinct("NomeInstituicao")
}

module.exports.add = async (contract) => {
  return await Contract.create(contract)
}

module.exports.delete = async (id) => {
  return await Contract.findByIdAndDelete(id)
}
