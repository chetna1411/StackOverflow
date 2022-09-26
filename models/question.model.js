const mongoose = require("mongoose");

const Question = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    question_description: {
        type: String,
        required: true
    },
    popularity:{
           type:Number,
           default:0
    },
    answer:{
          type:[String]
    },
    createdAt: {
        type: Date,
        default: () => {
            return Date.now();
        },
        immutable: true
    },
    updatedAt: {
        type: Date,
        default: () => {
            return Date.now();
        }
    }
});

module.exports = mongoose.model("Question", Question)