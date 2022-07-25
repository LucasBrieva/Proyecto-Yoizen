'use strict'

var express = require("express");
var adminController = require("../controllers/AdminController");

var api = express.Router();

api.post('/generate_token', adminController.generate_token);

module.exports = api;
    