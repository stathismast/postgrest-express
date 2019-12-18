const router = require('express').Router()
const pg = require('pg')
const db = require('../config/database')
const errorHandler = require('./errorHandler')
const parser = require('./parser')
const builder = require('./queryBuilder')

const pool = new pg.Pool(db)
console.log(pool)

router.get('/', (req, res) => {
  var response = { error: 'No tableName given', records: {}}
  res.status(500).json(response)
})

router.get('/:tableName', async (req, res) => {
  try{
    var parsed = parser.parseGet(req)
    var query = builder.buildGet(parsed)
  }
  catch(err){
    errorHandler.parseError(err, res)
    return;
  }

  try{
    const response = await pool.query(query)
    res.json(response.rows)
  }
  catch(err){
    errorHandler.dbError(err, res)
  }
})

router.post('/:tableName', (req, res) => {
  var response = { error: '', records: 'POST: ' + req.params.tableName}
  res.json(response)
})

router.patch('/:tableName', (req, res) => {
  var response = { error: '', records: 'PATCH: ' + req.params.tableName}
  res.json(response)
})

router.delete('/:tableName', (req, res) => {
  var response = { error: '', records: 'DELETE: ' + req.params.tableName}
  res.json(response)
})

module.exports = router