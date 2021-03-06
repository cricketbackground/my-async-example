const express = require('express');
const router = express.Router();
const async = require('async');

function myFirstFunction(callback) {
    callback(null, 'Task 1', 'Task 2');
}

function mySecondFunction(arg1, arg2, callback) {
    // arg1 now equals 'Task 1' and arg2 now equals 'Task 2'
    let arg3 = arg1 + ' and ' + arg2;
    callback(null, arg3);
}

function myLastFunction(arg1, callback) {
    // arg1 now equals 'Task1 and Task2'
    arg1 += ' completed';
    callback(null, arg1);
}

/* GET users listing. */
router.get('/', function (req, res, next) {
    async.waterfall([
        myFirstFunction,
        mySecondFunction,
        myLastFunction,
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
