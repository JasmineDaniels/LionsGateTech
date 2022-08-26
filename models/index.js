const User = require('./User')
const Post = require('./Post')
const Comment = require('./Comment')
//const CommentTag = require('./CommentTag')

User.hasMany(Post, {
    foreignKey: 'user_id',
})

Post.belongsTo(User, {
    foreignKey: 'user_id'
})

Post.hasMany(Comment, {
    foreignKey: 'post_id',
})

User.hasMany(Comment, {
    foreignKey: 'user_id'
})

Comment.belongsTo(User, {
    foreignKey: 'user_id'
})

//Comment.belongsToMany(Post, { through: CommentTag, foreignKey: 'post_id'})

//Comment.belongsToMany(User, {through: CommentTag, foreignKey: 'user_id'})

module.exports = {
    User,
    Post,
    Comment,
    //CommentTag,
}
// User.hasMany(Post, {
//     foreignKey: 'user_id',
// })

