const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User, Comment } = require('../../models')

// Get one post by id
router.get('/:id', async (req, res) => {
    try {
        const postData = await Post.findOne({
            where: {
                id: req.params.id,
            },
        });

        if (!postData){
            res.status(404).json({ message: 'No posts with this id..' })
            return;
        }
        res.status(200).json(postData);
    } catch (error) {
        res.status(500).json(error);
    }
})



module.exports = router;
