const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Team', new Schema({
    teamName: {
        type: String,
        required: true,
    },
    logoUrl:{
        type: String,
        required: false,
    },
    shortName: {
        type: String,
    },
    homeGround: {
        type: String,
    },
    links: {
        website: String,
        facebook: String,
        twitter: String,
        instagram: String,
        youtube: String,
    }
    
}));
