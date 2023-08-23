/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable('obbligations', table => {
      table.increments('obbligation_id').primary();
      table.string('obbligation_name').notNullable();
      table.string('status').notNullable();
    })
    .createTable('prices', table => {
      table.increments('prices_id').primary();
      table.integer('price_value').notNullable();
      table.date('price_date').notNullable();
      table
        .integer('bond_id')
        .unsigned()
        .references('obbligations.obbligation_id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('prices').dropTable('obbligations');
};
