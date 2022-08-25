const { Post } = require('../models');

const postData = [
    {
        title: 'Obj Oriented Programming',
        post_content: 'OOP makes Classes must Easier to understand',
        user_id: 1
    },
    {
        title: 'Model Relationships',
        post_content: 'One to many vs Many to Many associations, lets talk about it',
        user_id: 2
    },
    {
        title: 'REST API with AWS Integration',
        post_content: 'Has anyone use API Gateway?',
        user_id: 3
    },
    {
        title: 'SQL or noSQL',
        post_content: 'Is it still worth it to use relational databases?',
        user_id: 4
    },
    {
        title: 'Javascript vs Python',
        post_content: 'Is Python slowly winning over Javascript?',
        user_id: 5
    },
];

const seedPost = () => Post.bulkCreate(postData);
module.exports = seedPost;