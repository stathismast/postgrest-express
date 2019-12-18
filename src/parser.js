const operatorMap = {
  eq: '=', // equals
  gt: '>', // greater than
  gte: '>=', // greater than or equal
  lt: '<', // less than
  lte: '<=', // less than or equal
  neq: '<>', // r !=
  like: 'LIKE', // LIKE operator (use * in place of %)
  ilike: 'ILIKE', // ILIKE operator (use * in place of %)
  in: 'IN', // one of a list of values, e.g. ?a=in.(1,2,3) – also supports commas in quoted strings like ?a=in.("hi,there","yes,you")
  is: 'IS', // checking for exact equality (null,true,false)
}

function parseGet(req){
  var parsed = {}
  parsed.table = req.params.tableName

  var query = Object.entries(req.query).map(([key, value]) => ({key,value}))
  console.log('\nBefore parsing:')
  console.log(query)

  var toBeDeleted = []

  parsed.select = '*'
  for(var i in query){
    if(query[i].key == 'select'){
      parsed.select = query[i].value.split(',')
      toBeDeleted.push(parseInt(i))
    }
  }

  parsed.order = {}
  for(var i in query){
    if(query[i].key == 'order'){
      var order = query[i].value.split('.')
      parsed.order.column = order[0]
      if(order.length == 2 && (order[1] == 'asc' || order[1] == 'desc'))
        parsed.order.direction = order[1]
      toBeDeleted.push(parseInt(i))
    }
  }

  toBeDeleted.sort((a,b) => { return b-a })
  for(var i in toBeDeleted){
    query.splice(toBeDeleted[i],1)
  }
  parsed.where = query

  for(var x of parsed.where){
    x.operator = operatorMap[x.value.split('.')[0]]

    // If operator is not supported
    if(!x.operator){
      throw { detail: "unexpected \"" + x.value.split('.')[0] + "\" expecting operator (eq, gt, ...)", message : "failed to parse filter (" + x.value + ")" }
    }

    x.value = x.value.split('.')[1]

    // Handle like/ilike and in
    if(x.operator == 'LIKE' || x.operator == 'ILIKE'){
      x.value = "'" + x.value.split('*').join('%') + "'"
    }
    if(x.operator == 'IN'){
      x.value = x.value.split('"').join("'")
    }
  }
  console.log('\nAfter parsing:')
  console.log(parsed)
  return parsed
}

module.exports = { parseGet }