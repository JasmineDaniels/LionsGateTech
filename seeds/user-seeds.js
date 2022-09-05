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

// const beforeBulkCreate = () => User.beforeBulkCreate((newUserData) => {
//     newUserData.password = bcrypt.hash(newUserData.password, 10);
//     return newUserData
// })

const seedUser = () => User.bulkCreate(userData);
module.exports = seedUser;