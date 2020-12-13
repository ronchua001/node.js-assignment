const Reports = require('../models/Reports');

exports.getWorkloadReport = async (req, res) => {
    try {
        let result = await Reports();
        if (result) {
            //successfully returned obj, set status 200 and send back JSON
            res.status(200).json(result);
        } else {
            //somewhere failed in reports models - send status 500
            res.status(500).send("Unsuccessful Request!");
        }
    } catch (err) {
        res.status(500).send("Unsuccessful Request!");
    }
}