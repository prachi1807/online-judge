const mongoose = require('mongoose')

const Schema = mongoose.Schema

const User = require('./userSchema')
const Problem = require('./problemSchema')


const submissionSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        rquired: true
    },
    problem_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Problem',
        required: true
    },
    verdict: {
        type: String,
        enum: ['success', 'failed', 'in_process'],
        required: true
    },
    score: {
        type: Number,
        min: 0
    }
    
}, {timestamps: true})

module.exports = mongoose.model('Submission', submissionSchema)
