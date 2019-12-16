function errorHandler(err, res){
  var hint, details, code, message
  if(err.hint) hint = err.hint
  else hint = null
  if(err.details) details = err.detail
  else details = null
  if(err.code) code = err.code
  else code = null
  if(err.message) message = err.message
  else message = null
  var errObj = { hint: hint, details: details, code: err.code, message: err.message }
  console.log('Error:')
  console.log(errObj)
  res.status(500).json(errObj)
}

module.exports = errorHandler