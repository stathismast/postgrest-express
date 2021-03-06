function buildGet(parsed){
  var query = "SELECT"
  for(var i in parsed.select){
    if(i < parsed.select.length-1)
      query += '\n\t' + parsed.select[i] + ','
    else
      query += '\n\t' + parsed.select[i]
  }
  query += "\nFROM\n\t" + parsed.table
  if(parsed.where && parsed.where.length){
    query += "\nWHERE\n\t"
    for(var i in parsed.where){
      if(i>0)
        query += " AND"
      query += " " + parsed.where[i].key + " " + parsed.where[i].operator + " " + parsed.where[i].value
    }
  }
  if(parsed.order.column)
    if(parsed.order.direction)
      query += "\nORDER BY\n\t" + parsed.order.column + " " + parsed.order.direction
    else
      query += "\nORDER BY\n\t" + parsed.order.column
  if(parsed.offset){
    query += "\nOFFSET " + parsed.offset
  }
  if(parsed.limit){
    query += "\nLIMIT " + parsed.limit
  }
  console.log("\nFinal query:")
  console.log(query)
  return query
}

function buildPost(parsed){
  var query = "INSERT INTO "
  query += parsed.table
  query += " ("
  for(let i in parsed.columns){
    query += parsed.columns[i]
    if(i < parsed.columns.length - 1)
      query += ", "
  }
  query += ") VALUES ("
  for(let i in parsed.columns){
    query += JSON.stringify(parsed.values[i]).split('"').join("'")
    if(i < parsed.values.length - 1)
      query += ", "
  }
  query += ")"
  return query
}

function buildPatch(parsed){
  var query = "UPDATE"
  query += " " + parsed.table
  if(parsed.columns && parsed.columns.length){
    query += "\nSET"
    for(let i in parsed.columns){
      query += " " + parsed.columns[i] + " = " + JSON.stringify(parsed.values[i]).split('"').join("'")  
      if(i < parsed.columns.length - 1) query += ","
    }
  }
  if(parsed.where && parsed.where.length){
    query += "\nWHERE\n\t"
    for(var i in parsed.where){
      if(i>0)
        query += " AND"
      query += " " + parsed.where[i].key + " " + parsed.where[i].operator + " " + parsed.where[i].value
    }
  }
  console.log("\nFinal query:")
  console.log(query)
  return query
}

module.exports = { buildGet, buildPost, buildPatch }