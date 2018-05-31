'use strict'

const Page = require('../models/Page')

function getAllPagesByOrganizationId() {
    Page.findAllBy('ownerOrganizationId', req.params.org_id)
        .then(result => {
            res.json(result)
        })
}

function getAllPagesByUserId(req, res) {
    Page.findAllBy('ownerUserId', req.params.user_id)
        .then(result => {
            res.json(result)
        })
}

function getPageById(req, res) {
    Page.findById('ownerUserId', req.params.id)
        .then(result => {
            res.json(result)
        })
}

function getPageChildrenById(req, res) {
    // ...
}

module.exports = {
    getAllPagesByOrganizationId,
    getAllPagesByUserId,
    getPageById,
    getPageChildrenById,
}
