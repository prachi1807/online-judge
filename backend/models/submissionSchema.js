const mongoose = require('mongoose')

const Schema = mongoose.Schema

const User = require('./userSchema')
const Problem = require('./problemSchema')


const submissionSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    problem_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Problem'
    },
    verdict: {
        type: String,
        required: true
    },
    time_taken: {
        type: Number,
        min: 0
    }
    
}, {timestamps: true})

module.exports = mongoose.model('Submission', submissionSchema)


