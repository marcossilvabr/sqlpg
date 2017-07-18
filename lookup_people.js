const pg = require("pg")
const settings = require("./settings")

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

const name = process.argv[2]

client.connect((err) => {
  if (err) {
    return console.error("Connection Error" , err)
  }
  const query = `select * from famous_people WHERE first_name = $1 OR last_name = $1;`
  client.query(query,[name], (err, result) => {
    if (err) {
      return console.error("Error running query", err)
    }
    console.log("Searching ...")
    const person = result.rows[0]
    const birthdate = result.rows[0].birthdate.toISOString().split("T")[0]
    console.log(`Found 1 person(s) by the name '${name}': ${person.id}: ${person.first_name} ${person.last_name}, born '${birthdate}'`)
    client.end()
  })
})

