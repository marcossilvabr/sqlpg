
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('milestones', function(table){
      table.bigInteger('famous_id').unsigned().index().references('id').inTable('famous_people')

    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    table.foreign('id').references('famous_people.famous_person_id')
  ])
};
