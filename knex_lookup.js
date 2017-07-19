const settings = require("./settings")
const knex = require("knex") (require('./knexfile').development)

const name = process.argv.slice(2).toString()

knex.select('*').from('famous_people').where('first_name', name).orWhere('last_name', name)
.asCallback((err, result) => {
  if(err) {
    return console.error('Error running query', err)
  }
  console.log('Searching...')
  const person = result[0]
  const birthdate = result[0].birthdate.toISOString().split("T")[0]
  console.log(`Found 1 person(s) by the name '${name}': ${person.id}: ${person.first_name} ${person.last_name}, born '${birthdate}'`)
  knex.destroy()
})