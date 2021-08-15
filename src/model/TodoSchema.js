const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
     todo: {
         type: String,
         required: true
     },
     content: {
         type: String,
         required: true
     },
     createAt: {
         type: Date,
         default: Date.now
     }
});

module.exports = new mongoose.model('Todo' , TodoSchema)


