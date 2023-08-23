const obligationsData = require('../seed-data/obligations');
const pricesData = require('../seed-data/prices');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries and replace it with default data
  await knex('obligation').del();
  await knex('obligation').insert(obligationsData);
  await knex('prices').del();
  await knex('prices').insert(pricesData);
};
