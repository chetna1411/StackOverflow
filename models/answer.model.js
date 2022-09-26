const mongoose = require("mongoose");

const Answer = new mongoose.Schema({
    questionId: {
        type: String
    },
    answer_Description: {
        type: String,
        required: true
    },
    submitted_By:{
        type: String
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

module.exports = mongoose.model("Answer",Answer)