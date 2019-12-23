async function headersGet(parsed, query, pool){
  headers = {}
  headers['SQL-Query'] = query.split('\n').join(' ').split('\t').join('')

  if(parsed.exact){
    var res = await pool.query("SELECT count(1) FROM " + parsed.table)
    var rows = res.rows[0].count
    if(parsed.offset)
      var start = parsed.offset
    else
      var start = 0
    if(parsed.limit)
      if(parsed.limit < rows)
        var end = parsed.limit + start - 1
      else
        var end = rows - 1
    else
      var end = rows - 1
    headers['Content-Range'] = start + '-' + end + '/' + rows
  }

  return headers
}

module.exports = { headersGet }