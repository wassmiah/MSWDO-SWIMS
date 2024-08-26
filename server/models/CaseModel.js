const mongoose = require('mongoose');

const CaseSchema = new mongoose.Schema({
    caseNumber: { type: Number, required: true, unique: true },
    description: { type: String, required: true },
    status: { type: String, required: true },
    priority: { type: String, required: true },
    caseCategory: { 
        type: String, 
        required: true, 
        trim: true  // Automatically trim whitespace
    },
    date: { type: Date, required: true },  // Added date field
    lastActivity: { type: Date, default: Date.now },
    socialWorkInCharge: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true }
});

const SequenceSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    value: { type: Number, required: true }
});

const Case = mongoose.model('Case', CaseSchema);
const Sequence = mongoose.model('Sequence', SequenceSchema);

module.exports = { Case, Sequence };
