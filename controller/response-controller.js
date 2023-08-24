const knex = require('knex')(require('../knexfile'));

exports.getAll = async (req, res) => {
  try {
    const obligations = await knex('obligation');

    const result = [];

    obligations.forEach(el => {
      el = {
        id: el.id,
        name: el.name,
        status: el.status,
        value: []
      };

      result.push(el);
    });

    const prices = await knex('price');

    for (let i = 0; i < prices.length; i++) {
      const elI = prices[i];
      const newElPrice = {
        date: prices[i].date,
        value: prices[i].value
      };

      for (let y = 0; y < result.length; y++) {
        const elY = result[y];

        if (elI.bond_id === elY.id) {
          elY.value.push(newElPrice);
        }
      }
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: `${error}`
    });
  }
};
