const router = require('express').Router()
const pg = require('pg')
const db = require('../config/database')
const errorHandler = require('./errorHandler')
const parser = require('./parser')
const builder = require('./queryBuilder')
const headers = require('./headers')

const pool = new pg.Pool(db)

router.get('/', (req, res) => {
  var response = { error: 'No tableName given', records: {}}
  res.status(500).json(response)
})

router.get('/:tableName', async (req, res) => {
  try{
    var parsed = parser.parseGet(req)
    var query = builder.buildGet(parsed)
    res.set(await headers.headersGet(parsed, query, pool))
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

router.post('/:tableName', async (req, res) => {
  try{
    var parsed = parser.parsePost(req)
    var query = builder.buildPost(parsed)
    res.set(headers.headersPost(query))
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

router.patch('/:tableName', (req, res) => {
  var response = { error: '', records: 'PATCH: ' + req.params.tableName}
  res.json(response)
})

router.delete('/:tableName', (req, res) => {
  var response = { error: '', records: 'DELETE: ' + req.params.tableName}
  res.json(response)
})

module.exports = router