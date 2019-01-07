const mongoose = require('mongoose');

const leaderSchema = require('./leader-schema');

const leaderModel = mongoose.model('leader', leaderSchema, 'score');

module.exports = leaderModel;
