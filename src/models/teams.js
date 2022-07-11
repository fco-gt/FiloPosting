const mongo = require('mongoose');

module.exports = mongo.model(
    'Puntos', 
    new mongo.Schema({
        id: String,
        name: String,
        coins: Number
    })
)