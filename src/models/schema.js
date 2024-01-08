const mongo = require('mongoose');

module.exports = mongo.model(
    'Points', 
    new mongo.Schema({
        id: String,
        points: Number
    })
)
