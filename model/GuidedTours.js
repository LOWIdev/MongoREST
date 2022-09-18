const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const guidedTourSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,

    },
    date: {
        type: Date,
        default: Date.now
    },
    id: {
        type:String,
    },
    tourDate: {
        type: String,
    },
    tourMeetingPoint: {
        type: String,

    },

    image: { type: String }
});

module.exports = mongoose.model('GuidedTours', guidedTourSchema);