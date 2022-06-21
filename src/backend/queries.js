const Pool = require('pg').Pool

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT_DB,
})

const conditions = {
  equal: '=',
  contain: 'SIMILAR TO',
  more: '>',
  less: '<'
}

const getAll = async (request, response) => {
  const {
    page,
    sort,
    value,
    where,
    condition,
    input
  } = request.query

  const getWhere = () => {
    if (where) {
      const query = `
        WHERE ${where} 
        ${conditions[condition]} 
        '${conditions[condition] === 'SIMILAR TO'  ? '%(' : ''}${input}${conditions[condition] === 'SIMILAR TO'  ? ')%' : ''}'
      `
      return query.replace(/[\n,\t]/g, '')
    } else {
      return ''
    }
  }

  const totalRes = await pool.query(`
    SELECT count(*)
    FROM summary
    ${getWhere()}
  `)
  const total = totalRes.rows[0].count
  
  pool.query(`
    SELECT * 
    FROM summary
    ${getWhere()}
    ${sort && `ORDER BY ${sort} ${value}`}
    LIMIT 3 
    OFFSET ${page * 3}
  `, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json({
      rows: results.rows,
      total,
      page
    })
  })
}

module.exports = {
  getAll
}