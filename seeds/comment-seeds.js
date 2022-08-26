const { Comment } = require('../models');

const commentData = [
    {
        comment: 'I personally prefer OOP vs Functional Programming',
        post_id: 1,
        author: 3
    },
    {
        comment: 'PSA! Use junction tables more often',
        post_id: 2,
        author: 5

    },
    {
        comment: 'Yes, using Gateway with AWS intergration has the advantage of providing a consistent application protocol for your client to access different AWS services.',
        post_id: 3,
        author: 1
    },
    {
        comment: 'SQL being vertically scalable makes it great for table data, while NoSQL scales horizontally and are great for unstructured data, both have their appropriate uses',
        post_id: 4,
        author: 2
    },
    {
        comment: 'Its definitely valuable to learn both at this point.',
        post_id: 5,
        author: 4
    },
];

const seedComment = () => Comment.bulkCreate(commentData);
module.exports = seedComment;