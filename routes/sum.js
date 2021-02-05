const express = require('express');
const router = express.Router();
const async = require('async');

let response = [];

function arrayOp(item, sum, callback) {
    response.push(item);
    callback(null, sum)
}

function one(callback) {
    arrayOp("100", 1, callback);
    console.error("one is called");
}

function two(sum, callback) {
    arrayOp("101", sum + 1, callback);
    console.error("two is called");
}

function three(sum, callback) {
    arrayOp("102", sum + 1, callback);
    console.error("three is called");
}

/* GET sum listing. */
router.get('/', function (req, res, next) {
    response = [];
    async.waterfall([
        one,
        two,
        three,
    ], function (err, result) {
        if (err) {
            console.log("Error occurred : ", err);
            res.json({
                message: err.message
            });
        } else {
            // result now equals 'Task1 and Task2 completed'
            console.log(result);
            res.json({
                message: result + ' ' + response.toString()
            });
        }
    });
    next();
});

module.exports = router;
