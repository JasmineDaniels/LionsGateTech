const { Comment } = require('../models');

const commentData = [
    {
        comment: 'I personally prefer OOP vs Functional Programming',
    },
    {
        comment: 'PSA! Use junction tables more often',
    },
    {
        comment: 'Yes, using Gateway with AWS intergration has the advantage of providing a consistent application protocol for your client to access different AWS services.',
    },
    {
        comment: 'SQL being vertically scalable makes it great for table data, while NoSQL scales horizontally and are great for unstructured data, both have their appropriate uses',
    },
    {
        comment: 'Its definitely valuable to learn both at this point.',
    },
];

const seedComment = () => Comment.bulkCreate(commentData);
module.exports = seedComment;