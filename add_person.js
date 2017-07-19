const settings = require("./settings")
const knex = require("knex") (require('./knexfile').development)

const addInfo = process.argv.slice(2)
console.log(addInfo)

knex('famous_people').insert({
  first_name: addInfo[0],
  last_name: addInfo[1],
  birthdate: addInfo[2]
})
.asCallback((err, result) => {
  if(err) {
    return console.error('Error running query', err)
  }
  console.log("Adding...")
  knex.destroy()
})