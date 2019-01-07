const mongoose = require('mongoose');

const { Types } = mongoose.Schema;

const leaderSchema = new mongoose.Schema({
    name: Types.String,
    lastName: Types.String,
    email: Types.String,
    date: Types.Date,
    key: Types.Mixed,
    score: Types.Number,
    tab: Types.Number,
});

leaderSchema.statics.findOneOrCreate = async function findOneOrCreate(condition) {
    let user = await this.findOne(condition);
    if (!user) {
        user = await this.create(condition);
    }
    return user;
};
module.exports = leaderSchema;
