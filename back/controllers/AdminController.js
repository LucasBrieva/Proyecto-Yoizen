'use strict'

var Admin = require('../models/admin');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../helpers/jwt');

const generate_token = async function(req,res){
    let user = req.body;
    res.status(200).send({
        data: user,
        token: jwt.createToken(user)
    });
}

module.exports = {
    generate_token
}
