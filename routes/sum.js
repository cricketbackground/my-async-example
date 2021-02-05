const express = require('express');
const router = express.Router();
const async = require('async');

function one(callback) {
    callback(null, 1);
}

function two(sum, callback) {
    callback(null, sum + 1);
}

function three(sum, callback) {
    callback(null, sum + 1);
}

/* GET sum listing. */
router.get('/', function (req, res, next) {
    async.waterfall([
        one,
        two,
        three,
    ], function (err, result) {
        if (err) {
            console.log("Error occurred : ", err);
            res.json({
                message: err.message,
                status: 200
            });
        } else {
            // result now equals 'Task1 and Task2 completed'
            console.log(result);
            res.json({
                message: result,
                status: 200
            });
        }
    });
});


module.exports = router;
