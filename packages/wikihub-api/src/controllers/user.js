'use strict'

const User = require('../models/User')

/**
 * Get certain user
 * @param req
 * @param res
 * @returns void
 */
function getById(req, res) {
  User.findById(req.params.id)
      .then(result => {
          res.json(result)
      })
}


module.exports = {
    getById,
}
