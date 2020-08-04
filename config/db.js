const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
    try {
       await mongoose.connect(process.env.MONGODB_URI || db, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex:true
       });
       console.log('DB CONNECTED');
    } catch(err) {
        console.error(err.message);
        // Exit process with failure
        process.exit(1);
    }
}

module.exports = connectDB;
