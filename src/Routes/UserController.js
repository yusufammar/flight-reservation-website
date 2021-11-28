const express = require("express");
const { ConnectionPoolClosedEvent } = require("mongodb");
let user = require ('../models/User')
const router= express.Router();


router.route("/getUserByName").post((req, res) => {
    const x = req.body.name;
    console.log(x);
    User.find({ Name : x }).then(foundUsers => res.send(foundUsers))
    });