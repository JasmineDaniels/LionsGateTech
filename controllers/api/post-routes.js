const router = require('express').Router();
const sequelize = require('../../config/connection');
const { QueryTypes } = require('sequelize');
const { Post, User, Comment } = require('../../models')

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{model:Comment}, {model: User}],
        })

        res.status(200).json(postData)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.post('/', (req, res) => {
    const postData = Post.create({
        title: req.body.title,
        post_content: req.body.post_content,
        user_id: req.body.user_id,
    })
})



router.get('/comments', async (req, res) => {
    try {
        const comment = await sequelize.query(`select username, comment from comment inner join user on user.id = author;`, {type: QueryTypes.SELECT});
        res.status(200).json(comment)
    } catch (error) {
        res.status(500).json(error)
    }
    
})

module.exports = router;