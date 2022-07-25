'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'yoizen1234';

exports.createToken = function(user){
    var payload = {
        sub:user.id,
        nombres: user.name,
        email: user.email,
        role: user.role,
        iat: moment().unix(),
        exp: moment().add(7,'days').unix()
    };

    return jwt.encode(payload, secret);
}