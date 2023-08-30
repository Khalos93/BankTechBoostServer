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
      const priceEl = prices[i];

      const inputDate = priceEl.date;
      const parsedDate = new Date(inputDate);
      const formattedDate = parsedDate.toISOString().split('T')[0];

      const newElPrice = {
        id: priceEl.id,
        date: formattedDate,
        value: priceEl.value
      };

      for (let y = 0; y < result.length; y++) {
        const elY = result[y];

        if (priceEl.bond_id === elY.id) {
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

exports.getOne = async (req, res) => {
  try {
    const bond = await knex('obligation')
      .where({
        'obligation.id': req.params.id
      })
      .first();
    const newBond = {
      id: bond.id,
      name: bond.name,
      status: bond.status
    };

    const spreadValues = await knex('price').where({
      'price.bond_id': req.params.id
    });

    newBond.spreadValues = spreadValues;

    res.json(newBond);
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
};
