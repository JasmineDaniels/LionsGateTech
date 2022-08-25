const { CommentTag } = require('../models');

const commentTagData = [
  {
    user_id: 3,
    post_id: 1,
    comment_id: 1
  },
  {
    user_id: 5,
    post_id: 2,
    comment_id: 2
  },
  {
    user_id: 1,
    post_id: 3,
    comment_id: 3
  },
  {
    user_id: 2,
    post_id: 4,
    comment_id: 4
  },
  {
    user_id: 4,
    post_id: 5,
    comment_id: 5
  },
];

const seedCommentTags = () => CommentTag.bulkCreate(commentTagData);

module.exports = seedCommentTags;
