const router = require('express').Router()
const { Pool } = require('pg')
const db = require('../config/database')
const errorHandler = require('./errorHandler')

const pool = new Pool(db)

router.get('/', (req, res) => {
  var response = { error: 'No tableName given', records: {}}
  res.status(500).json(response)
})

router.get('/:tableName', async (req, res) => {
  try{
    const response = await pool.query('SELECT * FROM ' + req.params.tableName)
    res.json(response.rows)
  }
  catch(err){
    errorHandler(err, res)
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