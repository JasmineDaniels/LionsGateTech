const { User } = require('../models');

const userData = [
    {
        username: 'AstroBlastro19',
        password: 'pokemon2010'
    },
    {
        username: 'DragonballG',
        password: 'beach90210'
    },
    {
        username: 'MidnightKnight',
        password: '4KTKO2011!'
    },
    {
        username: 'PunchBuggy01',
        password: 'charzard22'
    },
    {
        username: 'Ligeress28',
        password: 'obessthebest'
    },
];

const seedUser = () => User.bulkCreate(userData);
module.exports = seedUser;