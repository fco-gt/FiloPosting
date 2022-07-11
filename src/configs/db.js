const mongoose = require('mongoose');

mongoose.connect(process.env.MONGOOSE_URL, {  // Connection
    useUnifiedTopology: true,
    useNewUrlParser: true 
})
.then(db => console.log('Conectado a Mongoose')) // Console Log
.catch(err => console.error(err)) // Err