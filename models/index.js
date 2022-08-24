const User = require('./User')
const Post = require('./Post')
const Comment = require('./Comment')
const CommentTag = require('./CommentTag')

Post.belongsTo(User, {
    foreignKey: 'user_id'
})

User.hasMany(Post, {
    foreignKey: 'user_id',
})

// Comment.belongsTo(Post, {
//     foreignKey: 'post_id',
// })

Post.hasMany(Comment, {
    foreignKey: 'post_id',
})

Comment.belongsToMany(Post, { through: CommentTag })

// Comment.belongsToMany(User, {through: CommentTag})

