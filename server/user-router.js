const express = require('express');
const leaderModel = require('./leader-model');
const asyncHandler = require('./utils');

const router = new express.Router();

router.get(
    '/',
    asyncHandler(async (req, res) => {
        const users = await leaderModel.find({}).exec();
        res.json(users);
        res.end();
    }),
);

router.post(
    '/',
    asyncHandler(async (req, res) => {
        const content = req.body;
        await leaderModel.create(content);
        res.end();
    }),
);

module.exports = router;
